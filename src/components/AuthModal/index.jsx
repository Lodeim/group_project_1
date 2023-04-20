import Modal from "react-modal";
import React from "react";
import { useForm } from "react-hook-form";
import { TextField, ThemeProvider } from "@mui/material";
import "./styles.css";
import { useState } from "react";
import { authUser } from "../../api/users";
import Button from "../Button";
import { theme } from "../../theme";

export const AuthModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleUserUpdate(data) {
    await authUser(data);
    window.location.reload();
  }
  const onSubmit = (data) => handleUserUpdate(data);

  return (
    <ThemeProvider theme={theme}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        ariaHideApp={false}
        className="cnAuthModal"
        overlayClassName="cnAuthModalOverlay"
      >
        <form className="cnAuthModalForm" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            placeholder="почта"
            type="email"
            {...register("email", { required: true })}
            onChange={(event) => setEmail(event.target.value)}
            error={email === ""}
            helperText={email === "" ? "Обязательное поле" : " "}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            placeholder="пароль"
            type="password"
            {...register("password", { required: true })}
            onChange={(event) => setPassword(event.target.value)}
            error={password === ""}
            helperText={password === "" ? "Обязательное поле" : " "}
          />
          <Button type="submit" variant="contained">
            Войти
          </Button>
        </form>
      </Modal>
    </ThemeProvider>
  );
};
