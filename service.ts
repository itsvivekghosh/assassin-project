const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const logger = require("morgan");

// Importing the http module
const http = require("http");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const MONGODB_PORT = '27017'
const MONGODB_URI = '0.0.0.0'
const MONGODB_DATABASE_NAME = 'fampay-assignment'

mongoose
  .connect(`mongodb://${MONGODB_URI}:${MONGODB_PORT}/${MONGODB_DATABASE_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to MongoDB Server at Port: ${MONGODB_PORT}`)
  })
  .catch((err: any) => {
    if (err) {
      console.log(`Failed to connect to MongoDB: ${err}`);
    }
  });

// Creating server
const server = http.createServer((req: any, res: any) => {
	// Sending the response
	res.write("This is the response from the server")
	res.end();
})

// Server listening to port 3000
server.listen((3000), () => {
	console.log("Server is Running");
})

module.exports = app;