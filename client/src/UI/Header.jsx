import './Styles/Header.scss'
import Logo from '../assets/logo.png'
import { FaGear } from "react-icons/fa6";
import { FaExclamationCircle } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
const Header = () => {
  return (
    <div className='header'>
      <div className='logo'>
          <img src={Logo}/>
          <span className='help-text'>
            Meet
          </span>
      </div>
      <div className='action-btn'>
      <FaQuestionCircle className='icon-block'/>
      <FaExclamationCircle className='icon-block'/>
      <FaGear className='icon-block'/>
      </div>
    </div>
  )
}

export default Header