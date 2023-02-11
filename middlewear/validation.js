const methods =['body','params','headers','query'];
const validation=(schema)=>{
  let validationArray=[];
  return (req,res,next)=>{
 methods.forEach( key=>{
   if(schema[key]){
    const validationresult= schema[key].validate(req[key],{abortEarly:false});
     if(validationresult?.error?.details){
      validationArray.push(validationresult.error.details)
     } 
   }
  } )

  if(validationArray.length >0){
    res.json({message:"validation error",err:validationArray})
     validationArray=[];
  
  }else{
    next()
  }

}
}

module.exports={validation}