const app = require("./config/express");

const start = async () => {
  try {
    app.listen(app.get("PORT"), () => {
      console.log(
        `O servidor está escutando na porta ${app.get("PORT")}`.green
      );
    });
  } catch (error) {
    console.log(`${error}`.red);
  }
};

start();
