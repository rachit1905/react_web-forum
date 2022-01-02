import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserPhoto, setUserInfo } from "../app/userSlice";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const avatar = useSelector(selectUserPhoto);
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(getTheme());
  function getTheme() {
    if (localStorage.getItem("theme")) return localStorage.getItem("theme");
    else return "dark";
  }

  const handleSignOut = () => {
    signOut(auth).catch((err) => console.log(err));

    dispatch(
      setUserInfo({
        name: "",
        userPhoto: "",
        userEmail: "",
        uid: "",
      })
    );

    localStorage.setItem(
      "userInfo",
      JSON.stringify({ name: "", userPhoto: "", userEmail: "", uid: "" })
    );
  };

  if (theme !== "null")
    document.body.classList.replace(document.body.classList, theme);

  useEffect(() => {
    if (localStorage.getItem("theme") === "light")
      document.getElementById("theme").src =
        "https://img.icons8.com/external-bearicons-glyph-bearicons/64/000000/external-moon-halloween-bearicons-glyph-bearicons.png";
    else document.getElementById("theme").src = "/icons8-sun.svg";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeTheme = () => {
    const body = document.body.classList;
    if (body.contains("light")) {
      body.replace("light", "dark");
      setTheme("dark");
    } else {
      body.replace("dark", "light");
      setTheme("light");
    }
  };

  return (
    <nav className="navbar">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          height: "100%",
        }}>
        <Link to="/">
          <h3>UniForum</h3>
        </Link>

        <Link to="/about">
          <h4>About</h4>
        </Link>
      </div>

      <div
        style={{
          width: "50%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}>
        <img src="" alt="Change Theme" id="theme" onClick={changeTheme} />
        <div
          style={{ height: "100%", width: "max-content" }}
          onClick={handleSignOut}>
          {auth.currentUser && (
            <img
              src={avatar}
              alt="Avatar"
              id="userPic"
              onClick={handleSignOut}
            />
          )}
          <title>Sign Out</title>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
