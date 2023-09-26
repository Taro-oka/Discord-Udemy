import React from "react";
import { useEffect } from "react";
import "./App.scss";
import Sidebar from "./components/sidebar/Sidebar";
import Chat from "./components/chat/Chat";
import Login from "./components/login/Login";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { auth } from "./firebase";
import { login, logout } from "./features/userSlice";
import { ErrorBoundary } from "react-error-boundary";
import { fallbackRender } from "./utils/ErrorFallBack";

function App() {
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      // console.log(loginUser);
      if (loginUser) {
        // dispatchの中で、Reducer内の関数を呼ぶ！！！！！
        // なお、Reducer内でtype別に関数の内容を指定する場合は、dispatchからはオブジェクトを渡すのみ！！
        dispatch(
          login({
            uid: loginUser.uid,
            photo: loginUser.photoURL,
            email: loginUser.email,
            displayName: loginUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      {user ? (
        <>
          <ErrorBoundary FallbackComponent={fallbackRender}>
            <Sidebar />
          </ErrorBoundary>
          <Chat />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default App;
