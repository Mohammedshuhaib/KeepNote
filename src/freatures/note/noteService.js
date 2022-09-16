import axios from "axios";

const create = async (formData) => {
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/notes/create`,
      data: {
        title: formData.title,
        note: formData.note,
        color: formData.color,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    if (err.response.data.status === 403) {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/token`,
        withCredentials: true,
      });
      create(formData);
    }
  }
};

const getNotes = async (formData) => {
  const response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BASE_URL}/notes/getNotes`,
    withCredentials: true,
  });
  if (response.data) {
    localStorage.setItem("noteData", JSON.stringify(response.data));
  }

  return response.data;
};

const updateNotes = async (formData) => {
  const response = await axios({
    method: "put",
    data: {
      _id: formData._id,
      title:formData.title,
      note: formData.note,
      color:formData.color.hex
    },
    url: `${process.env.REACT_APP_BASE_URL}/notes/updateNote`,
    withCredentials: true,
  });

  return response.data;
};

const noteService = {
  create,
  getNotes,
  updateNotes
};

export default noteService;
