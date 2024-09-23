import mongoose from "mongoose";
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;


const connect = async () => {

    try {
        
        const conn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.f4i9sa3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log('Conectou ao bando de dados!')

        return conn;

    } catch (error) {
        console.log(error);
    }
}


export default connect