const express = require("express")
const app = express()

app.get("/", (req, res)=>{
    res.set('WWW-Authenticate', 'Basic realm="Access to Index"')
    res.status(401).send("Unauthorized access")
})

app.listen(3000 , ()=>{
    console.log(`STARTED LISTENING ON PORT 3000`)
});