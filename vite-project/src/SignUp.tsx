import { Button, TextField, Select, MenuItem } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import allStyles from "./Styles-module.tsx";
import GetUser from "./Profile.tsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PrimarySearchAppBar } from "./Header/Header.tsx";

const SignUp = ({ whatForm, setWhatForm }: Props) => {
  {
    console.log(window.location);
  }

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location);
  }, [location]);

  type FormValues = {
    username: string;
    subname: string;
    role: string;
    login: string;
    password: string;
    rang: number;
  };

  const { register, handleSubmit } = useForm<FormValues>();
  const [showMessage, setShowMessage] = useState<Boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    try {
      let response = await fetch("http://localhost/Auth/registration.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let responseText = await response.text();
      console.log(responseText);
      responseText === "oke" ? setShowMessage(true) : setShowMessage(false);
    } catch (error) {
      console.error("Error:", error);
      setShowMessage(true);
      setWhatForm({
        loginShow: true,
      });
      navigate("/login", { replace: false });
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
          placeholder="Введите фамилию"
          style={allStyles.listStylus}
          {...register("subname")}
        />{" "}
        <br />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{
            width: "100%",
          }}
          {...register("role")}
          value={1}
        >
          <MenuItem value={1}>Администратор</MenuItem>
          <MenuItem value={2}>Бригадир</MenuItem>
          <MenuItem value={3}>Рабочий</MenuItem>
        </Select>{" "}
        <br />
        <TextField
          id="outlined-basic"
          variant="standard"
          placeholder="Логин"
          style={allStyles.listStylus}
          {...register("login")}
        />{" "}
        <br />
        <TextField
          id="outlined-basic"
          variant="standard"
          type="password"
          placeholder="Пароль"
          style={allStyles.listStylus}
          {...register("password")}
        />{" "}
        <br />
        <TextField
          inputProps={{ type: "number" }}
          placeholder="Ранг"
          {...register("rang")}
        />{" "}
        <br />
        <br />
        <Button variant="contained" type="submit" style={allStyles.buttonStyle}>
          Регистрация
        </Button>
      </form>

      {showMessage ? <span>Регистрация прошла успешно!</span> : ""}
      <GetUser />
    </>
  );
};

export default SignUp;
