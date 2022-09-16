import { Grid } from '@mui/material'
import React from 'react'
import './Notepad.scss'
function Notepad() {
  return (
    <Grid className='noteContainer' item sx={{'m':1,'p':5}} md={3} >
       <div className="header">
        <h2>lksdjf</h2>
       </div>
       <div className="created">
        <p>24/4/10</p>
       </div>
       <div className="content">
        <p>
            lsdkfjlsdkfjlsdkfjlksfdj
        </p>
       </div>
    </Grid>
  )
}

export default Notepad