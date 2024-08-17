const express = require('express'); 
const app = express(); 
const urlRoute = require('./routes/url'); 
const {connectToMongoDB} = require('./connection'); 
const PORT = 8000; 
const URL = require('./models/url');
const url = "mongodb://localhost:27027/short-url";
connectToMongoDB(url).then(()=>console.log('connected to the mongoDB')).catch((err)=>console.log(`error is ${err}`));

// middlewares
app.use('/url', urlRoute); 
app.use(express.json());



app.get('/:shortId',async (req,res)=>{
    const shortid = req.params.shortId; 
    const entry =  await URL.findByIdAndUpdate({
        shortid
    }, {
        $push:{
            visitHistory:{
                timestamp: Date.now()
            }
        }
    }); 
    res.redirect(entry.redirectUrl); 
})

// PORT
app.listen(PORT,()=>console.log(`listening on the PORT ${PORT}`));