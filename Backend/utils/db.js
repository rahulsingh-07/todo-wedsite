const dotenv = require('dotenv');
dotenv.config();
const mongoose=require('mongoose')


const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.URI)
        console.log('connection successful')
    } catch (error) {
        console.error('database connection failed')
        process.exit(0);
    }
}

module.exports=connectDb