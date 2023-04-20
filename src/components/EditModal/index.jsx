import { TextField } from "@mui/material";
import Modal from "react-modal";
import Button from "../Button";
import { useCallback, useEffect, useMemo, useState } from "react";

import "./styles.css";

const requiredText = "Поле обязательное";
const validateText = (text, cb) => {
  if (!text) {
    cb(requiredText);
    return true;
  }
  return false;
};

export const EditModal = ({
  postId,
  image,
  tags,
  title,
  text,
  isOpen,
  onClose,
  onEdit,
}) => {
  // eslint-disable-next-line
  const [isEditMode, setIsEditMode] = useState(true);
  const [formImage, setFormImage] = useState(image);
  const [imageError, setImageError] = useState("");
  const [formTags, setFormTags] = useState(tags);
  const [tagsError, setTagsError] = useState("");
  const [formTitle, setFormTitle] = useState(title);
  const [titleError, setTitleError] = useState("");
  const [formText, setFormText] = useState(text);
  const [textError, setTextError] = useState("");

  const tagSplitSet = (tags) => {
    if (typeof tags === "string") {
      let trimArr = [];
      tags.split(",").forEach((e) => {
        let trim = e.trim();
        trimArr.push(trim);
      });
      setFormTags(trimArr);
      return trimArr;
    }
    return tags;
  };

  const onOpenForm = () => {
    setFormImage(image);
    setFormTags(tags);
    setFormText(text);
    setFormTitle(title);
  };
  const onSaveEditForm = useCallback(async () => {
    const newTags = await tagSplitSet(formTags);
    const isFormImageError = validateText(formImage, setImageError);
    const isFormTagsError = validateText(formTags, setTagsError);
    const isFormTitleError = validateText(formTitle, setTitleError);
    const isFormTextError = validateText(formText, setTextError);

    let isErrors =
      isFormImageError ||
      isFormTagsError ||
      isFormTitleError ||
      isFormTextError;

    if (isErrors) {
      return console.log(isErrors);
    }
    await onEdit(postId, formText, newTags, formImage, formTitle);
    onClose();
    // eslint-disable-next-line
  }, [formImage, formTags, formTitle, formText]);

  const fields = useMemo(() => {
    if (isEditMode) {
      return {
        title: (
          <TextField
            label="Название"
            variant="outlined"
            value={formTitle}
            multiline
            onChange={({ target: { value } }) => setFormTitle(value)}
            error={formTitle === ""}
            helperText={titleError}
            className="cnEditInput"
          />
        ),
        image: (
          <TextField
            label="Ссылка на изображение"
            variant="outlined"
            value={formImage}
            multiline
            onChange={({ target: { value } }) => setFormImage(value)}
            error={formImage === ""}
            helperText={imageError}
            className="cnEditInput"
          />
        ),
        text: (
          <TextField
            label="Описание"
            variant="outlined"
            value={formText}
            multiline
            onChange={({ target: { value } }) => setFormText(value)}
            className="cnEditInput"
            error={formText === ""}
            helperText={textError}
          />
        ),
        tags: (
          <TextField
            label="Теги, через запятую"
            variant="outlined"
            value={formTags.join(", ")}
            multiline
            onChange={({ target: { value } }) => setFormTags(value)}
            error={formTags === ""}
            helperText={tagsError}
            className="cnEditInput"
          />
        ),
      };
    }
    return {
      title: <span className="cnUserBioNickname">{title}</span>,
      image: <span>{image}</span>,
      text: <span>{text}</span>,
      tags: <span>{tags}</span>,
    };
  }, [
    isEditMode,
    title,
    text,
    tags,
    image,
    formTitle,
    formText,
    formTags,
    formImage,
    titleError,
    textError,
    tagsError,
    imageError,
  ]);
  useEffect(() => {
    const body = document.querySelector("body");
    if (isOpen) {
      body.classList.add("cnBodyOverflow");
    } else {
      body.classList.remove("cnBodyOverflow");
    }
  }, [isOpen]);
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={onOpenForm}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="cnEditModal"
      overlayClassName="cnEditModalOverlay"
    >
      <div className="cnEditModalForm">
        <div>{fields.title}</div>
        <div>{fields.image}</div>
        <div>{fields.text}</div>
        <div>{fields.tags}</div>
        <Button onClick={onSaveEditForm}>Сохранить</Button>
      </div>
    </Modal>
  );
};
