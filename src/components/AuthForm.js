import {
  authService,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "myBase";
import { useState } from "react";

function AuthForm({ style }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    // console.log(event.target.name);
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // let data;
      if (newAccount) {
        // Create Account
        // data =
        await createUserWithEmailAndPassword(authService, email, password);
      } else {
        // Sign In
        // data =
        await signInWithEmailAndPassword(authService, email, password);
      }
      // console.log(data);
    } catch (error) {
      const errorCode = error.code;
      let alert;
      if (errorCode === "auth/weak-password") {
        alert = "비밀번호가 충분히 강력하지 않습니다.";
      } else if (errorCode === "auth/operation-not-allowed") {
        alert = "활성화되지 않은 이메일/비밀번호 계정입니다.";
      } else if (errorCode === "auth/invalid-email") {
        alert = "이메일 주소가 유효하지 않습니다.";
      } else if (errorCode === "auth/email-already-in-use") {
        alert = "이미 존재하는 이메일 주소 계정입니다.";
      }
      setError(alert);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div className={style.form}>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "가입하기" : "로그인"} />
      </form>
      <span>{error}</span>
      <button onClick={toggleAccount} className={style.toggleBtn}>
        {newAccount ? "계정이 있으신가요?" : "처음이신가요?"}
      </button>
    </div>
  );
}

export default AuthForm;
