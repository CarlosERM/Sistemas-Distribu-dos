require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_DOCKER_PORT,
  MONGODB_DATABASE,
  NODE_LOCAL_PORT,
} = process.env;

// Define a porta do serviço.
app.set("port", NODE_LOCAL_PORT || 5000);

async function main() {
  try {
    await connectDB(`mongodb://user:pass@127.0.0.1:port/database`);
    app.listen(app.get("port"), () => {
      console.log("O servidor está rodando na porta " + app.get("port"));
    });
  } catch (error) {
    console.log(error);
  }
}

main();
