/* eslint-disable react/prop-types */
import './Styles/Alert.scss'
import { FaCommentAlt } from "react-icons/fa";
const Alert = ({ messageAlert }) => {
  return (
    <div className="message-alert-popup">
      <div className="alert-header">
      <FaCommentAlt className='icon'/>
        <h3>{messageAlert.payload.user}</h3>
      </div>
      <p className="alert-msg">{messageAlert.payload.msg}</p>
    </div>
  );
};

export default Alert;