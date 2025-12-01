import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import socket from "../../utils/socket";
import axios from "axios";
import { BASE_URL } from "../../utils/baseURL";

const ChatSection = () => {

  const { roomId } = useParams();
  const location = useLocation();
  const { currentUser } = location.state;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(()=>{

    const fetchMessages = async ()=>{
      const response = await axios.get(`${BASE_URL}/message/get-message`, {
        params : { roomId } ,
        withCredentials : true
      });
      setMessages(response?.data);
    }
    fetchMessages();

    socket.emit("joinRoom", { roomId });

    socket.on("receiveMessage" , (data)=>{
      setMessages((prev) => [...prev, data]);
    });

    return ()=> {
      socket.off("receiveMessage");
    }
  }, [roomId]);

  const sendMessage = async () => {
    if (message.trim() !== "") {
      const response = await axios.post(`${BASE_URL}/message/new-message`, {roomId , message}, { withCredentials : true });
      socket.emit("sendMessage", { 
        _id : response?.data?._id , 
        roomId : response?.data?.roomId , 
        message : response?.data?.message , 
        senderId : response?.data?.senderId , 
        createdAt : response?.data?.createdAt 
      });
      setMessage("");
    }
  };

  return (
    <>
      <section className="flex flex-col items-center px-10">

        <section className="w-sm text-xs md:text-[15px] md:w-3xl p-3 pb-16 flex flex-col gap-y-2 ">
          { messages.map((eachMessage)=>{
            return (
              <div className={`flex px-3 py-2 rounded-md max-w-xs md:max-w-md ${ currentUser === eachMessage.senderId ? "self-end bg-blue-200" : "self-start bg-gray-200" }` } key={eachMessage._id}>
                <p className="break-words flex gap-x-2">{eachMessage.message}
                  <span className="text-[10px] flex items-end">{new Date(eachMessage.createdAt).toLocaleTimeString('en-US' , { hour : '2-digit' , minute : '2-digit' })}</span>
                </p>
              </div>
            )
          })}
        </section>

        <section className="fixed w-sm bottom-0 flex gap-x-5 md:w-3xl bg-white py-2">
          <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message....." type="text" className="flex-1 p-1 pl-3 rounded-md border-[2px] outline-none"/>
          <button className="px-3 py-3 bg-[rgba(12,152,138,1)] text-white rounded-full hover:bg-[rgba(11,140,127,0.8)]" style={{ fontFamily : "Rowdies" }} onClick={()=>sendMessage()}><FaPaperPlane/></button>
        </section>

      </section>
    </>
  )
}

export default ChatSection;