const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT||4000;
const userdata = require('./db/userdata');
var cors = require('cors')
app.use(express.json());
app.use(express.urlencoded());
const mongoURL = "mongodb+srv://divij:rMn7wBTuHw1IiWXa@cluster0.istyisk.mongodb.net/";
app.use(cors()) //


mongoose.connect(mongoURL,{
    useNewUrlparser: true
}).then(()=>{
    console.log("connected to database");
})
.catch((e)=>console.log(e));
//home route
app.get('/',(req,res)=>{
    res.send("mhello from the express...");
});
// const mongoURL = "mongodb+srv://bhanu:dM7btuEdKWWDQgpj@cluster0.bukxiiu.mongodb.net/finco?retryWrites=true&w=majority";
app.post('/signup',async(req,res)=>{
    console.log(req.body);
    try{
        const password = req.body.password;
        const name = req.body.name;
        const email = req.body.email;
        console.log(req.body);
        const user = new userdata({
            name: name,
            email:email,
            password:password,
            plan:{},
            stDate:"",
            endDate:""
        })
        await user.save();
        res.send("data saved");
        
    }catch(error){
        res.send({status:"error"});
    }
})

app.post('/signin',async(req,res)=>{
    const {email, password} = req.body;
    userdata.findOne({email:email}).then((user)=>{
        if(user){
            if(password==user.password){
                console.log("login successfull");
                res.send({message:"Login Successfull", user:user});

            }
            else{
                console.log("invalid password");
                
                console.log(password);
                console.log(user.password);
                res.send({message:"password dindn't match"});
            }
        }
        else{
            console.log("user not registerd")
            res.send("user not registered");
        }
        
    })
})
app.post('/addplan',async(req,res)=>{
     const data = req.body.data.object;
     console.log(req.body.data.object)
    console.log(req.body.data.object);
    console.log(data[0]);
    console.log(data[1]);
   // console.log(plan);
    
    userdata.updateOne({email:String(data[0])},{$set:{plan:data[1]}}).then((datad)=>{
        console.log("data submitted");
        console.log(datad);
    }).catch((err)=>{
        console.log(err);
    });
})
app.listen(port, ()=>{console.log("listining to server on http://localhost:4000")});

