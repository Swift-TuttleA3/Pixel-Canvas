import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Stage, Layer, Rect } from "react-konva";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

/**
 * CanvasComponent is a React component that renders an interactive canvas
 * where users can draw rectangles by clicking on the canvas. The canvas
 * supports zooming and panning.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {string} props.selectedColor - The color to be used for drawing rectangles.
 *
 * @returns {JSX.Element} The rendered CanvasComponent.
 */

const CanvasComponent = ({ selectedColor, setCoordinates }) => {
  const [rectangles, setRectangles] = useState([]);
  const [hoveredCell, setHoveredCell] = useState(null);
  const canvasWidth = 768;
  const canvasHeight = 512;
  const cellSize = 2;

  const handleMouseMove = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / cellSize);
    setHoveredCell({ x: cellX, y: cellY });
    if (hoveredCell) setCoordinates(hoveredCell);
  };

  const handleClick = (e) => {
    if (e.evt.button === 2) e.evt.preventDefault();
    else if (e.evt.button === 0) {
      const { x, y } = e.target.getStage().getPointerPosition();
      const cellX = Math.floor(x / cellSize);
      const cellY = Math.floor(y / cellSize);
      const newRect = {
        x: cellX * cellSize,
        y: cellY * cellSize,
        width: cellSize,
        height: cellSize,
        fill: selectedColor,
      };
      setRectangles([...rectangles, newRect]);
    }
  };

  const handleContextMenu = (e) => {
    e.evt.preventDefault(); // Verhindert das Standard-Kontextmenü
  };

  const renderedRectangles = useMemo(() => {
    return rectangles.map((rect, index) => <Rect key={index} {...rect} />);
  }, [rectangles]);

  return (
    <TransformWrapper
      defaultScale={1}
      panning={{ allowLeftClickPan: false }}
      wheel={{ smoothStep: 0.03 }}
      maxScale={50}
      doubleClick={{ disabled: true }}
    >
      <TransformComponent>
        <Stage
          style={{ imageRendering: "pixelated" }}
          width={canvasWidth}
          height={canvasHeight}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          onContextMenu={handleContextMenu}
          pixelRatio={1}
        >
          <Layer>
            {renderedRectangles}
            {hoveredCell && (
              <Rect
                x={hoveredCell.x * cellSize}
                y={hoveredCell.y * cellSize}
                width={cellSize}
                height={cellSize}
                fill="rgba(155, 155, 155, 0.7)"
              />
            )}
          </Layer>
        </Stage>
      </TransformComponent>
    </TransformWrapper>
  );
};
CanvasComponent.propTypes = {
  selectedColor: PropTypes.string.isRequired,
};

export default CanvasComponent;

/*

!!!noch implementieren!!!

import { useState, useEffect } from "react";
import { Stage, Layer, Rect } from "react-konva";

const Canvas = ({ ws, selectedColor, incrementClickCount, rectangles, setRectangles }) => {
  const [canSetPixel, setCanSetPixel] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanSetPixel(true);
    }, 100); // Throttling durch Setzen eines Timers

    return () => clearTimeout(timer);
  }, [canSetPixel]);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Message received in Canvas:", data); // Log empfangene Nachrichten
          if (data.type === "initialData") {
            setRectangles(data.data);
          } else {
            setRectangles((prevRectangles) => [...prevRectangles, data]);
          }
        } catch (error) {
          console.error("Error parsing message from server: ", error);
        }
      };
    }
  }, [ws]);

  const handleCanvasClick = (e) => {
    if (!canSetPixel) return;

    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    const newRectangle = {
      position: {
        x: Math.round(pointerPosition.x),
        y: Math.round(pointerPosition.y),
      },
      color: selectedColor || "black", // Standardfarbe ist Schwarz
      timestamp: new Date().toLocaleString(),
    };

    setRectangles([...rectangles, newRectangle]);
    setCanSetPixel(false);

    // Überprüfen, ob die WebSocket-Verbindung vorhanden ist
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(newRectangle));
      incrementClickCount();
    } else {
      console.error("WebSocket connection is not open.");
    }
  };

  return (
    <div>
      <Stage
        width={480}
        height={320}
        onClick={handleCanvasClick}
        style={{ border: "5px solid black", cursor: "crosshair" }}
      >
        <Layer>
          {rectangles.map((rect, index) => (
            rect.position && typeof rect.position.x === 'number' && typeof rect.position.y === 'number' ? (
              <Rect
                key={index}
                x={rect.position.x}
                y={rect.position.y}
                width={1}
                height={1}
                fill={rect.color}
              />
            ) : null
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;

*/
/*
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Stage, Layer, Rect } from "react-konva";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import useFetchCanvasData from "../hooks/useFetchCanvasData";

const CanvasComponent = ({ selectedColor, ws, incrementClickCount }) => {
  const { rectangles, setRectangles } = useFetchCanvasData();
  const [canSetPixel, setCanSetPixel] = useState(true);
  const [hoveredCell, setHoveredCell] = useState(null);
  const canvasWidth = 768;
  const canvasHeight = 512;
  const cellSize = 2;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanSetPixel(true);
    }, 100); // Throttling durch Setzen eines Timers

    return () => clearTimeout(timer);
  }, [canSetPixel]);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Message received in Canvas:", data); // Log empfangene Nachrichten
          if (data.type === "initialData") {
            setRectangles(data.data);
          } else {
            setRectangles((prevRectangles) => [...prevRectangles, data]);
          }
        } catch (error) {
          console.error("Error parsing message from server: ", error);
        }
      };
    }
  }, [ws]);

  const handleMouseMove = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / cellSize);
    setHoveredCell({ x: cellX, y: cellY });
  };

  const handleClick = (e) => {
    if (!canSetPixel) return;

    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    const newRectangle = {
      position: {
        x: Math.round(pointerPosition.x),
        y: Math.round(pointerPosition.y),
      },
      color: selectedColor || "black", // Standardfarbe ist Schwarz
      timestamp: new Date().toLocaleString(),
    };

    setRectangles([...rectangles, newRectangle]);
    setCanSetPixel(false);

    // Überprüfen, ob die WebSocket-Verbindung vorhanden ist
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(newRectangle));
      incrementClickCount();
    } else {
      console.error("WebSocket connection is not open.");
    }
  };

  const handleContextMenu = (e) => {
    e.evt.preventDefault(); // Verhindert das Standard-Kontextmenü
  };

  return (
    <TransformWrapper
      defaultScale={1}
      panning={{ allowLeftClickPan: false }}
      wheel={{ smoothStep: 0.03 }}
      maxScale={50}
      doubleClick={{ disabled: true }}
    >
      <TransformComponent>
        <Stage
          width={canvasWidth}
          height={canvasHeight}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          onContextMenu={handleContextMenu}
          pixelRatio={1}
        >
          <Layer>
            {rectangles.map((rect, index) => (
              <Rect
                key={index}
                x={rect.position.x}
                y={rect.position.y}
                width={1}
                height={1}
                fill={rect.color}
              />
            ))}
            {hoveredCell && (
              <Rect
                x={hoveredCell.x * cellSize}
                y={hoveredCell.y * cellSize}
                width={cellSize}
                height={cellSize}
                fill="rgba(155, 155, 155, 0.7)"
              />
            )}
          </Layer>
        </Stage>
      </TransformComponent>
    </TransformWrapper>
  );
};

CanvasComponent.propTypes = {
  selectedColor: PropTypes.string.isRequired,
  ws: PropTypes.object,
  incrementClickCount: PropTypes.func.isRequired,
};

export default CanvasComponent;

*/
