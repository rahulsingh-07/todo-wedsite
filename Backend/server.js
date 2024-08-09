require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const cors=require('cors')
const authroute=require('./routers/authRouter')
const contactRoute=require('./routers/contactRouter')
const taskRoutes = require('./routers/taskRouter');
app.use(cors())

const corsOptions = {
    origin: "http://localhost:5175",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
  };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




const connectDb=require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');
app.use('/api/auth',authroute)
app.use('/api/tasks', taskRoutes);
app.use('/api/form',contactRoute)
app.use(errorMiddleware)

connectDb().then(()=>{
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Listening on ${process.env.PORT || 3000}`);
    });
});

