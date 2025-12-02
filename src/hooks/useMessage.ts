import { useContext } from "react";
import { MessageContext } from "./message-context";

const useMessage = () => useContext(MessageContext);

export default useMessage;
