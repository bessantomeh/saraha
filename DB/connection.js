const mongoose = require('mongoose');
const connectDB = async()=>{

 return await mongoose.connect(process.env.BDURI).
 then( res=>{ console.log("connected DB")}).catch(
    err=>{
        console.log(`fail connect ${err}`)
    }
 )
 
}


module.exports={connectDB}