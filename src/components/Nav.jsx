import css from "./Nav.module.css";
import logo from "../assets/logo.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/reducers/userSlice";

const Nav = () => {
  const [seen, setSeen] = useState(false);
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
    
  }

  return (
    <nav className={css.navBar}>
      <div className={css.logo}>
        <img src={logo} alt="" className={css.logoImg} />
      </div>
      <div className={css.links}>
        <a href="#home" className={css.link}>
          <i className="ri-home-smile-fill"></i> Home
        </a>
        <a href="#form" className={css.link}>
          <i className="ri-exchange-funds-fill"></i> Add Incomes & Expenses
        </a>
        <a href="#ViewStatements" className={css.link}>
          <i className="ri-eye-2-fill"></i> View Statements
        </a>
        <a href="#" className={css.link}>
          <i className="ri-user-fill"></i> Account
        </a>
        {/* <a href='#' className={css.link}>Contact Us</a> */}
      </div>
      <div className={css.menuBtn} onClick={() => setSeen(!seen)}>
        {seen ? <i className="ri-close-line"></i> : <i className="ri-menu-4-fill"></i>}
      </div>
      {seen ? (
        <div className={css.menu}>
          <a href="#home" className={css.link} onClick={() => setSeen(!seen)}>
            <i className="ri-home-smile-fill"></i> Home
          </a>
          <a href="#form" className={css.link} onClick={() => setSeen(!seen)}>
            <i className="ri-exchange-funds-fill"></i> Add Incomes & Expenses
          </a>
          <a href="#ViewStatements" className={css.link} onClick={() => setSeen(!seen)}>
            <i className="ri-eye-2-fill"></i> View Statements
          </a>
          <a href="#" className={css.link} onClick={() => setSeen(!seen)}>
            <i className="ri-user-fill"></i> Account
          </a>
          <a href="#" className={css.link} onClick={() => setSeen(!seen)}>
          <i className="ri-phone-fill"></i> Contact Us
          </a>
          <div className={css.link} onClick={() => {setSeen(!seen); handleLogout}}>
          <i class="ri-logout-box-r-line"></i> Logout
          </div>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Nav;
