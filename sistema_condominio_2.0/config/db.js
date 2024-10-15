import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
 
const connection = async () => {
    try {

        const conn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.xkek4.mongodb.net/`)
        console.log('Conectou ao bando de dados');

        return conn;
        
    } catch (error) {
        console.log(error);
    } 
}

export default connection