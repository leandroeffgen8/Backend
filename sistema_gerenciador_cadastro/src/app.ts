require('dotenv').config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import connect from './config/db';  
import router from './routes/Routes';

const app = express();

// Port
const port = process.env.PORT;


// Configurar CORS
app.use(cors({
    origin: 'http://localhost:5173', // Permitir apenas o frontend específico
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));

app.use(express.json());

//usado para analisar corpos de requisições codificados em URL.
app.use(express.json({ limit: '100000000mb' })); // Ajuste o limite conforme necessário
app.use(express.urlencoded({ limit: '100000000mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
 
// Configurar CORS
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

// Routes
app.use(router);
 
app.listen(port, async () => {
    await connect();
    console.log(`Aplicação rodando na porta ${port}`);
});

