import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 

const app = express();
const port = process.env.PORT;

//analisa requisições HTTP com o tipo de conteúdo json.
//Basicamente, ele lê a carga útil JSON da requisição e a converte em um objeto JavaScript acessível através de req.body.
app.use(express.json());
 
// cors
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

//usado para analisar corpos de requisições codificados em URL.
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


//DB
import connectDB from './config/db.js';
connectDB();

//ROUTER
import router from './routes/router.js'
app.use(router); 

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
}); 