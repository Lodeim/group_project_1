import Modal from "react-modal";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import sapi from "../../api/sberAddRequest";
import { TextField } from "@mui/material";
import { theme } from "../../theme.js";
import { ThemeProvider } from "@mui/material/styles";
import Button from "../Button";

import "./styles.css";

export const UserAddPost = ({ isOpen, onClose }) => {
  // eslint-disable-next-line
  const [pictures, setPictures] = useState(null);
  const [postTitle, setPostTitle] = useState(null);
  const [text, setText] = useState(null);
  // eslint-disable-next-line
  const [tags, setTags] = useState([]);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    let trimArr = [];
    data.tags.split(",").forEach((e) => {
      let trim = e.trim();
      trimArr.push(trim);
    });
    data.tags = trimArr;
    sapi
      .addPost(data)
      .then((res) => (res.isPublished ? window.location.reload() : null));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="cnAddModal"
      overlayClassName="cnAddModalOverlay"
    >
      <ThemeProvider theme={theme}>
        <form className="cnAddModalForm" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Название"
            variant="outlined"
            placeholder="Название"
            {...register("title", { required: true })}
            onChange={(event) => setPostTitle(event.target.value)}
            error={postTitle === ""}
            helperText="Обязательное поле"
            multiline
            className="cnAddInput"
          />
          <TextField
            label="Текст"
            variant="outlined"
            placeholder="Текст"
            {...register("text", { required: true })}
            onChange={(event) => setText(event.target.value)}
            error={text === ""}
            helperText="Обязательное поле"
            multiline
            className="cnAddInput"
          />
          <TextField
            label="Изображение"
            variant="outlined"
            placeholder="Изображение"
            {...register("image")}
            onChange={(event) => setPictures(event.target.value)}
            multiline
            className="cnAddInput"
          />
          <TextField
            label="Теги"
            variant="outlined"
            placeholder="Теги через запятую"
            {...register("tags", { required: false })}
            onChange={(event) => setTags(event.target.value)}
            multiline
            className="cnAddInput"
          />

          <Button type="submit" variant="contained">
            Добавить
          </Button>
        </form>
      </ThemeProvider>
    </Modal>
  );
};
