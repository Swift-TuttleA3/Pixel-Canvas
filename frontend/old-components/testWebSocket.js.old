import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:3131");

ws.on("open", () => {
  console.log("WebSocket connection established");
  ws.send(JSON.stringify({ type: "testMessage", message: "Hello, Server!" }));
});

ws.on("message", (data) => {
  console.log("Message from server:", JSON.parse(data));
});

ws.on("error", (error) => {
  console.error("WebSocket error:", error);
});

ws.on("close", () => {
  console.log("WebSocket connection closed");
});
