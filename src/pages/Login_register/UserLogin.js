import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

import Admin_Header from "../Admin/Admin_Header";
import { useGlobalContext } from '../../global/GlobalContext'
// import { authService_user } from "../../data-services/user-services";
import { useAuth } from "../../global/AuthContext";
import { authService_user } from "../../data-services/authService_user";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const user =await authService_user.login(formData.email, formData.password);
    console.log(user) 
    if (user) {
      login(user);
      alert("Login successful!");
      navigate("/Home");
    } else {
      alert("Invalid credentials");
    }
  };

 const { isChecked } = useGlobalContext();
  return (
    <>
     <Header />
      {isChecked ? <Admin_Header /> : null}

      <div className="page-contaiter">

        {/*Content*/}
        <section className="sec-padding">
          <div className="container">
            <div className="row justify-content-around">
              <div className="col-md-6">
                <div className="my-account-box mb-4">
                  <form onSubmit={handleSubmit}>
                    <h2>Login</h2>

                    {/* Email */}
                    <p className="form-field-wrapper">
                      <label htmlFor="email">
                        Email Address <span className="required">*</span>
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </p>

                    {/* Password */}
                    <p className="form-field-wrapper">
                      <label htmlFor="password">
                        Password <span className="required">*</span>
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p className="form-field-wrapper">
                      <label className>
                        <input
                          className
                          name="rememberme"
                          id="Checkbox1"
                          // value={formData.box}
                          // onChange={handleInputChange}
                          type="checkbox"
                        />
                        <span>Remember me</span>
                      </label>
                    </p>
                    <p className="form-field-wrapper form-row">
                      <button
                        type="submit"
                        className="btn btn--lg btn--primary"
                        name="login"
                        value="Log in"
                      >
                        Log In
                      </button>
                    </p>
                    <p className="form-field-wrapper lost_password">
                      <a href="login_register">Register Here..!</a>
                    </p>
                    <br></br>
                    <a href="/UserLogin">Lost your password..?</a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*End Content*/}
      </div>

      <Footer />
    </>
  );
};

export default UserLogin;
