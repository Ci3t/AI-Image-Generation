import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './mongodb/connect.js';

import  dalleRoutes  from './routes/dalle.routes.js';
import postRoutes  from './routes/post.routes.js';
import * as url from 'url';
import path from 'path';
const __dirname = url.fileURLToPath(new URL('./', import.meta.url));

dotenv.config();

const app = express();
app.use(cors());
const PORT = 8080 || process.env.PORT
app.use(express.json({limit:'50mb'}));


const publicPath = path.join(__dirname, 'client');
app.use(express.static(publicPath));

app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
  });

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