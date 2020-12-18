const express = require ("express")
const app = express()

const port = 3000 || process.env.port

app.get("/",(req,res)=>{
    res.send("<h1>Server Working</h1>")
})

app.listen(port,()=>{
    console.log(`Server running at ${port}`)
})