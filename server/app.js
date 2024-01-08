import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
//import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";
import mqtt from "mqtt";
import axios from 'axios';

//CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __diraname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
//app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
//app.use(cors());
app.use("/assets", express.static(path.join(__diraname, "public/assets")));


// SOCKET.IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    }
  });

  
io.on("connection", (socket) => {
  console.log("New client connected");

 
    socket.emit("notification", { message: "Hello from the server 😉" });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
});

const PORT = process.env.PORT || 6001;
httpServer.listen(3002, () => console.log(`Server Port: 3002`));  

//MOONGOOSE

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));

//ROUTING
import authRoute from "./routes/authRoute.js";
import eventRoute from "./routes/eventRoute.js";
import locationRoute from "./routes/locationRoute.js";
import institutionRoute from "./routes/institutionRoute.js";
import userRoute from "./routes/userRoute.js";
import geoqueriesRoute from "./routes/geoqueries.js";
import messageRoute from "./routes/messageRoute.js";

app.use("/api/auth", authRoute);
app.use("/api/event", eventRoute);
app.use("/api/location", locationRoute)
app.use("/api/institution", institutionRoute);
app.use("/api/user", userRoute);
app.use("/api/geoqueries", geoqueriesRoute);
app.use("/api/message", messageRoute);

// MQTT connection

const publisher = mqtt.connect('mqtt://localhost:1883');
const subscriber = mqtt.connect('mqtt://localhost:1883');

publisher.on('connect', () => {
  console.log('Publisher connected to broker');

  const publishMessage = () => {
    const message = `Hello, MQTT! - ${new Date()}`;
    publisher.publish('your/topic', message);
    console.log(`Published: ${message}`);
  };

  const intervalId = setInterval(publishMessage, 60000);

  setTimeout(() => {
    clearInterval(intervalId);
    publisher.end();
    console.log('Publisher stopped after 5 minutes');
  }, 300000);
});


subscriber.on('connect', () => {
  console.log('Subscriber connected to broker');
  subscriber.subscribe('send/message');

  subscriber.on('message', async (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message.toString()}`);
    
    const receivedData = JSON.parse(message.toString());

    const formattedData = {
      body: receivedData.body,
      category: receivedData.category,
      location: {
        type: "Point",
        coordinates: [receivedData.longitude, receivedData.latitude]
      },
      time: new Date(receivedData.time).toISOString()
    };

    try {
      const response = await axios.post('http://localhost:3001/api/message', formattedData);
      console.log('Message sent to API:', response.data);
    } catch (error) {
      console.error('Error sending message to API:', error);
    }
  });
});

subscriber.on('error', (error) => {
  console.error('Error with MQTT connection:', error);
});


export default app;