import "./Styles/NoMatch.scss";
import { Link } from "react-router-dom";
import Header from "../UI/Header";
const NoMatch = () => {
  return (
    <div className="no-match">
      <Header />
      <div className="no-match__content">
        <h2>Invalid Video call name.</h2>
        <div className="action-btn">
          <Link to={"/"} className="btn green">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoMatch;
