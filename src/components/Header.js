import React, { useEffect, useState } from "react";
import "./CSS/Header.css";
import Switch from "@mui/material/Switch";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../global/GlobalContext";
import { useAuth } from "../global/AuthContext";
import { authService_cart } from "../data-services/authService_cart";

const Header = () => {
  const { user, logout } = useAuth();
  // console.log(user)
  const u_id = user?.id;

  const [activemenu, setactivemenu] = useState("");
  const [mobileordesktop, setmobileordesktop] = useState(false);
  const [count, setCount] = useState(0);

  const { isChecked, setIsChecked } = useGlobalContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("log-out");
    logout();
    navigate("/Home");
  };

  useEffect(() => {
     if (!u_id) return;
    async function totalCartDataCount() {
      const data =await authService_cart.getCartDataByU_id(u_id);
      // console.log(data.length)
      setCount(data.length);
    }
    totalCartDataCount();
  }, [u_id]);

  const NewArivals = "New Arrivals";
  const MyProduct = "FashionIsta Product's";
  const Sadi = "Saree";
  const Accessories = "Accessories";

  return (
    <header
      id="header"
      className="header fixed-header "
      data-header-hover="true"
      style={{ border: "0px solid black" }}
    >
      {/*Header Navigation*/}
      <nav
        id="navigation"
        className="header-nav "
        style={{ border: "0px solid red" }}
      >
        <div className="container">
          <div className="row " style={{ border: "0px solid red" }}>
            {/*Logo*/}
            <div
              className="site-logo"
              style={{ border: "0px solid red", height: "10px" }}
            >
              <Link
                to={"/Home"}
                style={{ border: "0px solid black", height: "60px" }}
              >
                <img
                  src="/img/logo/fashionIsta.png"
                  className="logo-dark"
                  alt="FashionIsta"
                />
                <img
                  src="/img/logo/fashionIsta.png"
                  className="logo-light"
                  alt="FashionIsta"
                />
              </Link>
            </div>
            {/*End Logo*/}

            {/*Navigation Menu*/}
            <div
              className={
                mobileordesktop === true
                  ? "nav-menu show-on-mobile"
                  : "nav-menu"
              }
            >
              <ul>
                <li
                  className="nav-menu-item"
                  style={{ display: "inline-block" }}
                >
                  <Link to="/Home" className="header-element">
                    Home
                  </Link>
                </li>

                <li className="nav-menu-item">
                  <Link
                    to={`/product_listing/${NewArivals}`}
                    className="header-element "
                  >
                    New&nbsp;Arrivals
                  </Link>
                </li>

                <li className="nav-menu-item">
                  <Link
                    to={`/product_listing/${MyProduct}`}
                    className="header-element"
                  >
                    Special
                  </Link>
                </li>

                <li className="nav-menu-item">
                  <Link
                    to={`/product_listing/${Sadi}`}
                    onMouseLeave={() => {
                      setactivemenu("");
                    }}
                    onMouseEnter={() => {
                      setactivemenu("Saree");
                    }}
                    className="header-element"
                  >
                    Saree
                  </Link>

                  <div
                    className="nav-dropdown col2-dropdown"
                    onMouseLeave={() => {
                      setactivemenu("");
                    }}
                    onMouseEnter={() => {
                      setactivemenu("Saree");
                    }}
                    style={{
                      display: activemenu === "Saree" ? "block" : "none",
                      opacity: 1,
                    }}
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <ul>
                          <li>
                            <span className="dropdown-title">Trending Now</span>
                          </li>
                          <li>
                            <Link to={"/Home"}>Basics</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Tie & Dye</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Sequence</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Hand Painted</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-6">
                        <ul>
                          <li>
                            <span className="dropdown-title">LifeStyle</span>
                          </li>
                          <li>
                            <Link to={"/Home"}>Work</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Party</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Festive</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Weekend</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>

                {/* <li className="nav-menu-item">
                  <Link
                    to={`/product_listing/${data1}`}
                    onMouseLeave={() => {
                      setactivemenu("");
                    }}
                    onMouseEnter={() => {
                      setactivemenu("Fabric");
                    }}
                    className="header-element"
                  >
                    Fabric
                  </Link>

                  <div
                    className="nav-dropdown col2-dropdown"
                    onMouseLeave={() => {
                      setactivemenu("");
                    }}
                    onMouseEnter={() => {
                      setactivemenu("Fabric");
                    }}
                    style={{
                      display: activemenu === "Fabric" ? "block" : "none",
                      opacity: 1,
                    }}
                  >
                    <div className="row">
                      <div className="col-lg-4">
                        <ul>
                          <li>
                            <span className="dropdown-title">Natural</span>
                          </li>
                          <li>
                            <Link to={"/Home"}>Cotton</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Linen </Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Silk </Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Wool</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Hemp </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-4">
                        <ul>
                          <li>
                            <span className="dropdown-title">Synthetic</span>
                          </li>
                          <li>
                            <Link to={"/Home"}>Polyester </Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Nylon </Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Rayon/Viscose</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Spandex/Lycra</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Acrylic </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-4">
                        <ul>
                          <li>
                            <span className="dropdown-title">Woven </span>
                          </li>
                          <li>
                            <Link to={"/Home"}>Plain </Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Twill </Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Satin </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li> */}

                <li className="nav-menu-item ">
                  <Link
                    to={`/product_listing/${Accessories}`}
                    onMouseLeave={() => {
                      setactivemenu("");
                    }}
                    onMouseEnter={() => {
                      setactivemenu("Accessories");
                    }}
                    className="header-element"
                  >
                    Accessories
                  </Link>

                  <div
                    className="nav-dropdown col2-dropdown"
                    onMouseLeave={() => {
                      setactivemenu("");
                    }}
                    onMouseEnter={() => {
                      setactivemenu("Accessories");
                    }}
                    style={{
                      display: activemenu === "Accessories" ? "block" : "none",
                      opacity: 1,
                    }}
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <ul>
                          <li>
                            <span className="dropdown-title">Chothes</span>
                          </li>
                          <li>
                            <Link to={"/Home"}>New In clothing</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>New In Footwear</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>New In Bags</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>New In Watches</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Shirt</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-6">
                        <ul>
                          <li>
                            <span className="dropdown-title">Watches</span>
                          </li>
                          <li>
                            <Link to={"/Home"}>Analog</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Chronograph</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Digital</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Watch Cases</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Shoes</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>

                {/* New Menu Items */}

                {/* <li className="nav-menu-item">
                  <Link to="/ContactUs" className="header-element">
                    Contact Us
                  </Link>
                </li> */}
              </ul>
            </div>
            {/*End Navigation Menu*/}

            {/*Nav Icons*/}
            <div className="nav-icons">
              <ul>
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
                  {user ? (
                    <Link
                      className="nav-icon-trigger heder-button"
                      to={"/cart"}
                      title="Whishlist"
                      style={{ textDecoration: "none" }}
                    >
                      <span className="">
                        <i className="ti-bag " />
                        <span
                          className="nav-icon-count num-bg "
                          style={{ background: "#D5006C" }}
                        >
                          {count ? count : "0"}
                        </span>
                      </span>
                    </Link>
                  ) : (
                    <div className="nav-icon-trigger heder-button">
                      <span className="">
                        <i className="ti-bag " />
                        <span
                          className="nav-icon-count num-bg "
                          style={{ background: "#D5006C" }}
                        >
                          0
                        </span>
                      </span>
                    </div>
                  )}
                </li>

                {/* <li className="nav-icon-item">
                  <div
                    className=" nav-icon-trigger cart-sidebar-btn shado heder-button"
                    title="Shopping Cart"
                  >
                    <span className="">
                      <i className="ti-bag " />
                      <span
                        className="nav-icon-count"
                        style={{ background: "#D5006C" }}
                      >
                        3
                      </span>
                    </span>
                  </div>
                </li> */}

                {user?.email !== "Admin77@gmail.com" && (
                  <li className="nav-icon-item hover-dropdown">
                    <div
                      className="nav-icon-trigger dropdown--trigger shado heder-button"
                      title="User Account"
                    >
                      {user ? (
                        <Link to="/UserProfile">
                          <span className="">
                            <i className="ti-user" />
                          </span>
                        </Link>
                      ) : (
                        <span className="">
                          <i className="ti-user" />
                        </span>
                      )}
                    </div>

                    <div className="dropdown--menu dropdown--right">
                      <ul>
                        {user ? (
                          <>
                            <li>
                              <Link to="/Home">My Account</Link>
                            </li>
                            <li>
                              <Link to="/Home">Wishlist</Link>
                            </li>
                            <li>
                              <Link to="/cart">Cart</Link>
                            </li>
                            <li>
                              <Link to="/Home">Lost Password</Link>
                            </li>
                            <li>
                              <Link to="/cart">
                                <i className="fa fa-shopping-cart" /> Purchase
                                Now
                              </Link>
                            </li>
                            <li>
                              <hr />
                            </li>
                            <li>
                              <button
                                className="btn btn-outline-primary btn--sm btn--full button"
                                onClick={handleLogout}
                              >
                                Log Out
                              </button>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <hr />
                            </li>
                            <li>
                              <Link
                                className="btn btn-outline-primary btn--sm btn--full button"
                                to="/UserLogin"
                              >
                                Login Account
                              </Link>
                            </li>
                            <li>
                              <hr />
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </li>
                )}

                {/* Admin Switch */}
                {user?.email === "Admin77@gmail.com" && (
                  <li className="nav-icon-item d-lg-table-cell text-end">
                    <div className="form-check form-switch ">
                      <Switch
                        title="Admin Header"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#e91e63",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: "#e91e63",
                            },
                        }}
                      />
                    </div>
                  </li>
                )}
              </ul>
            </div>
            {/*End Nav Icons*/}

            {/*Search Bar*/}
            <div className="searchbar-menu">
              <div className="searchbar-menu-inner">
                <div className="search-form-wrap">
                  <form>
                    <button className="search-icon btn--lg">
                      <i className="ti-search" />
                    </button>
                    <input
                      className="search-field input--lg"
                      placeholder="Search here..."
                      defaultValue
                      name="search"
                      title="Search..."
                      type="search"
                      autoComplete="off"
                    />
                    <span className="search-close-icon">
                      <i className="ti-close" />
                    </span>
                  </form>
                </div>

                <div className="search-results-wrap">
                  <div className="search-results-loading">
                    <span className="fa fa-spinner fa-spin" />
                  </div>
                  <div className="search-results-text woocommerce">
                    <ul>
                      <li>Nothing found</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/*End Search Bar*/}
          </div>
        </div>
      </nav>
      {/*End Header Navigation*/}
    </header>
  );
};

export default Header;
