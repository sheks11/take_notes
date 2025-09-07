import mongoose, { trusted } from "mongoose";

//1- create a schema
//2-model based off that schema

const noteSchema= new mongoose.Schema({ //mongoose.Schema accepts objects as input
    title:{
        type:String,
        required:true,
    },

    content:{
        type:String,
        required:true,
    }

}, 
{
    timestamps:true
}

);

const Note = mongoose.model("Note", noteSchema)

export default Note