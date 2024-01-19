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
import fs from 'fs';
import { spawn } from 'child_process';

//CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


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
const subscriberImage = mqtt.connect('mqtt://localhost:1883');

publisher.on('connect', () => {
  console.log('Publisher connected to broker');

  setTimeout(() => {
    publisher.end();
    console.log('Publisher stopped after 10 minutes');
  }, 600000);
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

const imagesDirectory = path.join(__dirname, 'images');

if (!fs.existsSync(imagesDirectory)) {
  fs.mkdirSync(imagesDirectory);
}

// URVRV ALGORITHM AND RECIEVEING A IMG
subscriberImage.on('connect', () => {
  console.log('SubscriberImage connected to broker');
  subscriberImage.subscribe('send/image');

  subscriberImage.on('message', (topic, message) => {
    console.log(`Received image message on topic ${topic}`);

    const imageData = JSON.parse(message.toString());

    const buffer = Buffer.from(imageData.image, 'base64');

    const filename = `image-${Date.now()}.jpg`;
    const filePath = path.join(imagesDirectory, filename);

    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        console.error('Error writing the image file:', err);
      } else {
        console.log(`Image saved successfully as ${filename}`);

        const pythonScriptPath = path.join(__dirname, 'algorithm_URVRV/main.py');
        const pythonProcess = spawn('python3', [pythonScriptPath, filePath]);

        let data = ''; // Define data in the scope of the event handlers

        pythonProcess.stdout.on('data', (data) => {
          console.log(`Python script output: ${data}`);
        });

        pythonProcess.stderr.on('data', (data) => {
          console.error(`Error from Python script: ${data}`);
        });

        pythonProcess.on('close', (code) => {
          console.log(`Python script exited with code ${code}`);

          // Publish the number of people detected to an MQTT topic
          const numPeople = parseInt(fs.readFileSync("numberPeople.txt"), 10);

          if (numPeople > 10)
            publisher.publish('people/detection', "It is crowded");
          else if (numPeople == 0)
            publisher.publish('people/detection', "There are no people");
          else
            publisher.publish('people/detection', "It is not crowded");

          console.log(`Published: ${numPeople} people detected`);
        });

      }
    });

    const location = { latitude: imageData.latitude, longitude: imageData.longitude };
    const timestamp = imageData.time;

    console.log("newImage", { filename, location, timestamp });
  });
});

subscriberImage.on('error', (error) => {
  console.error('Error with MQTT connection for subscriberImage:', error);
});


export default app;