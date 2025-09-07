import Note from "../models/Note.js"


export async function getAllNotes(req,res){
    //Note.find() will give every single note. Refer to https://www.geeksforgeeks.org/mongodb/mongodb-tutorial/ 
    try {
        const notes = await Note.find().sort({createdAt:-1}) // last added note should come first so we sort by "createdAt" 
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getAllNotes contoller",error)
        res.status(500).json({message:"Internal Server Error"})
        
    }
}
export async function getNoteById(req,res){
    try {
        const note = await Note.findById(req.params.id);
        if(!note) { // if id is not found
        return res.status(404).json({message:"Note not found"});     
       }
        res.status(200).json(note)
    } catch (error) {
        console.error("Error in getNoteById contoller",error)
        res.status(500).json({message:"Internal Server Error"}) 
        
    }
}

export async function createNote(req,res){
    //An object is a data type that can take in collections of key-value pairs.
    try {
       const{title,content}=req.body;
       const newNote = new Note({title,content});
       const savedNote = await newNote.save();
       res.status(201).json(savedNote);
        
    } catch (error) {
        console.error("Error in createNote contoller",error);
        res.status(500).json({message:"Internal Server Error"});
        
    }

}

export async function updateNote(req,res){
    try {
       const{title,content}=req.body;
       const updateNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true}); //new true will return the update note
       if(!updateNote) { // if id is not found
        return res.status(404).json({message:"Note not found"});     
       }
       res.status(200).json(updateNote); 
        
    } catch (error) {
        console.error("Error in updateNote contoller",error);
        res.status(500).json({message:"Internal Server Error"});
        
    }
  
}

export async function deleteNote(req,res){
    try {
       const deletedNote = await Note.findByIdAndDelete(req.params.id);
       if(!deletedNote) { // if id is not found
        return res.status(404).json({message:"Note not found"});     
       }
       res.status(200).json({message:"Note deleted successfully"});
        
    } catch (error) {
        console.error("Error in deleteNote contoller",error);
        res.status(500).json({message:"Internal Server Error"});
        
    }


    
}