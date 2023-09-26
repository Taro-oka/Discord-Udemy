import { Timestamp } from "firebase/firestore";
import "./ChatMessage.scss";
import { Avatar } from "@mui/material";

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

const Message = (props: Messages) => {
  const { message, timestamp, user } = props;
  return (
    <div className="message">
      {/* アバターはここで設定する！！！！！ */}
      <Avatar src={user?.photo} />
      <div className="messageInfo">
        <h4>
          {user?.displayName}
          <span className="messageTimeStamp">
            {timestamp?.toDate().toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
