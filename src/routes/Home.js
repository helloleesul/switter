import { useEffect, useState } from "react";
import {
  collection,
  dbService,
  onSnapshot,
  orderBy,
  query,
  onAuthStateChanged,
  authService,
} from "myBase";
import Sweet from "components/Sweet";
import SweetForm from "components/SweetForm";
import Header from "components/Header";

function Home({ userObj }) {
  const [sweetList, setSweetList] = useState([]);
  // console.log(userObj);

  useEffect(() => {
    // getSweetList();
    const sorted = query(
      collection(dbService, "sweets"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(sorted, (snapshot) => {
      // console.log(snapshot);
      const getDocuments = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setSweetList(getDocuments);
    });
    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        unsubscribe();
      }
    });
  }, []);

  return (
    <article className="wrap">
      <Header title={"홈"} />
      <section>
        <SweetForm userObj={userObj} />
        <div>
          {sweetList.map((sweet) => (
            <Sweet
              key={sweet.id}
              sweetObj={sweet}
              isOwner={sweet.creatorId === userObj.uid}
            />
          ))}
        </div>
      </section>
    </article>
  );
}

export default Home;
