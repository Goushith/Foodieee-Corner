const express = require('express')
const mongoDB = require('./db')
const app = express()
mongoDB()



app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers","Origin ,   X-Requested-With , Content-Type , Accept  "
);
next(); 
})

const port = 5000
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('Hello World')
})
app.use(express.json())
app.use('/api', require("./Routes/Createuser"))
app.use('/api', require("./Routes/Displaydata"))
app.use('/api', require("./Routes/OrderData"))

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})