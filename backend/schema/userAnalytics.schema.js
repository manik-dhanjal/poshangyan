const mongoose = require("mongoose");
const userAnalyticsSchema = new mongoose.Schema({
   visits:{
       type:Number,
       default:0,
   }
});
module.exports = mongoose.model("userAnalytics", userAnalyticsSchema);

