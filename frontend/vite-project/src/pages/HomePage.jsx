import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUi from '../components/RateLimitedUi'
import { useState} from 'react'
import api from "../lib/axios.js"
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import NotesNotFound from "../components/NotesNotFound.jsx"


const HomePage = () => {
const [isRateLimited,setIsRateLimited]= useState(false) //https://react.dev/reference/react/useState
const [notes,setNotes] =useState([])
const [loading,setLoading]=useState(true)

useEffect(()=>{
  const fetchNotes = async()=>{
    try {
      const res= await api.get("/notes") /* CORS is a browser security rule. When a website tried to get data from another website - or like your frontend calling an API on a different domain- the browser might block it by default because it doesn't know if the API allows this request from a different origin*/
      console.log(res.data);
      setNotes(res.data);
      setIsRateLimited(false)
      
    } catch (error) {
      console.log("Error fetching notes", error)
      if(error.response.status === 429){
        setIsRateLimited(true)
      }else{
        toast.error("Failed to load notes")
      }    
    } finally {
      setLoading(false)
    }


  }

  fetchNotes();

},[])

return (

    <div className='min-h-screen'>
      <Navbar />
      
      {isRateLimited && <RateLimitedUi />} {/*Conditiondal rendering https://react.dev/learn/conditional-rendering*/ } 

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading notes... </div>}
        
        {notes.length===0 && !isRateLimited && <NotesNotFound />}

        {notes.length>0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'> 
          {notes.map((note)=>(
             <NoteCard key={note.id} note={note} setNotes={setNotes}/>
            
          ))}
          </div>          
        )}


      </div>
      

    </div>
  )
}

export default HomePage