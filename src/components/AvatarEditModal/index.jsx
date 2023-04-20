import Modal from "react-modal";
import React, { useCallback } from "react";
import { TextField, ThemeProvider } from "@mui/material";
import "./styles.css";
import { useState } from "react";
import Button from "../Button";
import { theme } from "../../theme";

export const AvatarEditModal = ({ isOpen, onClose, onEditAvatar }) => {
  const [avatar, setAvatar] = useState("");

  const onSaveEditAvatar = useCallback(async () => {
    await onEditAvatar({
      avatar: avatar,
    });
    onClose();
    // eslint-disable-next-line
  }, [avatar]);

  return (
    <ThemeProvider theme={theme}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        ariaHideApp={false}
        className="cnAuthModal"
        overlayClassName="cnAuthModalOverlay"
      >
        <TextField
          id="outlined-basic"
          label="Link"
          variant="outlined"
          placeholder="ссылка на изображение"
          type="url"
          onChange={(event) => setAvatar(event.target.value)}
          error={avatar === ""}
          helperText={avatar === "" ? "Обязательное поле" : " "}
        />
        <Button variant="contained" onClick={() => onSaveEditAvatar()}>
          Отправить
        </Button>
      </Modal>
    </ThemeProvider>
  );
};
