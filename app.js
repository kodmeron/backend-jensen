const express = require("express")
const app = express()

app.get("/", (req, res)=>{
    res.status(200).send({"STATUS":"SUCCESS"})
})

app.listen(3000 , ()=>{
    console.log(`STARTED LISTENING ON PORT 3000`)
});