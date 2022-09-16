import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import "./Note.scss";
import InputColor from 'react-input-color';
function Note() {
    const [color, setColor] = React.useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  return (
    <Grid container sx={{ display: "flex", justifyContent: "center" }}>
      <Grid md={6}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h13" sx={{ mb: 5 }}>
            Add a note
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="title"
              required
              fullWidth
              id="title"
              label="Title"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextareaAutosize 
             fullWidth
              aria-label="Enter the content"
              minRows={20}
              placeholder="Note"
              style={{width:'100%'}}
            />
          </Grid>
        </Grid>
        <Grid sx={{display:'flex',justifyContent:'flex-start',mt:2,fontSize:'15px'}}>
        <label>Pick a color</label>
        </Grid>
        
        <Grid item sx={{mt:3}}>
        
      <InputColor
        initialValue="#5e72e4"
        onChange={setColor}
        placement="right"
      />
      <div
        style={{
          width: '100%',
          height: 50,
          marginTop: 20,
          backgroundColor: color.rgba,
        }}
      />
    </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
           Save
        </Button>
      </Grid>
    </Grid>
  );
}

export default Note;
