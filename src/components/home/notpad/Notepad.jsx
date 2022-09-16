import { Grid } from '@mui/material'
import React from 'react'
import './Notepad.scss'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { updateData } from '../../../freatures/note/noteSlice'
function Notepad({data}) {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const deleteNote = async() => {
    try{
      await axios({
        method:'delete',
        url:`${process.env.REACT_APP_BASE_URL}/notes/deleteNote`,
        data:{
          noteID:data._id
        }
      })
      toast.success('succesfully deleted')
    }catch(err) {
      console.log(err)
    }
   
  }
 
  return (
    <Grid className='noteContainer' item sx={{'m':1,'p':5}} style={{'backgroundColor': data.color}} md={3}  >
       <div className="icon" onClick={deleteNote}>
        <DeleteIcon/>
       </div>
       <div onClick={() => {
        dispatch(updateData(data))
        navigate('/editNotes')
        }}>
       <div className="header">
        <h2>{data.title}</h2>
       </div>
       <div className="created">
        <p>{data.createdAt}</p>
       </div>
       <div className="content">
        <p>
           {data.note}
        </p>
       </div>
       </div>
       
    </Grid>
  )
}

export default Notepad