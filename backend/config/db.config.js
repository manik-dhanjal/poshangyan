const mongoose = require('mongoose');
require("dotenv").config()
const logger = require("../utils/logger");

const connectDB = async () => {
    try{
        // const isNodeEnvDevelopment = process.env.NODE_ENV === 'Development'
        const mongoDbURI =  process.env.PG_MONGODB_URI||"mongodb://localhost:27017/poshan-gyan?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";
        // const mongoDbURI =  'mongodb://localhost:27017/poshan-gyan'
        const db = await mongoose.connect(mongoDbURI,{
                    useNewUrlParser: true, 
                    useUnifiedTopology: true
                })

                logger.info(`MongoDb Connected: ${db.connection.host}`)
    }catch(error){
        console.log(error.message);
        process.exit(1);
    }
}


module.exports = connectDB