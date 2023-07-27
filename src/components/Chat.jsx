import { useContext } from "react";
import Camera from "../images/camera.svg";
import Add from "../images/add.svg";
import More from "../images/more.svg";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
    const { data } = useContext(ChatContext);
  
    return (
      <div className="chat">
        <div className="chatInfo">
          <span>{data.user?.displayName}</span>
          <div className="chatIcons">
            <img src={Camera} alt=""/>
            <img src={Add} alt=""/>
            <img src={More} alt=""/>
          </div>
        </div>
        <Messages />
        <Input/>
      </div>
    );
  };
  
  export default Chat;