/* eslint-disable react/prop-types */

import { useState } from "react";
import "./Styles/Messenger.scss";
import { FaCommentAlt } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { formatDate } from '../utils/Helper'

const Messenger = ({ setIsMessenger, sendMsg, messageList }) => {
  const [msg, setMsg] = useState("");

  const handleChangeMsg = (e) => {
    setMsg(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMsg(msg);
      setMsg("");
    }
  };

  const handleSendMsg = (e) => {
    sendMsg(msg);
    setMsg("");
  };

  return (
    <div className="messenger-container">
      <div className="messenger-header">
        <h3>Meeting details</h3>
        <FaTimes
          className="icon"
          onClick={() => {
            setIsMessenger(false);
          }}
        />
      </div>

      <div className="messenger-header-tabs">
        <div className="tab">
          <FaUserFriends className="icon" />
          <p>People (1)</p>
        </div>
        <div className="tab active">
          <FaCommentAlt className="icon" />
          <p>Chat</p>
        </div>
      </div>

      <div className="chat-section">
        {messageList.map((item) => (
          <div key={item.time} className="chat-block">
            <div className="sender">
              {item.user} <small>{formatDate(item.time)}</small>
            </div>
            <p className="msg">{item.msg}</p>
          </div>
        ))}
      </div>

      <div className="send-msg-section">
        <input
          placeholder="Send a message to everyone"
          value={msg}
          onChange={(e) => handleChangeMsg(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <FaPaperPlane
          className="icon"
          onClick={handleSendMsg}
        />
      </div>
    </div>
  );
};

export default Messenger;