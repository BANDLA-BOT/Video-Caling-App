/* eslint-disable react/prop-types */


import { FaPhone } from "react-icons/fa";
import { SlScreenDesktop } from "react-icons/sl";
import { FaVideo } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";
import { FaClosedCaptioning } from "react-icons/fa6";
import { HiMiniMicrophone } from "react-icons/hi2";
import { IoIosArrowUp } from "react-icons/io";
import './Styles/CallPageFooter.scss'

const CallPageFooter = ({
  isPresenting,
  stopScreenShare,
  screenShare,
  isAudio,
  toggleAudio,
  disconnectCall,
}) => {
  return (
    <div className="footer-item">
      <div className="left-item">
        <div className="icon-block">
          Meeting details
          <IoIosArrowUp className="icon" />
        </div>
      </div>
      <div className="center-item">
        <div
          className={`icon-block ${!isAudio ? "red-bg" : null}`}
          onClick={() => toggleAudio(!isAudio)}
        >
          {isAudio ? (
            <HiMiniMicrophone className="icon" />
          ) : (
            <FaMicrophoneSlash className="icon" />
          )}
        </div>
        <div className="icon-block" onClick={disconnectCall}>
          <FaPhone className="icon red"/>
        </div>
        <div className="icon-block">
          <FaVideo className="icon"/>
        </div>
      </div>
      <div className="right-item">
        <div className="icon-block">
          <FaClosedCaptioning className="icon red"  />
          <p className="title">Turn on captions</p>
        </div>

        {isPresenting ? (
          <div className="icon-block" onClick={stopScreenShare}>
            <SlScreenDesktop className="icon red"/>
            <p className="title">Stop presenting</p>
          </div>
        ) : (
          <div className="icon-block" onClick={screenShare}>
            <SlScreenDesktop className="icon red"/>
            <p className="title">Present now</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallPageFooter;
