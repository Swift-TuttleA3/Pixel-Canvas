import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Canvas.scss";
import ColorDropdown from "../components/ColorDropdown";
import Coordinates from "../utilities/Coordinates";
import useFetchCanvasData from "../hooks/useFetchCanvasData.js";
import Cookies from "js-cookie";
import WebSocketClient from "../components/WebSocketClient";
import { Stage, Layer, Rect } from "react-konva";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Canvas = () => {
  const [selectedColor, setSelectedColor] = useState("red");
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [username, setUsername] = useState("");
  const [tier, setTier] = useState(() => {
    const savedTier = localStorage.getItem("tier");
    return savedTier ? parseInt(savedTier, 10) : 1;
  }); // Stufe des Nutzers
  const [ws, setWs] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { rectangles, setRectangles, fetchDbData } = useFetchCanvasData();
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState(null);
  const [timer, setTimer] = useState(5000); // Standard-Timer
  const [isClickAllowed, setIsClickAllowed] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0); // Verbleibende Zeit
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("canvasData");
  }, []);

  useEffect(() => {
    const token = Cookies.get("token_js");
    const usernameFromCookie = Cookies.get("username"); // Assuming the username is stored in a cookie
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
    }
    if (token) {
      setIsAuthenticated(true);
      const cachedCanvasData = localStorage.getItem("canvasData");
      if (cachedCanvasData) {
        try {
          const parsedData = JSON.parse(cachedCanvasData);
          if (Array.isArray(parsedData)) {
            setRectangles(parsedData);
          } else {
            console.warn("Cached data is not an array");
          }
        } catch (error) {
          console.error("Error parsing cached data:", error);
          localStorage.removeItem("canvasData");
        }
      } else {
        fetchDbData();
      }
    } else {
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, [fetchDbData, setRectangles, isAuthenticated, navigate]);

  useEffect(() => {
    if (ws) {
      ws.onopen = () => {
        console.log("WebSocket connection established");
        setConnectionStatus("Connected");
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Data received from WebSocket:", data);
          if (data.type === "canvasUpdate") {
            setRectangles((prevRectangles) => {
              const updatedRectangles = [...prevRectangles, data.data];
              localStorage.setItem(
                "canvasData",
                JSON.stringify(updatedRectangles)
              );
              return updatedRectangles;
            });
          }
        } catch (error) {
          console.error("Error parsing message from server: ", error);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
        setConnectionStatus("Disconnected");
      };
    }
  }, [ws, setRectangles]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "canvasData") {
        const cachedCanvasData = localStorage.getItem("canvasData");
        if (cachedCanvasData) {
          try {
            const parsedData = JSON.parse(cachedCanvasData);
            if (Array.isArray(parsedData)) {
              setRectangles(parsedData);
            } else {
              console.warn("Cached data is not an array");
            }
          } catch (error) {
            console.error("Error parsing cached data:", error);
            localStorage.removeItem("canvasData");
          }
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [setRectangles]);

  useEffect(() => {
    let interval;
    if (remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1);
    }
    return () => clearInterval(interval);
  }, [remainingTime]);

  const handleMouseMove = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    const cellX = Math.floor(x / 2);
    const cellY = Math.floor(y / 2);
    setCoordinates({ x: cellX, y: cellY });
  };

  const handleClick = async (e) => {
    if (!isClickAllowed) return; // Prevent click if not allowed

    if (dropdownPosition) {
      setDropdownPosition(null);
    } else {
      if (e.evt.button === 2) e.evt.preventDefault();
      else if (e.evt.button === 0) {
        const { x, y } = e.target.getStage().getPointerPosition();
        const cellX = Math.floor(x / 2);
        const cellY = Math.floor(y / 2);
        const newRect = {
          _id: `${cellX}_${cellY}`,
          x: cellX * 2,
          y: cellY * 2,
          width: 2,
          height: 2,
          fill: selectedColor,
        };
        setRectangles((prevRectangles) => {
          const updatedRectangles = [...prevRectangles, newRect];
          localStorage.setItem("canvasData", JSON.stringify(updatedRectangles));
          return updatedRectangles;
        });
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: "canvasUpdate", data: newRect }));
        } else {
          console.error("WebSocket connection is not open.");
        }

        // Erhöhen des Pixel-Zählers und Abrufen des aktuellen Timers
        try {
          const response = await fetch(
            "http://localhost:5000/api/increment-pixel",
            {
              method: "PUT",
              credentials: "include",
            }
          );
          const data = await response.json();
          if (response.ok) {
            setTimer(data.timer);
            setTier(data.tier); // Stufe des Nutzers aktualisieren
            localStorage.setItem("tier", data.tier); // Stufe im lokalen Speicher speichern
            setRemainingTime(data.timer); // Verbleibende Zeit setzen
          } else {
            console.error("Fehler beim Erhöhen des Pixel-Zählers:", data.msg);
          }
        } catch (error) {
          console.error("Fehler beim Erhöhen des Pixel-Zählers:", error);
        }

        setIsClickAllowed(false);
        setTimeout(() => {
          setIsClickAllowed(true);
        }, timer);
      }
    }
  };

  const handleContextMenu = (e) => {
    e.evt.preventDefault();
    const { x, y } = e.target.getStage().getPointerPosition();
    if (dropdownPosition) {
      setDropdownPosition(null);
    } else {
      setDropdownPosition({ x, y });
    }
  };

  const handleSelectColor = (color) => {
    setSelectedColor(color);
    setDropdownPosition(null);
  };

  const renderedRectangles = useMemo(() => {
    console.log("rectangles:", JSON.stringify(rectangles, null, 2));
    console.log("Rendered Rectangles:", JSON.stringify(rectangles, null, 2));
    return rectangles.map((rect, index) => <Rect key={index} {...rect} />);
  }, [rectangles]);

  const handleLogout = () => {
    Cookies.remove("token_js");
    Cookies.remove("username");
    navigate("/login");
  };

  return (
    <div className="canvas-layout">
      {isAuthenticated ? (
        <>
          <WebSocketClient
            setWs={setWs}
            setConnectionStatus={setConnectionStatus}
            setMessages={setMessages}
            setError={setError}
            setRectangles={setRectangles}
          />
          <div id="canvas-container">
            <TransformWrapper
              defaultScale={1}
              panning={{
                allowLeftClickPan: false,
                allowRightClickPan: false,
                allowMiddleClickPan: true,
                velocityDisabled: true,
              }}
              wheel={{ smoothStep: 0.03 }}
              maxScale={50}
              doubleClick={{ disabled: true }}
              centerOnInit={true}
            >
              <TransformComponent>
                <Stage
                  id="canvas-stage"
                  className="pixelated"
                  style={{ imageRendering: "pixelated" }}
                  width={window.innerWidth}
                  height={window.innerHeight}
                  onMouseMove={handleMouseMove}
                  onClick={handleClick}
                  onContextMenu={handleContextMenu}
                  pixelRatio={3}
                  ref={stageRef}
                >
                  <Layer id="canvas-layer" ref={layerRef}>
                    {renderedRectangles}
                    {coordinates && (
                      <Rect
                        x={coordinates.x * 2}
                        y={coordinates.y * 2}
                        width={2}
                        height={2}
                        fill="rgba(155, 155, 155, 0.7)"
                      />
                    )}
                  </Layer>
                </Stage>
              </TransformComponent>
            </TransformWrapper>
            {dropdownPosition && (
              <ColorDropdown
                position={dropdownPosition}
                onSelectColor={handleSelectColor}
              />
            )}
          </div>
          <div
            className="overlay"
            style={{ borderTop: `15px solid ${selectedColor}` }}
          >
            <div className="coordinates">
              <Coordinates coordinates={coordinates} />
            </div>
            <div className="username-canvas">
              You: {username} (Stufe: {tier} Timeout:{" "}
              {(Math.max(0, remainingTime) / 1000).toFixed(3)}s)
            </div>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        navigate("/login")
      )}
    </div>
  );
};

export default Canvas;
