import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./store";
import { RootState } from "./store";

// 型がないと、useDispatchも、useSelectorも使えないので、こうやってオリジナルなuseDispatch,useStateを定義してあげる！！！！
// ※※ 公式ドキュメントに従うのみ！！！
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
