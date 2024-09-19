/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import './Styles/CallPageHeader.scss'
import { formatDate } from "../utils/Helper";
import { FaUser } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";

const CallPageHeader = ({
  isMessenger,
  setIsMessenger,
  messageAlert,
  setMessageAlert,
}) => {
  let interval = null;
  const [currentTime, setCurrentTime] = useState(() => {
    return formatDate();
  });

  useEffect(() => {
    interval = setInterval(() => setCurrentTime(formatDate()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="frame-header">
      <div className="header-items icon-block">
        <FaUserFriends className="icon"  />
      </div>
      <div
        className="header-items icon-block"
        onClick={() => {
          setIsMessenger(true);
          setMessageAlert({});
        }}
      >
        <FaCommentAlt className="icon"  />
        {!isMessenger && messageAlert.alert && (
          <span className="alert-circle-icon"></span>
        )}
      </div>
      <div className="header-items date-block">{currentTime}</div>
      <div className="header-items icon-block">
        <FaUser className="icon profile" />
      </div>
    </div>
  );
};

export default CallPageHeader;
