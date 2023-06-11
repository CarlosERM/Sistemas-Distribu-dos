const app = require("./config/express");
const connectDB = require("./config/db");
const { NODE_ENV, ME_CONFIG_MONGODB_URL } = process.env;

const start = async () => {
  try {
    await connectDB(ME_CONFIG_MONGODB_URL);
    app.listen(app.get("PORT"), () => {
      console.log(
        `O servidor está rodando na porta ${app.get(
          "PORT"
        )} no modo de ${NODE_ENV}.`.green
      );
    });
  } catch (error) {
    console.log(
      `Não foi possível se conectar com o banco de dados: ${error}`.red
    );
  }
};

start();
