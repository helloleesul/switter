import {
  doc,
  deleteDoc,
  updateDoc,
  dbService,
  storageService,
  deleteObject,
  ref,
} from "myBase";
import { useState } from "react";

function Sweet({ sweetObj, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(sweetObj.text);
  const sweetTextRef = doc(dbService, "sweets", `${sweetObj.id}`);

  const onDeleteClick = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (ok) {
      try {
        const attachmentUrlRef = ref(storageService, sweetObj.attachmentUrl);
        await deleteDoc(sweetTextRef);
        if (sweetObj.attachmentUrl !== "") {
          await deleteObject(attachmentUrlRef);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const onUpdateClick = async (event) => {
    event.preventDefault();
    await updateDoc(sweetTextRef, {
      text: newText,
    });
    setEditing(false);
  };
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };
  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setNewText(value);
  };
  return (
    <div>
      {editing ? (
        <form onSubmit={onUpdateClick}>
          <input
            onChange={onChange}
            value={newText}
            type="text"
            required
            placeholder="Edit Sweet"
          />
          <input type="submit" value="Update" />
        </form>
      ) : (
        <>
          <h4>{sweetObj.text}</h4>
          {sweetObj.attachmentUrl && (
            <img src={sweetObj.attachmentUrl} alt="" width={50} height={50} />
          )}
        </>
      )}
      <span>{new Date(sweetObj.createdAt).toLocaleString("en-GB")}</span>
      <p>
        {String(sweetObj.userName).includes("@")
          ? sweetObj.userName.split("@")[0]
          : sweetObj.userName}
      </p>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete</button>
          <button onClick={toggleEditing}>{editing ? "Cancel" : "Edit"}</button>
        </>
      )}
    </div>
  );
}

export default Sweet;
