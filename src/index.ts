import { MongoClient } from 'mongodb';
const express = require('express');
const bodyParser = require('body-parser');
import { createServer } from 'http';

export async function main(){
    try{
        const app = express();
        app.use(bodyParser.json());

        const mongoUrl = 'mongodb+srv://harshiniupender:harshiniupender@cluster0.juqm2pd.mongodb.net/';
        const mongoClient = new MongoClient(mongoUrl);
        await mongoClient.connect();
        const db = mongoClient.db();

        app.db = db;
        //Route
        app.use('/movies', require('./routes/movieRoutes'));

        return app;
    } catch(error){
        console.log(error);
        
    }
}

export async function startServer() {
    const { app } = await main();
    const server = createServer(app);
    const port = 3000;
    server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}/`);
    });
    return server;
}

if (require.main === module) {
    startServer();
}