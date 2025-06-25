import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import Admin_Header from "../Admin/Admin_Header";
import { useGlobalContext } from "../../global/GlobalContext";
import { authService_user } from "../../data-services/authService_user";
import { useAuth } from "../../global/AuthContext";

const UserProfile = () => {
  const [formData, setFormData] = useState([]);
const navigate = useNavigate();

const { user } = useAuth();
const email = user?.email;
const { isChecked } = useGlobalContext();

// ✅ Protect route: redirect if not logged in
useEffect(() => {
  if (!user) {
    navigate("/Home");
  }
}, [user]);

// ✅ Fetch user info
useEffect(() => {
  if (!email) return;
  const fetchUser = async () => {
    const usersData = await authService_user.getUserByemail(email);
    setFormData(usersData);
  };
  fetchUser();
}, [email]);

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

const handleSubmit = (e) => {
  e.preventDefault();

  const result = authService_user.userUpdate(email, formData);
  if (result) {
    setFormData(result);
    alert("Update successfully!");
    // navigate("/UserLogin");
  }
};

// ✅ Prevent render before auth check
if (!user) {
  return null; // or loading spinner
}

  return (
    <>
      <Header />
      {isChecked ? <Admin_Header /> : null}
      <div className="page-contaiter">
        {/*Breadcrumb*/}
        {/*Breadcrumb*/}
        {/*Content*/}
        <section className="sec-padding">
          <div className="container">
            <div className="row justify-content-around"></div>
            {/*  */}
            <div className="col-md-12">
              <div className="my-account-box mb-4 rounded-4 shadow">
                <h2>My Account</h2>

                {/* <div className="my-account-box"> */}
                <form onSubmit={handleSubmit}>
                  {/* Username */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="username">
                        Username <span className="required">*</span>
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* Email */}
                    <div class="col-md-6 mb-3">
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
                        disabled
                      />
                    </div>

                    {/* Password */}
                    <div class="col-md-6 mb-3">
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
                        disabled
                      />
                    </div>

                    {/* Confirm Password */}
                    {/* <div class="col-md-6 mb-3">
                    <label htmlFor="confirm_password">
                      Confirm Password <span className="required">*</span>
                    </label>
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      id="confirm_password"
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleInputChange}
                      required
                    />
                   </div> */}

                    {/* Phone */}
                    <div class="col-md-6 mb-3">
                      <label htmlFor="phone">
                        Phone No <span className="required">*</span>
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div class="col-md-6 mb-3">
                      <label htmlFor="state">
                        Country <span className="required">*</span>
                      </label>
                      <select
                        className="form-select"
                        id="state"
                        name="country"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">-- Select State --</option>
                        <option value="maha">-- maha --</option>
                      </select>
                    </div>

                    {/* State Dropdown */}
                    <div class="col-md-6 mb-3">
                      <label htmlFor="state">
                        State <span className="required">*</span>
                      </label>
                      <select
                        className="form-select"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">-- Select State --</option>
                        <option value="maha">-- maha --</option>
                      </select>
                    </div>

                    {/* District */}
                    <div class="col-md-6 mb-3">
                      <label htmlFor="dist">
                        District <span className="required">*</span>
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        id="dist"
                        name="dist"
                        value={formData.dist}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* Taluka */}
                    <div class="col-md-6 mb-3">
                      <label htmlFor="tal">
                        Sub District <span className="required">*</span>
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                     
                        name="sub_district"
                        value={formData.sub_district}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* Town / City */}
                    <div class="col-md-6 mb-3">
                      <label htmlFor="tal">
                        Town / City <span className="required">*</span>
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* ZIP */}
                    <div class="col-md-6 mb-3">
                      <label htmlFor="tal">
                        ZIP <span className="required">*</span>
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div class="col-md-6 mb-3">
                      <label htmlFor="tal">
                        Street Address <span className="required">*</span>
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        name="street_address"
                        value={formData.street_address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* Submit */}
                    <p className="form-field-wrapper form-row">
                      <button
                        type="submit"
                        className="btn btn-outline-primary button"
                        name="register"
                        // onClick={handleDownloadExcel}
                      >
                        Update
                      </button>
                    </p>
                  </div>
                </form>
                {/* </div>/ */}
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
export default UserProfile;
