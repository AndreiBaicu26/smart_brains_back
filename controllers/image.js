const Clarifai = require("clarifai");

const app = new Clarifai.App({
    apiKey: "8b2992b004124fb6809fc63a80884ceb"
  });

 const handleApi = (req,res)=>{
     app.models.predict(Clarifai.FACE_DETECT_MODEL, 
    req.body.input)
    .then(data=>{res.json(data)})
    .catch(err=>res.status(400).json('Unable to work with api'))
     }  
const handleImage = (req, res,db)=>{
    const { id } =req.body;
    db('users').where('id', '=',id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        if(entries.length){
            res.json(entries);
        }else{
            res.status(400).json('error getting entries')
        }
       
    }).catch(err=> res.status(400).json('error getting entries'));
}
module.exports = {
    handleImage: handleImage,
    handleApi: handleApi
}