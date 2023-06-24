import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  dbService,
  storageService,
  ref,
  uploadString,
  getDownloadURL,
} from "myBase";

function SweetForm({ userObj }) {
  const fileInput = useRef();
  const [sweet, setSweet] = useState("");
  const [attachment, setAttachment] = useState("");

  // Sweet 올리기
  const onSubmit = async (event) => {
    event.preventDefault();

    // 이미지 주소 기본 빈 값
    let attachmentUrl = "";
    // 만약 이미지가 있다면 url값을, 없다면 기본 빈 값을 넣어준다.
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(response.ref);
    }
    const sweetData = {
      text: sweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      userName: userObj.displayName ? userObj.displayName : userObj.email,
      attachmentUrl,
    };

    try {
      await addDoc(collection(dbService, "sweets"), sweetData);
      setSweet("");
      onClearAttachment();
    } catch (err) {
      console.log(err);
    }
  };
  // Sweet 작성
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSweet(value);
  };
  // 이미지 파일 선택
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const file = files[0];
    const reader = new FileReader();

    const maxSize = 5 * 1024 * 1024;
    const fileSize = file.size;

    if (fileSize > maxSize) {
      alert("첨부파일 사이즈는 5MB 이내로 등록 가능합니다.");
      onClearAttachment();
      return false;
    }

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(file);
  };
  // 이미지 파일 제거
  const onClearAttachment = () => {
    setAttachment("");
    fileInput.current.value = "";
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onChange}
        value={sweet}
        type="text"
        placeholder="무슨일이 일어나고 있나요?"
        maxLength={120}
      />
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInput}
      />
      <input type="submit" value="Sweet" />
      {attachment && (
        <div>
          <img src={attachment} width={50} height={50} alt="" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
}

export default SweetForm;
