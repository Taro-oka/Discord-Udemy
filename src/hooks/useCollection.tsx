import { useState, useEffect } from "react";
import {
  query,
  collection,
  onSnapshot,
  DocumentData,
  Query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

interface Channels {
  id: string;
  channel: DocumentData;
}

const useCollection = (data: string) => {
  const [documents, setDocuments] = useState<Channels[]>([]);

  // ここはFirebaseのサイトから引っ張ってくる
  // データベースのどこから持ってくるかを指定する
  //  型指定は、ホバーしたら分かる！！
  const collectionRef: Query<DocumentData> = collection(db, data);
  // ここで時系列にソートする！！！
  const collectionRefOrderBy: Query<DocumentData> = query(
    collectionRef,
    orderBy("channelTimestamp", "desc")
  );

  useEffect(() => {
    // Firebaseの関数である。
    // collenctionRefに変化があった場合に、それを検知してくれる！！
    // しかも、これはuseEffectの第２引数の空配列とは独立して動く！！！これめちゃ重要。
    onSnapshot(collectionRefOrderBy, (querySnapshot) => {
      const channelsResult: Channels[] = [];
      querySnapshot.docs.forEach((doc) =>
        channelsResult.push({
          id: doc.id,
          channel: doc.data(),
        })
      );
      setDocuments(channelsResult);
    });
  }, []);

  return { documents };
};

export default useCollection;
