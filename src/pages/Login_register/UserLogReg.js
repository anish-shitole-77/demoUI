import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import Admin_Header from "../Admin/Admin_Header";
import { useGlobalContext } from "../../global/GlobalContext";
import { authService_user } from "../../data-services/authService_user";

const UserLogReg = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    phone: "",
    state: "",
    dist: "",
    street_address: "",
    city: "",
    sub_district: "",
    zip: "",
  });

  //////////// excel ////////////

  ////////////////////

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    const result = authService_user.register(formData);
    if (result) {
      alert("Registered successfully!");
      navigate("/UserLogin");
    } else {
      alert("User already exists!");
    }
  };

  const { isChecked } = useGlobalContext();

  return (
    <>
      <Header />
      {isChecked ? <Admin_Header /> : null}

      <div className="page-contaiter">
        {/*Breadcrumb*/}
        <section className="breadcrumb">
          <div
            className="background-image"
            data-background="img/bg_img/bg_001.jpg"
            data-bg-posx="center"
            data-bg-posy="center"
            data-bg-overlay={4}
          />
          <div className="breadcrumb-content">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h1 className="breadcrumb-title">My Account</h1>
                  <nav className="breadcrumb-link">
                    <span>
                      <a href="/Home">Home</a>
                    </span>
                    <span>My Account</span>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*Breadcrumb*/}
        {/*Content*/}
        <section className="sec-padding">
          <div className="container">
            <div className="row justify-content-around">
              <div className="col-md-6">
                <div className="my-account-box">
                  <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <p className="form-field-wrapper">
                      <label htmlFor="username">
                        Username <span className="required">*</span>
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        id="username"
                        name="username"
                        placeholder="User Name"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                      />
                    </p>

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
                        placeholder="Email Address"
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
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </p>

                    {/* Confirm Password */}
                    <p className="form-field-wrapper">
                      <label htmlFor="confirm_password">
                        Confirm Password <span className="required">*</span>
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="password"
                        id="confirm_password"
                        placeholder="Confirm Password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleInputChange}
                        required
                      />
                    </p>

                    {/* Phone */}
                    <p className="form-field-wrapper">
                      <label htmlFor="phone">
                        Phone No <span className="required">*</span>
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Phone No"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </p>

                    {/* State Dropdown */}
                    <p className="form-field-wrapper">
                      <label htmlFor="state">
                        Country <span className="required">*</span>
                      </label>
                      <select
                        className="form-control form-control-lg"
                        id="state"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">-- Select Country --</option>
                        <option value="india">-- India --</option>
                      </select>
                    </p>

                    {/* State Dropdown */}
                    <p className="form-field-wrapper">
                      <label htmlFor="state">
                        State <span className="required">*</span>
                      </label>
                      <select
                        className="form-control form-control-lg"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">-- Select State --</option>
                        <option value={formData.state}>{formData.state}</option>
                        <option value="AP">Andhra Pradesh</option>
                        <option value="AR">Arunachal Pradesh</option>
                        <option value="AS">Assam</option>
                        <option value="BR">Bihar</option>
                        <option value="CG">Chhattisgarh</option>
                        <option value="GA">Goa</option>
                        <option value="GJ">Gujarat</option>
                        <option value="HR">Haryana</option>
                        <option value="HP">Himachal Pradesh</option>
                        <option value="JH">Jharkhand</option>
                        <option value="KA">Karnataka</option>
                        <option value="KL">Kerala</option>
                        <option value="MP">Madhya Pradesh</option>
                        <option value="MH">Maharashtra</option>
                        <option value="MN">Manipur</option>
                        <option value="ML">Meghalaya</option>
                        <option value="MZ">Mizoram</option>
                        <option value="NL">Nagaland</option>
                        <option value="OD">Odisha</option>
                        <option value="PB">Punjab</option>
                        <option value="RJ">Rajasthan</option>
                        <option value="SK">Sikkim</option>
                        <option value="TN">Tamil Nadu</option>
                        <option value="TS">Telangana</option>
                        <option value="TR">Tripura</option>
                        <option value="UP">Uttar Pradesh</option>
                        <option value="UK">Uttarakhand</option>
                        <option value="WB">West Bengal</option>
                        <option value="AN">Andaman and Nicobar Islands</option>
                        <option value="CH">Chandigarh</option>
                        <option value="DN">
                          Dadra and Nagar Haveli and Daman and Diu
                        </option>
                        <option value="DL">Delhi</option>
                        <option value="JK">Jammu and Kashmir</option>
                        <option value="LA">Ladakh</option>
                        <option value="LD">Lakshadweep</option>
                        <option value="PY">Puducherry</option>
                      </select>
                    </p>

                    {/* District */}
                    <p className="form-field-wrapper ">
                      <label htmlFor="billing_city">
                        District&nbsp;
                        <abbr className="required" title="required">
                          *
                        </abbr>
                      </label>
                      <select
                        name="dist"
                        className="form-control form-control-lg"
                      >
                        <option value="">-- Select District --</option>
                        <option value={formData.dist}>{formData.dist}</option>
                      </select>
                    </p>

                    {/* Taluka */}
                    <p className="form-field-wrapper">
                      <label htmlFor="billing_city">
                        Sub District&nbsp;
                        <abbr className="required" title="required">
                          *
                        </abbr>
                      </label>
                      <select
                        name=" sub_district"
                        className="form-control form-control-lg"
                      >
                        <option value="">-- Select Sub District --</option>
                        <option value={formData.sub_district}>{formData.sub_district}</option>
                      </select>
                    </p>

                    <p className="form-field-wrapper">
                      <label htmlFor="billing_city">
                        Town / City&nbsp;
                        <abbr className="required" title="required">
                          *
                        </abbr>
                      </label>
                      <input
                        value={formData.city}
                        className="form-control form-control-lg"
                        name="city"
                        placeholder=" Town / City"
                        required
                        type="text"
                      />
                    </p>

                    <p className="form-field-wrapper ">
                      <label htmlFor="billing_postcode">
                        ZIP&nbsp;
                        <abbr className="required" title="required">
                          *
                        </abbr>
                      </label>
                      <input
                        value={formData.zip}
                        className="form-control form-control-lg"
                        name="zip"
                        placeholder="ZIP"
                        required
                        type="text"
                      />
                    </p>

                    <p className="form-field-wrapper">
                      <label htmlFor="billing_city">
                        Street Address&nbsp;
                        <abbr className="required" title="required">
                          *
                        </abbr>
                      </label>
                      <input
                        value={formData.street_address}
                        className="form-control form-control-lg"
                        name="street_address"
                        placeholder="Street Address"
                        required
                        type="text"
                      />
                    </p>

                    {/* Info Text */}
                    <p className="form-field-wrapper">
                      Your personal data will be used to support your experience
                      throughout this website, to manage access to your account,
                      and for other purposes described in our{" "}
                      <a href="/Home">privacy policy</a>.
                    </p>

                    {/* Submit */}
                    <p className="form-field-wrapper form-row">
                      <button
                        type="submit"
                        className="btn btn-outline-primary button"
                        name="register"
                        // onClick={handleDownloadExcel}
                      >
                        Register
                      </button>
                    </p>
                  </form>
                </div>
              </div>{" "}
            </div>
          </div>
        </section>
        {/*End Content*/}
      </div>

      <Footer />
    </>
  );
};

export default UserLogReg;
