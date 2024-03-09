import { MongoClient } from 'mongodb';
const express = require('express');
const bodyParser = require('body-parser');


async function main(){
    try{
        const app = express();
        app.use(bodyParser.json());

        const mongoUrl = 'mongodb+srv://harshiniupender:harshiniupender@cluster0.juqm2pd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        const mongo = await MongoClient.connect(mongoUrl);
        await mongo.connect();
        app.db = mongo.db();

        //Route
        app.use('/movies', require('./routes/movieRoutes'));

        //Server
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000/')
        });
    } catch(error){
        console.log(error);
        
    }
}

main();