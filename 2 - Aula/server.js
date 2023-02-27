const app = require('./app');
require('dotenv').config()
// Define a porta do serviço.
app.set('port', process.env.PORT || 5000);



// Inicio do servidor.

const server = app.listen(app.get('port'),()  => {
    console.log("O servidor está rodando na porta " + app.get('port'));
});