import AuthForm from "components/AuthForm";
import {
  authService,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "myBase";

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
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">
          Google
        </button>
        <button onClick={onSocialClick} name="github">
          Github
        </button>
      </div>
    </div>
  );
}

export default Auth;
