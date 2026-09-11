const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/users")
const app= express();
app.use(express.json())
app.post("/signup", async (req,res)=>{
    // const user=new User({
    //         firstName:"Thirupathi",
    //         lastName:"Kurva",
    //         email:"thirupathikurva@gmail.com",

    // })
    const user=new User(req.body)
    try{
        await user.save();
       res.send("User Added Successfully");
    }
    catch(err){
        res.status(400).send("error saving the data" + err.message)
    }
      
})

 app.get("/user",async (req,res)=>{
        const userEmail= req.body.email;
        try{
            const userView= await User.find({email:userEmail});
            //console.log(userView);
            if(userView.length ===0){
                res.status(400).send("User Not found")
            }
            else{
                res.send(userView)
            }
            
        }
        catch(err){
            res.status(400).send("Something went wrong" + err.message)
        }
           

 })
 app.delete("/user", async (req,res)=>{
            const userId = req.body.userId;
            try{
                const deleteView= await User.findByIdAndDelete({_id:userId})
                res.send("User deleted Successfully");
            }
            catch(err){
            res.status(400).send("Something went wrong" + err.message)
        }
            
 })
 app.patch("/user/:userId", async (req,res)=>{
            // const userId= req.body.userId;
            const userId= req.params?.userId;
            const data=req.body;
            try{
                const allowed_updates=["photoUrl","about","age","skills"];
                const isUpdatedAllowed=Object.keys(data).every((k)=>{
                    allowed_updates.includes(k)
                });
                if(!isUpdatedAllowed){
                    throw new Error("Update not allowed")
                }
                if(data?.skills.length>10){
                    throw new Error("Skils can not morethan 10")
                }
                const userUpdate= await User.findByIdAndUpdate({_id:userId},data,{
                    returnDocument:"after",
                    runValidators:true
                })
                res.send("User updated Successfully")
            }
            catch(err){
            res.status(400).send("Something went wrong" + err.message)
        }
            
 })

// app.use("/user",(req,res)=>{
//     console.log("user");
//     res.send("test");
//     res.send({
//         "firstName":"Thirupathi",
//         "LastName":"Kurva"
//     })

// });
// app.get("/test",(req,res)=>{
//     console.log("user");
//     res.send("test");
//     res.send({
//         "firstName":"Rajeswari",
//         "LastName":"Kurva"
//     })

// })

connectDB()
.then(()=>{
    console.log("Connect DB Connection");
    app.listen(7777,()=>{
        console.log("Server Connected");
    })
})
.catch((err)=>{
    console.error("DB not connected" + err)
})

