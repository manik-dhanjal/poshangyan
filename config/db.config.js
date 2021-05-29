const mongoose = require('mongoose');
require("dotenv").config()


const connectDB = async () => {
    try{
        const isNodeEnvDevelopment = process.env.NODE_ENV === 'Development'
        const mongoDbURI =  process.env.MONGODB_URI;
        console.log(mongoDbURI)
        const db = await mongoose.connect(mongoDbURI,{
                    useNewUrlParser: true, 
                    useUnifiedTopology: true
                })

                console.log(`MongoDb Connected: ${db.connection.host}`)
    }catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}


module.exports = connectDB