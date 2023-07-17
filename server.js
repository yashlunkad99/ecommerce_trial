import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import auth from './routes/auth.js';
import CategoryRoute from './routes/CategoryRoute.js';
import productRoute from './routes/productRoute.js';
import cors from 'cors';

//CONFIG ENV
dotenv.config();

//database connection
connectDB();

//rest object
const app = express();


//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//router
app.use("/api/v1/auth",auth);
app.use("/api/v1/category",CategoryRoute);
app.use("/api/v1/product",productRoute);

//rest api
app.get('/',(req,res) => {
    res.send({message:'Hello World'})
});

//PORT
const PORT =process.env.PORT || 8080 ;

//RUN
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 


   
