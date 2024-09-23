const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 


app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));


//Conexão com banco de dados
const db = require('./db/db'); 

db();

const routes = require('./routes/router');
app.use('/api', routes);

app.listen(5000, () => {
    console.log('Servidor online!')
})