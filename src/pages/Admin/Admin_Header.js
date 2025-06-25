import React, { useEffect, useState } from "react";
import "../../components/CSS/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../global/AuthContext";
import { useGlobalContext } from "../../global/GlobalContext";
import { authService_user } from "../../data-services/authService_user";

const Admin_Header = () => {
  const { isChecked, setIsChecked } = useGlobalContext();
  const [userCount,setUserCount]=useState(0);

  useEffect(() => {
 
     const fetchUsers = async () => {
       try {
         const data = await authService_user.getUsers();
         setUserCount(data.length);
         // console.log(data);
       } catch (error) {
         console.error("Error fetching users:", error);
       
       }
     };
 
     fetchUsers();
   }, []);

  const { logout } = useAuth();
  const navigate = useNavigate();

  function logOut() {
    if (isChecked) {
      setIsChecked(false);
    }
    logout();
    navigate("/Home");
  }

  // const [activemenu, setactivemenu] = useState("");
  const [mobileordesktop, setmobileordesktop] = useState(false);

  const MyProduct = "FashionIsta Product's";
  const Sadi = "Saree";
  const Accessories = "Accessories";

  return (
    <header
      id="header"
      className="header fixed-header bg-blur"
      data-header-hover="true"
      //  style={{border:"5px solid red",wi}}
      style={{ border: "0px solid red" }}
    >
      {/*Header Navigation*/}
      <nav
        id="navigation"
        className="header-nav admin"
        style={{ border: "0px solid red", height: "60px " }}
      >
        <div className="container ">
          <div className="row " style={{ border: "0px solid red" }}>
            {/*Navigation Menu*/}
            <div
              className={
                mobileordesktop === true
                  ? "nav-menu show-on-mobile"
                  : "nav-menu"
              }
            >
              <ul className="Admin-header">
                <li className="nav-menu-item">
                  <Link
                    to={`/uploadProducts/${MyProduct}`}
                    className="header-element"
                  >
                    <i className="fa fa-upload"></i> My Product's
                  </Link>
                </li>

                <li className="nav-menu-item">
                  <Link
                    to={`/uploadProducts/${Sadi}`}
                    className="header-element "
                  >
                    <i className="fa fa-upload"></i> Saree
                  </Link>
                </li>

                {/* <li className="nav-menu-item">
                  <Link to={"/product_detail"} className="header-element">
                    <i className="fa fa-upload"></i> Fabric
                  </Link>
                </li> */}

                <li className="nav-menu-item ">
                  <Link
                    to={`/uploadProducts/${Accessories}`}
                    className="header-element"
                  >
                    <i className="fa fa-upload"></i> Accessories
                  </Link>
                </li>
                <li className="nav-menu-item ">
                  <Link
                    to={"/uplodeAdvertise"}
                    className="header-element"
                  >
                    <i className="fa fa-upload"></i> Advertisement
                  </Link>
                </li>
              </ul>
            </div>
            {/*End Navigation Menu*/}

            {/*Nav Icons*/}
            <div className="nav-icons">
              <ul className="Admin-header">
                <li className="nav-icon-item d-lg-none ">
                  <div
                    className={
                      mobileordesktop === true
                        ? "nav-icon-trigger menu-mobile-btn active"
                        : "nav-icon-trigger menu-mobile-btn"
                    }
                    onClick={() => {
                      setmobileordesktop(!mobileordesktop);
                    }}
                    title="Navigation Menu"
                  >
                    <span>
                      <i className="ti-menu" />
                    </span>
                  </div>
                </li>

                <li className="nav-icon-item d-lg-table-cell ">
                  <Link
                    className="nav-icon-trigger heder-button"
                    to={"/user"}
                    title="Order's"
                    style={{ textDecoration: "none" }}
                  >
                    <span className="" style={{ fontSize: "80%" }}>
                      Order's
                      <span
                        className="nav-icon-count num-bg "
                        style={{ background: "#D5006C" }}
                      >
                        2
                      </span>
                    </span>
                  </Link>
                </li>

                <li className="nav-icon-item d-lg-table-cell ">
                  <Link
                    className="nav-icon-trigger heder-button"
                    to={"/userList"}
                    title="User's"
                    style={{ textDecoration: "none" }}
                  >
                    <span className="">
                      <i className="fa fa-users"></i>
                      <span
                        className="nav-icon-count num-bg "
                        style={{ background: "#D5006C" }}
                      >
                        {userCount}
                      </span>
                    </span>
                  </Link>
                </li>

                <li className="nav-icon-item hover-dropdown">
                  <div
                    className="nav-icon-trigger dropdown--trigger heder-button"
                    title="User Account"
                  >
                    <Link
                      to={"/UserProfile"}
                      className="nav-icon-trigger heder-button"
                      title="Profile"
                      style={{ textDecoration: "none" }}
                    >
                      <span className="">
                        <i className="ti-user" />
                      </span>
                    </Link>
                  </div>

                  <div className="dropdown--menu dropdown--right popup">
                    <ul>
                      <li>
                        <Link to={"/UserProfile"}>My Account</Link>
                      </li>
                      <li>
                        <Link to={"/Home"}>Lost Password</Link>
                      </li>
                      {/* <li>
                        <Link to={"/UserLogin"}>Log-Out</Link>
                      </li> */}
                      <li>
                        <hr />
                      </li>
                      <li>
                        <button
                          onClick={logOut}
                          className="btn btn-outline-primary btn--sm btn--full button"
                        >
                          <i className="fa fa-sign-out" /> Log-Out
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>

                <li></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/*End Header Navigation*/}
    </header>
  );
};

export default Admin_Header;
