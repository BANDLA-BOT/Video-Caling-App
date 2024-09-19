/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import "./Styles/MeetingInfo.scss";
import { FaShieldAlt } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaCopy } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
const MeetingInfo = ({ setMeetInfoPopup, url }) => {
  return (
    <div className="meeting-info-block">
      <div className="meeting-header">
        <h3>Your meeting's Ready</h3>
        <FaTimes
          className="icon"
          onClick={() => {
            setMeetInfoPopup(false);
          }}
        />
      </div>
      <button className="add-people-btn">
        <IoPersonAddSharp className="icon" />
        Add Others
      </button>
      <p className="info-text">
        Or share this meeting link to others you want in the meeting
      </p>
      <div className="meet-link">
        <span>{url}</span>
        <FaCopy
          className="icon"
          onClick={() => navigator.clipboard.writeText(url)}
        />
      </div>
      <div className="permission-text">
        <FaShieldAlt className="icon" />
        <p className="small-text">
          People who use this meeting link must get your permission before they
          can join
        </p>
      </div>
      <p className="small-text">joined as</p>
    </div>
  );
};

export default MeetingInfo;
