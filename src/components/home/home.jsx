import React from 'react'
import './home.scss'
import PostAddIcon from '@mui/icons-material/PostAdd';
function home() {
  return (
    <main>
        <div className="header">
        <div className="addButton">
            <PostAddIcon className='buttonIcon'/>
        </div>
        </div>
        
    </main>
  )
}

export default home