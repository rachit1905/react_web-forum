import React, { useEffect } from "react";
import {
  signInWithRedirect,
  getRedirectResult,
  /*signInWithPopup,*/
  onAuthStateChanged,
  // updateProfile,
} from "firebase/auth";
import { auth, firestore, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserInfo,
  selectUserPhoto,
  selectUserName,
  selectUserEmail,
  // selectUid,
} from "../app/userSlice";
import {
  collection,
  query,
  orderBy,
  // doc,
  // where,
  // getDoc,
  /*getDocs,*/
  serverTimestamp,
  addDoc,
  limitToLast,
} from "firebase/firestore";
import {
  useCollectionData,
  /*useDocumentData,*/
} from "react-firebase-hooks/firestore";
import InputSection from "./InputSection";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "./Navbar";
import Eachchat from "./EachChat";

const Chat = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const userEmail = useSelector(selectUserEmail);
  // const uid = useSelector(selectUid);

  // const [userSnap] = useDocumentData(
  //   doc(query(collection(firestore, "users"), where("uid", "==", uid)))
  // );
  // let [userSnap] = [{ userName: "", userPhoto: "", uid: "" }];
  // useEffect(() => {
  //   userSnap = getDocs(
  //     query(collection(firestore, "users"), where("uid", "==", uid))
  //   );
  // }, [uid]);

  // useEffect(() => {
  //   dispatch(
  //     setUserInfo({
  //       name: userSnap[0].name,
  //       userPhoto: userSnap[0].userPhoto,
  //       uid: userSnap[0].uid,
  //     })
  //   );
  // }, [userSnap]);

  const [user, loading] = useAuthState(auth);

  onAuthStateChanged(auth, (user) => {
    if (!user) return;

    const userInfo = {
      name: user.displayName,
      // userPhoto: userSnap.userPhoto,
      userPhoto:
        "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=" +
        user.uid.slice(0, 7),
      // auth.currentUser.photoURL,
      // "https://avatars.dicebear.com/api/micah/6vd3.svg?mood[]=happy&background=transparent",
      userEmail: user.email,
      // uid: user.uid.slice(0, 4),
    };
    dispatch(setUserInfo(userInfo));
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  });

  const writeChat = () => {
    if (document.getElementById("chatInput").value === "") {
      document.getElementById("inputButton").blur();
      return;
    }
    addDoc(collection(firestore, "chats"), {
      name: userName,
      chat: document.getElementById("chatInput").value,
      time: serverTimestamp(),
      senderEmail: userEmail,
      senderAvatar: userPhoto,
    })
      .then(() => {
        document.getElementById("chatInput").value = "";
        // alert("Success"); //for development
      })
      .catch((err) => {
        document.getElementById("chatInput").value = "";
        alert(err.message);
      });
  };

  const chatReference = query(
    collection(firestore, "chats"),
    orderBy("time"),
    limitToLast(200)
  );
  const [chats] = useCollectionData(chatReference, {
    idField: "id",
  });

  const handleSignIn = () => {
    // const addUserDataToFirestore = (uid, userName) => {
    //   // const docQuery = getDoc(
    //   //   doc(query(collection(firestore, "users"), where("uid", "==", uid)))
    //   // );
    //   // if (docQuery != null) return; //it was !docQuery
    //   addDoc(collection(firestore, "users"), {
    //     uid: uid,
    //     userPhoto:
    //       "https://avatars.dicebear.com/api/bottts/" +
    //       uid.slice(0, 7) +
    //       ".svg?mood[]=happy&background=transparent",
    //     userName: userName,
    //   })
    //     .then(console.log("Success"))
    //     .catch((error) => alert(error));
    // };

    // if (
    //   navigator.userAgent.indexOf("Android" || "iPhone" || "iPad" || "iPod") >
    //   -1
    // ) {
    signInWithRedirect(auth, provider)
      .then(() => {
        getRedirectResult(auth)
          .then((result) => {
            // updateProfile(auth.currentUser, {
            //   displayName: "Rachit",
            //   photoURL:
            //     "https://avatars.dicebear.com/api/bottts/" +
            //     uid.slice(0, 4) +
            //     ".svg?mood[]=happy&background=transparent",
            // })
            //   .then(console.log("Success"))
            //   .catch((error) => console.log(error));

            dispatch(
              setUserInfo({
                name: result.user.displayName,
                userPhoto: result.user.photoURL,
                userEmail: result.user.email,
                uid: result.user.uid,
              })
            );
            // addUserDataToFirestore(result.user.uid, result.user.displayName);

            // userSnap = useDocumentData(
            //   doc(
            //     firestore,
            //     "users", result.user.uid
            //   )
            // );
            // while (!userSnap) console.warn("no");
            // if (userSnap) alert(userSnap);
          })
          .catch((err) => alert(err));
      })
      .catch((err) => alert(err));
    // } else {
    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     addUserDataToFirestore(result.user.uid, result.user.displayName);
    //     // const [userSnap] = useDocumentData(
    //     //   doc(firestore, "users", result.user.uid)
    //     // );
    //     while (!userSnap) {console.warn("no")}
    //     if (userSnap) {
    //       alert(userSnap);
    //     }
    //     dispatch(
    //       setUserInfo({
    //         name: userSnap.userName,
    //         userPhoto: userSnap.userPhoto,
    //         userEmail: result.user.email,
    //         uid: userSnap.uid,
    //       })
    //     );
    //   })
    //   .catch((err) => console.log(err));
  };

  useEffect(() => {
    const ref = document.getElementById("autoscroll");
    if (!ref) return;
    ref.scrollIntoView({
      behavior: "smooth",
    });
  }, [chats]);

  return !user ? (
    <div id="Background">
      {loading ? (
        <>
          <header>
            <Navbar />
          </header>
          <div id="loading" style={{ height: "calc(100vh - 3.3rem)" }}>
            <div id="loading1"></div>
            <div id="loading2"></div>
            <div id="loading3"></div>
          </div>
        </>
      ) : (
        <>
          <header>
            <Navbar />
          </header>
          <div id="loginArea">
            Sign in to Continue
            <button className="Login" onClick={handleSignIn}>
              <img src="/icons8-google.svg" alt="Google" />
            </button>
          </div>
        </>
      )}
    </div>
  ) : (
    <div id="Background">
      <header>
        <Navbar />
      </header>

      <div id="chatArea">
        <div
          style={{
            height: "100%",
          }}>
          {!chats ? (
            <div id="loading">
              <div id="loading1"></div>
              <div id="loading2"></div>
              <div id="loading3"></div>
            </div>
          ) : (
            chats.map((chat) => (
              <Eachchat
                key={chat.id}
                chat={chat}
                userEmail={userEmail}
                userPhoto={userPhoto}
              />
            ))
          )}
          <span id="autoscroll"></span>
        </div>
      </div>

      <footer>
        <InputSection writeChat={writeChat} />
      </footer>
    </div>
  );
};

export default Chat;
