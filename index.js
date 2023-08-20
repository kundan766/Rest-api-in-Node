// const express=require("express");

// const users=require("./MOCK_DATA.json");

// const app=express();
// const PORT=8000;
// // routes

// app.get("/users",(req,res)=>{
//     const html=`
//     <ul>
//     ${users.map(user=>`<li>${user.first_name}</li>`)}
    
//     </ul>
//     `;
//     res.send(html);
// })
// //rest api

// app.get('/api/users', (req,res)=>{
//     return res.json(users)
// });

// app.get("api/users/:id",(req,res)=>{
//     const id=Number(req.params.id);
//     const user=users.find((user)=>user.id===id);
//     return res.json (users);
// });


// app.listen( PORT,()=>console.log(`Server is listening at PORT:${PORT} `))

const express = require("express");
const fs=require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;
//middleware plugin
app.use(express.urlencoded({extended:false}));
app.use((req,res,next)=>{
   console.log("Hello from middleware 1 ");
   next();
});

app.use((req,res,next)=>{
    console.log("Hello from middleware 2 ");
    return res.end("hey");
 });

app.get("/users", (req, res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`)}
    </ul>
    `;
    res.send(html);
});

app.get("/api/users", (req, res) => {
    return res.json(users);
});

app
    .route("/api/users/:id")

   .get( (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    
    if (user) {
        return res.json(user);
    } else {
        return res.status(404).json({ message: "User not found" });
    }
})

  .patch((req,res)=>{
    // edit user with id
     

    return res.json({status:"pending"})
})

.delete((req,res)=>{
    //delete the user
   return res.json({status:"pending"})
})

app.post("/api/users",(req,res)=>{
    //todo: create new users
     const body=req.body;
     users.push({...body,id:  users.length+1});
     fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json({status:"success",id:users.length});
     })

     
    //  console.log("Body",body);
    // return res.json({status:"pending"});
});


// app.patch("api/users/:id",(req,res)=>{
//     //todo: edit the user
//     return res.json({status:"pending"});
// });

// app.delete("api/users/:id",(req,res)=>{
//     //todo: delete the user
//     return res.json({status:"pending"});
// });


app.listen(PORT, () => console.log(`Server is listening at PORT:${PORT}`));
