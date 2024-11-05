import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import Canvas from "../models/canvasModel.js";
import dotenv from "dotenv";

dotenv.config();

const wss = new WebSocketServer({ port: process.env.WEBSOCKET_PORT || 3131 });

wss.on("connection", function connection(ws, req) {
  const token = new URLSearchParams(req.url.split("?")[1]).get("token");
  if (!token) {
    ws.close();
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ws.user = decoded;

    ws.on("message", async function incoming(message) {
      try {
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.type === "testMessage") {
          console.log("Testnachricht empfangen:", parsedMessage.message);
          ws.send(
            JSON.stringify({
              type: "testResponse",
              message: "Testnachricht vom Server empfangen",
            })
          );
        }

        if (parsedMessage.type === "canvasUpdate") {
          const newRect = parsedMessage.data;
          const updatedCanvasEntry = await Canvas.findOneAndUpdate(
            { position_x: newRect.x, position_y: newRect.y },
            { $set: { color: newRect.fill, timestamp: new Date() } },
            { upsert: true, new: true, returnDocument: "after" }
          );

          // Sende nur das aktualisierte Rechteck an alle Clients
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({
                  type: "canvasUpdate",
                  data: updatedCanvasEntry,
                })
              );
            }
          });
        }
      } catch (err) {
        ws.send(JSON.stringify({ type: "error", message: err.message }));
      }
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed");
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    ws.send(
      JSON.stringify({
        type: "connection",
        message: "WebSocket connection established",
      })
    );
  } catch (err) {
    ws.close();
  }
});

wss.on("listening", () => {
  console.log(
    "WebSocketServer is running on Port ws://localhost:" + wss.address().port
  );
});

wss.on("error", (error) => {
  console.log("WebSocketServer error: ", error);
});

wss.on("close", () => {
  console.log("WebSocketServer closed");
});

export default wss;
