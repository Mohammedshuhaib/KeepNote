import React, { useEffect } from "react";
import "./home.scss";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Notepad from "./notpad/Notepad";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getNotes, reset } from "../../freatures/note/noteSlice";
import Spinner from "../spinner/Spinner";
function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { noteData, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.note
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [noteData, isError, isSuccess, message, navigate, dispatch, isLoading]);

  useEffect(() => {
    dispatch(getNotes());
  }, [noteData, dispatch]);

  return (
    <main>
      <div className="header">
        <div className="addButton" onClick={() => navigate("/add")}>
          <PostAddIcon className="buttonIcon" />
        </div>
      </div>
      <Grid container spacing={2} className="notpad">
        {noteData &&
          noteData.map((data) => <Notepad className="item" data={data} />)}
      </Grid>
    </main>
  );
}

export default Home;
