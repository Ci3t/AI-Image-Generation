import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './mongodb/connect.js';

import  dalleRoutes  from './routes/dalle.routes.js';
import postRoutes  from './routes/post.routes.js';


dotenv.config();

const app = express();
app.use(cors());
const PORT = 8080 || process.env.PORT
app.use(express.json({limit:'50mb'}));

app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);

app.get('/',async(req,res)=>{
    res.send('Hello DALL-E!')
})


const startServer = async ()=>{

    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(PORT,()=>{
            console.log(`Server has Started on ${PORT}` )
        })
    }catch(error){
        console.log(error);
    }
}

startServer()