import {
  authService,
  signOut,
  query,
  collection,
  dbService,
  where,
  getDocs,
  orderBy,
  updateProfile,
} from "myBase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile({ refreshUser, userObj }) {
  const history = useNavigate();
  const [newUserName, setNewUserName] = useState(
    userObj.displayName ? userObj.displayName : ""
  );

  useEffect(() => {
    getMySweets();
  });
  const getMySweets = async () => {
    const finded = query(
      collection(dbService, "sweets"),
      orderBy("createdAt"),
      where("creatorId", "==", userObj.uid)
    );
    const mySweets = await getDocs(finded);

    mySweets.forEach((doc) => {
      // console.log(doc.id, "=>", doc.data());
    });
  };

  const onLogOutClick = () => {
    signOut(authService);
    history("/");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewUserName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newUserName) {
      await updateProfile(userObj, { displayName: newUserName });
    }
    refreshUser();
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={newUserName}
          type="text"
          placeholder="user name"
        />
        <input type="submit" value="update profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}

export default Profile;
