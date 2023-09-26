import { Timestamp } from "firebase/firestore";

export interface InitialUserState {
  user: null | {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

export interface InitialChannelState {
  channelId: string | null;
  channelName: string | null;
  channelTimestamp: Timestamp | null;
}
