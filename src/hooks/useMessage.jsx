import { message } from "antd";

import { useContext, createContext } from "react";
const MessageContext = createContext(null);
export const MessageProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};
const useMessage = () => useContext(MessageContext);

export default useMessage;
