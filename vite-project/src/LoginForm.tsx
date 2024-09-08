import React, { useEffect } from "react";

import { Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import allStyles from "./styles-module";
import { Link } from "react-router-dom";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PrimarySearchAppBar } from "./Header/Header.tsx";

const LoginForm = ({ whatForm, setWhatForm, setIsLogin, isLogin }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location);
  }, [location]);

  {
    console.log(window.location);
  }
  type FormValues = {
    username: string;
    password: string;
  };

  const { register, handleSubmit } = useForm<FormValues>();
  const [showMessage, setShowMessage] = useState<Boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    try {
      let response = await fetch("http://localhost/Auth/login.php", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let responseText = await response.text();
      responseText === "oke" ? setShowMessage(true) : setShowMessage(false);
    } catch (error) {
      console.error("Error:", error);
      setShowMessage(true);
      setIsLogin({ logined: true });
      navigate("/profile", { replace: false });
    }
  };

  return (
    <>
      <PrimarySearchAppBar messageCount={11} notificationCount={1} />

      <Link
        to={whatForm.loginShow ? "/SignUp" : "/login"}
        onClick={() => {
          setWhatForm({
            loginShow: !whatForm.loginShow,
          });
        }}
      >
        {whatForm.loginShow ? "Перейти к регистрации" : "Перейти к авторизации"}
      </Link>

      <form
        method="post"
        action="registation.php"
        id="sended"
        style={{
          width: "200px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          id="outlined-basic"
          variant="standard"
          placeholder="Введите имя"
          style={allStyles.listStylus}
          {...register("username")}
        />{" "}
        <TextField
          id="outlined-basic"
          variant="standard"
          type="password"
          placeholder="Пароль"
          style={allStyles.listStylus}
          {...register("password")}
        />{" "}
        <br />
        <Button variant="contained" type="submit" style={allStyles.buttonStyle}>
          Авторизация
        </Button>
      </form>

      {showMessage ? <span>Авторизация прошла успешно!</span> : ""}
    </>
  );
};

export default LoginForm;
