import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app=express();
const PORT=process.env.PORT || 5001//This line creates an instance of the Express application. The express() function returns an object that represents our web application. We assign it to the constant variable app. This app object will be used to configure routes, middleware, and start the server.
const __dirname = path.resolve() //__dirname is the backend path



//middleware is something that run before the response is returned
if(process.env.NODE_ENV!=="production"){
    app.use(cors()); //https://expressjs.com/en/resources/middleware/cors.html
}

app.use(express.json());// This allows us to get access to the request body passed in Postman
// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} & Req url is ${req.url}`);
//     next(); //Without this statement, getAllNotes does not run
// })

app.use(ratelimiter)


app.use("/api/notes",notesRoutes);

if(process.env.NODE_ENV==="production"){

    app.use(express.static(path.join(__dirname,"../frontend/vite-project/dist")))
    app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/vite-project","dist","index.html"))
    })

}




/*// What is an Endpoint?
// An endpoint is a combination of a URL + HTTP method that lets the client interact with a specific resource.

app.get("/api/notes",(req,res)=>{
    res.status(200).send("You just fetched the notes");
});

app.post("/api/notes",(req,res)=>{
    res.status(201).json({message:"Note created successfully"})
})

app.post("/api/notes/:id",(req,res)=>{
    res.status(200).json({message:"Note updated successfully"})
})
app.delete("/api/notes/:id",(req,res)=>{
    res.status(200).json({message:"Note deleted successfully"})
})*/


//connect database first and then start the application
connectDB().then(()=>{
    app.listen(PORT,()=>{ // This is a method provided by the Express app object that starts an HTTP server and listens for incoming requests on a specified port.
    console.log("Server started on PORT:",PORT); 
}); 

})


//mongodb+srv://bhaskarshekar11:3aB99ATPKrx01WFx@cluster0.bsavhnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0





