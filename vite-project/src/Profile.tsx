import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PrimarySearchAppBar } from "./Header/Header";
import React from "react";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;


interface ComponentsProps {
  isLogin: {logined: boolean};
  setIsLogin: Dispatcher<boolean>,
}
const Profile : React.FC<ComponentsProps> = ({ isLogin, setIsLogin }) => {
    interface User {
        login: string;
    }

    type UserInfo = User[];
    const [userInformation, setUserInformation] = useState<UserInfo>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    isLogin.logined
        ? useEffect(() => {
            try {
                fetch("http://localhost/Auth/get_user.php?username=Test2", {
                    method: "GET",
                })
                    .then((respo) => respo.json())
                    .then((respo) => setUserInformation(respo))
                    .then(() => setLoaded(true));
            } catch (error) {
                console.log(error);
            }

            fetch("https://jsonplaceholder.typicode.com/todos/1")
                .then((response) => response.json())
                .then((json) => console.log(json));
        }, [])
        : "";

    return (
        <>
            {isLogin.logined ? (
                <div>
                    <PrimarySearchAppBar messageCount={11} notificationCount={1}/>
        
                        <div>
                            <span>Авторизация прошла успешно</span>
                        </div>

                </div>
            ) : (
                "404"
            )}
        </>
    );
}

export default Profile;
