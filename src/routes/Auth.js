import AuthForm from "components/AuthForm";
import {
  authService,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "myBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import style from "styles/Default.module.css";

function Auth(props) {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    try {
      if (name === "google") {
        provider = new GoogleAuthProvider();
      } else if (name === "github") {
        provider = new GithubAuthProvider();
      }
      // const data =
      await signInWithPopup(authService, provider);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={style.auth}>
      <div className={style.logo}>
        <FontAwesomeIcon icon={faTwitter} color={"#ffffff"} size="5x" />
        <h1>Switter</h1>
      </div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">
          Google
        </button>
        <button onClick={onSocialClick} name="github">
          Github
        </button>
      </div>
    </main>
  );
}

export default Auth;
