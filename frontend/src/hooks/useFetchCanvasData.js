import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";

const useFetchCanvasData = () => {
  const [rectangles, setRectangles] = useState([]);

  const fetchDbData = useCallback(async () => {
    const token = Cookies.get("token_js");
    if (!token) {
      console.error("No Token Found.");
      return;
    }
    console.log("Token found:", token);
    try {
      const response = await fetch("http://localhost:5000/api/canvas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      if (response.status === 401) {
        console.error("Token abgelaufen oder ungültig.");
        Cookies.remove("token");
        window.location.href = "/login";
        return;
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        console.log("Fetched DB data:", data);
        const normalizedData = data.map((rect) => ({
          _id: rect._id,
          x: rect.position_x,
          y: rect.position_y,
          width: 2,
          height: 2,
          fill: rect.color,
        }));
        setRectangles(normalizedData);
        localStorage.setItem("canvasData", JSON.stringify(normalizedData));
      } else {
        console.error("Error fetching canvas data: ", data.msg);
      }
    } catch (error) {
      console.error("Error fetching canvas data: ", error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const cachedCanvasData = localStorage.getItem("canvasData");
      if (cachedCanvasData) {
        try {
          const parsedData = JSON.parse(cachedCanvasData);
          if (Array.isArray(parsedData)) {
            setRectangles(parsedData);
            return;
          } else {
            console.warn("Cached data is not an array");
          }
        } catch (error) {
          console.error("Error parsing cached data:", error);
          localStorage.removeItem("canvasData");
        }
      }

      const token = Cookies.get("token_js");
      if (!token) {
        console.error("Kein Token im Cookie gefunden.");
        return;
      }
      console.log("Token found:", token);
      try {
        const response = await fetch("http://localhost:5000/api/canvas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        if (response.status === 401) {
          console.error("Token abgelaufen oder ungültig.");
          Cookies.remove("token");
          window.location.href = "/login";
          return;
        }
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          console.log("Fetched canvas data:", data);
          const normalizedData = data.map((rect) => ({
            _id: rect._id,
            x: rect.position_x,
            y: rect.position_y,
            width: 2,
            height: 2,
            fill: rect.color,
          }));
          setRectangles(normalizedData);
          localStorage.setItem("canvasData", JSON.stringify(normalizedData));
        } else {
          console.error("Error fetching canvas data: ", data.msg);
        }
      } catch (error) {
        console.error("Error fetching canvas data: ", error);
      }
    };
    fetchData();
  }, [fetchDbData]);

  return { rectangles, setRectangles, fetchDbData };
};

export default useFetchCanvasData;
