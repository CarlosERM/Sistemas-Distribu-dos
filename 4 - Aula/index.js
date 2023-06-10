const connectDB = require("./config/db");
const app = require("./config/express");
const start = async () => {
  try {
    await connectDB(process.env.ME_CONFIG_MONGODB_URL);
    app.listen(app.get("PORT"), () => {
      console.log(`O servidor está rodando na porta ${app.get("PORT")}`.green);
    });
  } catch (error) {
    console.log(`${error}`.red);
  }
};

start();
