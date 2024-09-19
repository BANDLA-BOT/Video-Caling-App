
import { useNavigate } from "react-router-dom";
import { FaVideo } from "react-icons/fa";
import { FaRegKeyboard } from "react-icons/fa";

import shortid from "shortid";
import './Styles/HomePage.scss'
import Header from '../UI/Header'

const HomePage = () => {
  const navigate = useNavigate();

  const startCall = () => {
    const uid = shortid.generate();
    navigate(`/${uid}#init`);
  };

  return (
    <div className="home-page">
      <Header />
      <div className="body">
        <div className="left-side">
          <div className="content">
            <h2>Premium video meetings. Now free for everyone.</h2>
            <p>
              We re-engineered the service we built for secure business
              meetings, Google Meet, to make it free and available for all.
            </p>
            <div className="action-btn">
              <button className="btn green" onClick={startCall}>
                <FaVideo className="icon-block"  />
                New Meeting
              </button>
              <div className="input-block">
                <div className="input-section">
                  <FaRegKeyboard className="icon-block" />
                  <input placeholder="Enter a code or link" />
                </div>
                <button className="btn no-bg">Join</button>
              </div>
            </div>
          </div>
          <div className="help-text">
            <a href="">Learn more</a> about Google Meet
          </div>
        </div>
        <div className="right-side">
          <div className="content">
            <img src="https://www.gstatic.com/meet/google_meet_marketing_ongoing_meeting_grid_427cbb32d746b1d0133b898b50115e96.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
