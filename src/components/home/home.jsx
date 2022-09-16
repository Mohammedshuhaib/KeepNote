import React from "react";
import "./home.scss";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Notepad from "./notpad/Notepad";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate();
  return (
    <main>
      <div className="header">
        <div className="addButton" onClick={() => navigate('/add')}>
          <PostAddIcon className="buttonIcon" />
        </div>
      </div>
      <Grid container spacing={2} className="notpad">
       <Notepad className='item'/>
       <Notepad className='item'/>
       <Notepad className='item'/>
      </Grid>
     
    </main>
  );
}

export default Home;
