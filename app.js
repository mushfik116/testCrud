const express = require("express")
const cors =require("cors")
const mongoose =require("mongoose")



//MONGOOSE + SCHEMA
main().catch(err => console.log(err));
//password .. zaG4gfU4KdzlnRJt
async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/FLOW');
    await mongoose.connect('mongodb+srv://mushfiqr116:abc@cluster0.eskt9i2.mongodb.net/?retryWrites=true&w=majority');

    
    console.log("DB CONNECTED")
}
const userSchema = new mongoose.Schema({
    name: String,
    code:String
  });
  const User = mongoose.model('User', userSchema);

  
  //SERVER CONNECTION +MDS
  const server =express()
  //connecting build
  server.use(express.static("build"))
  
server.use(cors())
server.use(express.json())

server.get("/full", async(req,res)=>{
   const user = await User.find()
    res.json(user)
})

server.post("/full",async(req,res)=>{
    try {
        const user = new User()
        user.name=req.body.name
        user.code=req.body.code
        const doc= await user.save()
        res.json(doc)
        
    } catch (error) {
        console.log(err)
    }
})

server.delete("/full/:id",async(req,res)=>{
    try {
       const user =await User.findById(req.params.id)
       console.log(user)
       user.deleteOne()
       res.json("user deleted")
        
    } catch (error) {
        console.log(error)
    }
})



server.listen(8080,()=>{
    console.log("server running on 8080")
})