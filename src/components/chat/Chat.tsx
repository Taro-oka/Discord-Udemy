import { useState, useRef } from "react";
import "./Chat.scss";
import { ChatHeader } from "./ChatHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ChatMessage from "./ChatMessage";
import { useAppSelector } from "../../app/hooks";
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import useSubCollection from "../../hooks/useSubCollection";

const Chat = () => {
  const [inputText, setInputText] = useState<string>("");
  const channelName = useAppSelector((state) => state.channel.channelName);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const user = useAppSelector((state) => state.user.user);
  const chatMessageRef = useRef<HTMLDivElement | null>(null);

  const { subdocuments: messages } = useSubCollection(
    "channels",
    String(channelId),
    "messages"
  );

  const sendMessage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!inputText) {
      return;
    } else if (!channelId) {
      return;
    }

    // channelコレクションの中のmessageコレクションの中に、メッセージ情報を入れる
    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      "channels",
      // ここ注意！！！stiring型に変換しないと怒られる！！！！！！！！
      // No overload matches this callというエラーが出たら、型が合っているか確かめる！！！
      String(channelId),
      "messages"
    );

    await addDoc(collectionRef, {
      message: inputText,
      timestamp: serverTimestamp(),
      user: user,
    });

    setInputText("");
    if (chatMessageRef.current) {
      chatMessageRef.current.scrollTop = chatMessageRef.current.scrollHeight;
    }
  };

  return (
    <div className="chat">
      {/* チャットヘッダー */}
      <ChatHeader channelName={channelName} />

      {/* メッセージ */}
      <div className="chatMessage" ref={chatMessageRef}>
        {messages.map((message, index) => {
          return (
            <ChatMessage
              key={index}
              message={message.message}
              timestamp={message.timestamp}
              user={message.user}
            />
          );
        })}
      </div>

      {/* 送信セクション */}
      <div className="chatInput">
        <AddCircleOutlineIcon />
        <form>
          <input
            type="text"
            value={inputText}
            placeholder="#Udemyへ
            メッセージを送信"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputText(e.target.value);
            }}
          />
          <button
            type="submit"
            className="chatInputButton"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              sendMessage(e)
            }
          >
            送信
          </button>
        </form>
        <div className="chatInputIcons">
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  );
};

export default Chat;
