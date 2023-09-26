import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import { SidebarChannel } from "./SidebarChannel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import MicIcon from "@mui/icons-material/Mic";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SettingsIcon from "@mui/icons-material/Settings";
import { auth, db } from "../../firebase";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useCollection from "../../hooks/useCollection";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { setChannelInfo } from "../../features/channelSlice";

const Sidebar = () => {
  const user = useAppSelector((state) => state.user.user);
  // 分割代入して、かつ、それを「channels」という変数名に入れる！登録されているチャンネルをFirebaseから取ってくる。
  const { documents: channels } = useCollection("channels");

  const [renderCount, setRenderCount] = useState(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setRenderCount((prev) => prev + 1);
    // console.log(renderCount);
    // 初回のレンダリングでは、チャット画面を表示しないための策。かなり乱暴ではある。 
    if (renderCount < 3) {
      return;
    }

    // channelsが変更されたときに実行される
    // console.log(channels);
    if (!channels.length) {
      dispatch(
        setChannelInfo({
          channelId: null,
          channelName: null,
        })
      );
    } else {
      dispatch(
        setChannelInfo({
          channelId: channels[0].id,
          channelName: channels[0].channel.channelName,
        })
      );
    }
  }, [channels]);

  // プラスボタンを押した時にチャンネルを追加する関数
  // これでデータベースに変更を加えるだけで、useEffectの中で指定したonSnapshotが、useEffectの第２引数から「独立して」発火して、変化が画面に反映される！！！！！！！！！！
  const addChannel = async () => {
    let channelName: string | null = prompt("新しいチャンネルを作成します");
    if (channelName) {
      await addDoc(collection(db, "channels"), {
        channelName: channelName,
        channelTimestamp: serverTimestamp(),
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebarLeft">
        <div className="serverIcon">
          <img src="./discordIcon.png" alt="" />
        </div>
        <div className="serverIcon">
          <img src="./logo192.png" alt="" />
        </div>
      </div>
      <div className="sidebarRight">
        <div className="sidebarTop">
          <h3>Discord</h3>
          <ExpandMoreIcon />
        </div>
        <div className="sidebarChannels">
          <div className="sidebarChannelsHeader">
            <div className="sidebarHeader">
              <ExpandMoreIcon />
              <h4>プログラミングチャンネル</h4>
            </div>
            <AddIcon className="sidebarAddIcon" onClick={() => addChannel()} />
          </div>

          {/* ここで、登録されているチャンネルの配列を最初から書き出し */}
          <div className="sidebarChannelsList">
            {channels.map((channel) => {
              return (
                <SidebarChannel
                  channel={channel}
                  id={channel.id}
                  key={channel.id}
                />
              );
            })}
          </div>

          <div className="sidebarFooter">
            <div className="sidebarAccount">
              <img src={user?.photo} alt="" onClick={() => auth.signOut()} />
              <div className="accountName">
                <h4>{user?.displayName}</h4>
                <span>#{user?.uid.substring(0, 4)}</span>
              </div>
            </div>
            <div className="sidebarVoice">
              <MicIcon />
              <HeadphonesIcon />
              <SettingsIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
