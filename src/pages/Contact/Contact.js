import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Admin_Header from "../Admin/Admin_Header";
import { useGlobalContext } from "../../global/GlobalContext";
import { authService_user } from "../../data-services/authService_user";
import PageLoding from "../loding-page/PageLoding";
// import PageLoding from "../PageLoding";

const Contact = () => {
  const { isChecked } = useGlobalContext();

  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    async function adminData() {
      try {
        const data = await authService_user.getAdminData();
        setAdmin(data);
      } catch (error) {
        console.error("Error fetching admin:", error);
      } finally {
        setLoading(false); // stop loader
      }
    }

    adminData();
  }, []);

  if (loading) {
    // return <div>Loading admin data...</div>; // optional loader UI
    return <PageLoding />;
  }
  // console.log(admin);

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
                  <h1 className="breadcrumb-title">Contact Us</h1>
                  <nav className="breadcrumb-link">
                    <span>
                      <a href="/Home">Home</a>
                    </span>
                    <span>Contact Us</span>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*Breadcrumb*/}
        {/*Contact Form & Info*/}
        <section className="sec-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h2 className="page-title">Get in touch</h2>
                <form className="Contact-form">
                  <div className="form-field-wrapper">
                    <label>
                      Your Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="username"
                      placeholder="Your Name"
                      //  value={admin.username}
                      required
                    />
                  </div>
                  <div className="form-field-wrapper">
                    <label>
                      Your Email<span className="required">*</span>
                    </label>
                    <input
                      className="form-control form-control-lg"
                      name="email"
                      placeholder="Email Id"
                      required
                      type="email"
                    />
                  </div>
                  <div className="form-field-wrapper">
                    <label>
                      Your subject<span className="required">*</span>
                    </label>
                    <input
                      className="form-control form-control-lg"
                      name="subject"
                      placeholder="Enter Subject"
                      required
                      type="text"
                    />
                  </div>
                  <div className="form-field-wrapper">
                    <label>
                      Comments<span className="required">*</span>
                    </label>
                    <textarea
                      className="form-control form-control-lg"
                      name="comment"
                      placeholder="Message"
                      required
                    />
                  </div>
                  <div className="form-field-wrapper">
                    <input
                      name="submit"
                      id="submit"
                      // className="submit btn btn--lg btn--primary"
                      className="btn btn-outline-primary btn--sm button"
                      defaultValue="Send Message"
                      type="submit"
                    />
                  </div>
                </form>
              </div>
              <div className="col-md-5 offset-md-1">
                <h2 className="page-title">Contact info</h2>
                <div className="contact-information">
                  <div className="form-field-wrapper">
                    <label>Postal Address</label>

                    <p>
                      {admin?.[0]?.address} <br />
                      {admin?.[0]?.tal}, {admin?.[0]?.dist}{" "}
                    </p>
                  </div>
                  <div className="form-field-wrapper">
                    <label>Shopping Ltd</label>
                    <p>
                      {admin?.[0]?.address} <br />
                      {admin?.[0]?.tal}, {admin?.[0]?.dist}{" "}
                    </p>
                  </div>
                  <div className="form-field-wrapper">
                    <label>Contact Information</label>
                    <p>
                      <i className="ti-email left" />
                      {admin?.[0]?.email}
                      <br />
                      <i className="ti-headphone-alt left" />
                      +91 {admin?.[0]?.phone}
                    </p>
                  </div>
                  <hr />
                  <div className="form-field-wrapper">
                    <label>Follow Us</label>
                    <ul className="social large">
                      <li>
                        <a href="/Home">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                      <li>
                           <a
                      href="https://www.facebook.com/share/1BxQ5DZySb/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-facebook" />
                    </a>
                      </li>
                      <li>
                         <a href="https://www.instagram.com/fashionistaa_boutique/">
                      <i className="fa fa-instagram" />
                    </a>
                      </li>
                    
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*End Contact Form & Info*/}
      </div>

      <Footer />
    </>
  );
};

export default Contact;
