import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import mypro from "../../images/myproduct.jpg";
import sadi from "../../images/sale1.jpg";
import blaus from "../../images/blause.jpg";
import access from "../../images/accessories.jpg";
import { authService_advertisement } from "../../data-services/authService_advertisement";

const Section1 = () => {
  
const [oldData, setOldData] = useState({});

useEffect(() => {
  async function fetchOldData() {
    const advertise = await authService_advertisement.getOldAdvertise();
    setOldData(advertise);

    // console.log("Fetched from DB:", advertise); // ✅ correct
   
  }
  fetchOldData();
}, []);

  const MyProduct = "FashionIsta Product's";
  const Sadi = "Saree";
  const Accessories = "Accessories";



  return (
    <section id="intro" className="intro">
      {/*Slider Hero*/}
      <Swiper
        className="owl-theme"
        modules={[Navigation, Autoplay]}
        loop={true}
        navigation={false}
        autoplay={{ delay: 2000 }}
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="item height-9 sm-height-600px"
            data-slide_theme="light-slide"
          >
            <div
              className="background-image"
              style={{ backgroundImage: `url(${oldData[0]?.firstImage})` }}
              data-bg-posx="center"
              data-bg-posy="top"
              data-bg-overlay={0}
            />
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-8">
                  <div className="intro-caption intro-caption-middel text-left intro-caption-fade sec-padding--lg">
                    {/* <p className="intro-subtitle"># Women Fashion</p> */}
                    <h1 className="intro-title">
                      {oldData[0]?.first_add_name}
                    </h1>
                    <Link to={`/product_listing/${MyProduct}`} className="btn btn--white space--1">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="item section-dark height-9 sm-height-600px"
            data-slide_theme="dark-slide"
          >
            <div
              className="background-image"
              style={{ backgroundImage: `url(${oldData[0]?.secondImage})` }}
              data-bg-posx="center"
              data-bg-posy="top"
              data-bg-overlay={1}
            />
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-8 ml-md-auto">
                  <div className="intro-caption intro-caption-middel text-left intro-caption-fade sec-padding--lg">
                    {/* <p className="intro-subtitle"># Man Fashion</p> */}
                    <h1 className="intro-title">
                                           {oldData[0]?.second_add_name}
                    </h1>
                    <Link to={`/product_listing/${Sadi}`} className="btn btn--white space--1">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="item height-9 sm-height-600px">
            <div
              className="background-image"
              style={{ backgroundImage: `url(${oldData[0]?.thirdImage})` }}
              data-bg-posx="right"
              data-bg-posy="top"
              data-bg-overlay={0}
            />
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-8">
                  <div className="intro-caption intro-caption-middel text-left intro-caption-fade sec-padding--lg">
                    <p className="intro-subtitle">Up To 50% Off</p>
                    <h1 className="intro-title">
                      {oldData[0]?.third_add_name}
                      <br />
                      Collection
                    </h1>
                    <Link to={`/product_listing/${Accessories}`} className="btn btn--white space--1">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide>
          <div
            className="item section-dark height-9 sm-height-600px"
            data-slide_theme="dark-slide"
          >
            <div
              className="background-image bg--primary"
              style={{ backgroundImage: `url(${oldData[0]?.fourthImage})` }}
              data-bg-posx="center"
              data-bg-posy="top"
              data-bg-overlay={6}
            />
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-8 mx-md-auto">
                  <div className="intro-caption intro-caption-middel text-center intro-caption-fade sec-padding--lg">
                    <p className="intro-subtitle"># Weekend Special Sale</p>
                    <img
                      className="intro-caption-img"
                      src="img/slide_img/caption_001.png"
                      alt="Summer Sale"
                    />
                    <Link to={`/product_listing/${Accessories}`} className="btn btn--white space--1">
                      Get Offers
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      {/*End Slider Hero*/}
    </section>
  );
};

export default Section1;
