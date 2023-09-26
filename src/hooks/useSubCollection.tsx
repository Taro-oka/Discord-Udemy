import { useState, useEffect } from "react";
import {
  query,
  collection,
  onSnapshot,
  DocumentData,
  Query,
  orderBy,
  CollectionReference,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

interface Messages {
  message: string;
  timestamp: Timestamp;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

const useSubCollection = (
  channelName: string,
  channelId: string,
  subchannelName: string
) => {
  const [subdocuments, setSubDocuments] = useState<Messages[]>([]);
  const collectionRef: CollectionReference<DocumentData, DocumentData> =
    collection(db, channelName, channelId, subchannelName);
  // ここで時系列にソートする！！！
  const collectionRefOrderBy: Query<DocumentData, DocumentData> = query(
    collectionRef,
    orderBy("timestamp", "asc")
  );

  useEffect(() => {
    onSnapshot(collectionRefOrderBy, (querySnapshot) => {
      const results: Messages[] = [];
      querySnapshot.docs.forEach((doc) =>
        results.push({
          message: doc.data().message,
          timestamp: doc.data().timestamp,
          user: doc.data().user,
        })
      );
      setSubDocuments(results);
    });
  }, [channelId]);

  return { subdocuments };
};

export default useSubCollection;
