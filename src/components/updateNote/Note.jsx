import {
  Button,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import "./Note.scss";
import InputColor from "react-input-color";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { updateNotes, reset } from "../../freatures/note/noteSlice";
import Spinner from "../spinner/Spinner";
import { useNavigate } from "react-router-dom";

function Note() {
  const [color, setColor] = React.useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { noteData, isLoading, isError, isSuccess, message, updateData } =
    useSelector((state) => state.note);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [noteData, isError, isSuccess, message, navigate, dispatch, isLoading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let title = data.get("title");
    let note = data.get("note");
    if (!title || !note) {
      toast.error("Please fill the required field");
    } else {
      let formData = {
        _id: updateData._id,
        title,
        note,
        color,
      };
      dispatch(updateNotes(formData));
      navigate("/home");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

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
          }}
        >
          <Typography component="h1" variant="h13" sx={{ mb: 5 }}>
            Edit a note
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                required
                fullWidth
                id="title"
                label="Title"
                defaultValue={updateData.title}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextareaAutosize
                aria-label="Enter the content"
                name="note"
                required
                defaultValue={updateData.note}
                minRows={20}
                placeholder="Note"
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              mt: 2,
              fontSize: "15px",
            }}
          >
            <label>Pick a color</label>
          </Grid>

          <Grid item sx={{ mt: 3 }}>
            <InputColor
              initialValue="#5e72e4"
              onChange={setColor}
              placement="start"
              defaultValue={updateData.color}
            />
            <div
              style={{
                width: "100%",
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
        </Box>
      </Grid>
    </Grid>
  );
}

export default Note;
