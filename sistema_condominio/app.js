import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const port = process.env.PORT;

//DB
import connectDB from './config/db.js';
connectDB();

// cors
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

//analisa requisições HTTP com o tipo de conteúdo json.
//Basicamente, ele lê a carga útil JSON da requisição e a converte em um objeto JavaScript acessível através de req.body.
app.use(express.json());

//usado para analisar corpos de requisições codificados em URL.
app.use(express.urlencoded({ extended: false }));

//ROUTER
import router from './routes/router.js'
app.use(router);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
}); 