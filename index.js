const WebSocket = require("ws");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;  
const server = app.listen(port, () => console.log(`Server running on port ${port}`));
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => console.log("Client disconnected"));
});
