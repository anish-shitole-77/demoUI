import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import PageLoding from "../loding-page/PageLoding";
import { useAuth } from "../../global/AuthContext";
import { authService_cart } from "../../data-services/authService_cart";
import { authService_sadee } from "../../data-services/authService_sadee";
import { authService_accessories } from "../../data-services/authService_accessories";
import { authService_myPro } from "../../data-services/authService_myPro";

const Section1 = ({ data }) => {
  const { user } = useAuth();
  const u_id = user?.id;

  const [qty, setQuantity] = useState(1);
  const [activeimg, setactiveimg] = useState(data?.mainImage || "");
  const [allData, setData] = useState([]);

  // ✅ Always keep hooks here (no early return)

  const changeQuantity = (delta) => {
    setQuantity((prev) => {
      const newQty = Math.min(8, Math.max(1, prev + delta));
      return newQty;
    });
  };

  const addToCart = async () => {
    const cartData = {
      u_id: u_id,
      p_id: data.id,
      mainImage: data.mainImage,
      name: data.productName,
      price: data.price,
      quantity: qty,
    };
    const result = await authService_cart.insertCartDetails(cartData, u_id);
    if (result) {
      alert("Added in Cart...!  Cart Product's : " + result.length);
    }
  };

  async function sadeData(color) {
    const Datas = await authService_sadee.getSadeeByColor(color);
    setData(Datas);
  }
  async function accessories(color) {
    const Datas = await authService_accessories.getAccessoriesByColor(color);
    setData(Datas);
  }
  async function fashionIsta(color) {
    const Datas = await authService_myPro.getMyproductByColor(color);
    setData(Datas);
  }

  useEffect(() => {
    if (!data) return;

    // ✅ Now scrolls only when data is available
    window.scrollTo({ top: 0, behavior: "smooth" });

    switch (data.category) {
      case "MyProduct":
        fashionIsta(data.color);
        break;
      case "Saree":
        sadeData(data.color);
        break;
      case "Accessories":
        accessories(data.color);
        break;
      default:
        break;
    }
  }, [data?.category]);
  console.log(data);
  // ✅ Now return condition
  if (!data) {
    return <PageLoding />;
  }
  return (
    <>
      <section className="sec-padding--md">
        {/* Product */}
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12  mb-2">
              <div
                className="p-3"
                style={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.05)",
                  height: "700px", // ✅ increased container height
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    height: "550px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                  }}
                >
                  <img
                    src={activeimg ? activeimg : data?.mainImage}
                    alt="product"
                    style={{
                      height: "100%", // ✅ force image height = container height
                      width: "auto", // ✅ maintain aspect ratio (no stretch)
                      objectFit: "cover", // ✅ if you want it to fill (or use 'contain' if you want full image without cut)
                    }}
                  />
                </div>
                {/* Thumbnails */}
                <div
                  className="d-flex flex-row mt-3"
                  style={{
                    overflowX: "auto",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {[
                    data?.mainImage,
                    data?.firstImage,
                    data?.secondImage,
                    data?.thirdImage,
                    data?.fourthImage,
                  ]
                    .filter(Boolean)
                    .map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`thumb-${i}`}
                        onClick={() => setactiveimg(img)}
                        style={{
                          height: "80px",
                          width: "80px",
                          objectFit: "cover",
                          border:
                            activeimg === img
                              ? "2px solid #27af9a"
                              : "1px solid #ccc",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="col-lg-6 col-md-12">
              <div
                className="p-4"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.05)",
                }}
              >
                <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
                  {data?.productName}
                </h1>
                <p style={{ fontSize: "22px", color: "#333" }}>
                  <b>₹ {data?.price}</b>
                  <del style={{ marginLeft: "10px", color: "#999" }}>₹ 550</del>
                </p>
                <p style={{ color: "#666" }}>
                  Tax included.{" "}
                  <a
                    href="/shipping-policy"
                    style={{ textDecoration: "underline", color: "blue" }}
                  >
                    Shipping
                  </a>{" "}
                  calculated at checkout.
                </p>

                {/* Quantity Selector */}
                <label htmlFor="quantity" className="form-label mt-3 mb-1">
                  Quantity
                </label>
                <div
                  className="d-flex align-items-center justify-content-between mb-3"
                  style={{
                    border: "1px solid #ccc",
                    width: "120px",
                    padding: "5px 10px",
                    borderRadius: "6px",
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    style={{ fontSize: "1.5rem", textDecoration: "none" }}
                    onClick={() => changeQuantity(-1)}
                  >
                    −
                  </button>
                  <span style={{ fontSize: "1.2rem" }}>{qty}</span>
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    style={{ fontSize: "1.5rem", textDecoration: "none" }}
                    onClick={() => changeQuantity(1)}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={addToCart}
                  className="btn btn-outline-primary mb-3 col-md-8"
                >
                  Add to Cart
                </button>

                <div>
                  <Link
                    to={"/checkout"}
                    className="btn btn-outline-success mb-3 col-md-8"
                  >
                    Buy it now
                  </Link>
                </div>

                <div className="product-meta">
                  <h4>Description</h4>
                  <p>
                    <strong>Sku :</strong> TMDEMO017
                  </p>
                  <p>
                    <strong>Categories :</strong> {data?.category},{" "}
                    {data?.subCategory}
                  </p>
                  <p>
                    <strong>Material :</strong> {data?.material}
                  </p>
                  <p>
                    <strong>Print / Work :</strong> {data?.printWork}
                  </p>
                  <p>
                    <strong>Occasion :</strong> {data?.occasion}
                  </p>
                  <p>
                    <strong>Pack Contain :</strong> {data?.packContain}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Product */}
        {/*Product Tabs*/}
        <div className="container">
          <div className="product-tabs-wrapper">
            {/*Tabs*/}
            <ul className="product-tabs-nav nav justify-content-center" role="tablist">
              <li>
                <a
                  className="active"
                  href="#tab_description"
                  role="tab"
                  data-toggle="tab"
                  aria-expanded="false"
                >
                  Description
                </a>
              </li>
              <li>
                <a
                  // className
                  href="#tab_information"
                  role="tab"
                  data-toggle="tab"
                  aria-expanded="true"
                >
                  Additional information
                </a>
              </li>
              {/* <li>
                <a href="#tab_reviews" role="tab" data-toggle="tab">
                  Reviews (3)
                </a>
              </li> */}
              <li>
                {/* <Link className href="#tab_custom" role="tab" data-toggle="tab">
                Custom Tab
              </Link> */}
              </li>
            </ul>
            {/*End Tabs*/}
            {/*Tabs Content*/}
            <div
              id="product-accordian-Content"
              className="product-Content-tabs"
            >
              {/* Description */}
              <div
                id="tab_description"
                role="tabpanel"
                className="tab-pane fade show active"
              >
                {/*Header*/}
                <div id="accrodianOne" className="product-Content-toggle">
                  <a
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Description
                  </a>
                </div>
                {/*Body*/}
                <div
                  id="collapseOne"
                  className="product-tab-Content-body collapse show"
                  aria-labelledby="accrodianOne"
                  data-parent="#product-accordian-Content"
                >
                  <p>{data?.description}</p>
                  {/* <p>
                    It has survived not only five centuries, but also the leap
                    into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release
                    of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus
                    PageMaker including versions of Lorem Ipsum.
                  </p>
                  <p>
                    There is no one who loves pain itself, who seeks after it
                    and wants to have it, simply because it is pain.
                  </p> */}
                </div>
              </div>
              {/*Additional information*/}
              <div
                id="tab_information"
                role="tabpanel"
                className="tab-pane fade"
              >
                {/*Header*/}
                <div id="accrodianTwo" className="product-Content-toggle">
                  <a
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Additional information
                  </a>
                </div>
                {/*Body*/}
                <div
                  id="collapseTwo"
                  className="product-tab-Content-body collapse justify-content-center "
                  aria-labelledby="accrodianTwo"
                  data-parent="#product-accordian-Content"
                >
                  <div className="detail-table text-center">
                    <table >
                      <tbody>
                        <tr>
                          <th>Color :</th>
                          <td>Black, Blue, Orange, Gray, White, Green</td>
                        </tr>
                        <tr>
                          <th>Size :</th>
                          <td>XS, Small, Large, Mediam, Small, XL, XXL</td>
                        </tr>
                        <tr>
                          <th>Weight :</th>
                          <td>5 kg</td>
                        </tr>
                        <tr>
                          <th>Dimensions :</th>
                          <td>60 x 40 x 60 cm</td>
                        </tr>
                        <tr>
                          <th>Washcare :</th>
                          <td>Dry Clean</td>
                        </tr>
                        <tr>
                          <th>Composition :</th>
                          <td>100% Polyester</td>
                        </tr>
                        <tr>
                          <th>Lining composition :</th>
                          <td>Polyester</td>
                        </tr>
                        <tr>
                          <th>Other info :</th>
                          <td>Ullamcorper nisl mus integer mollis vestibulu</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/*Reviews */}
              {/* <div id="tab_reviews" role="tabpanel" className="tab-pane fade">
               
                <div id="accrodianThree" className="product-Content-toggle">
                  <a
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Reviews (3)
                  </a>
                </div>
               
                <div
                  id="collapseThree"
                  className="product-tab-Content-body collapse"
                  aria-labelledby="accrodianThree"
                  data-parent="#product-accordian-Content"
                >
                  <div className="row">
                   
                    <div className="col-md-6">
                      <div className="review-form-wrapper">
                        <h4 className="review-title">Add a Review</h4>
                        <p>
                          Your email address will not be published. Required
                          fields are marked *
                        </p>
                        <form id="comment-form" className="comment-form">
                          <div className="form-field-wrapper">
                            <label>Your Rating</label>
                            <p className="stars selected">
                              <span>
                                <a
                                  className="star-1"
                                  href="javascript:void(0)"
                                />
                                <a
                                  className="star-2"
                                  href="javascript:void(0)"
                                />
                                <a
                                  className="star-3"
                                  href="javascript:void(0)"
                                />
                                <a
                                  className="star-4"
                                  href="javascript:void(0)"
                                />
                                <a
                                  className="star-5"
                                  href="javascript:void(0)"
                                />
                              </span>
                            </p>
                          </div>
                          <div className="form-field-wrapper">
                            <label>
                              Your Review<span className="required">*</span>
                            </label>
                            <textarea
                              id="comment"
                              name="comment"
                              className="form-full"
                              cols={45}
                              rows={10}
                              aria-required="true"
                              required
                              defaultValue={""}
                            />
                          </div>
                          <div className="form-field-wrapper">
                            <label>
                              Name<span className="required">*</span>
                            </label>
                            <input
                              id="author"
                              name="author"
                              className="form-full"
                              defaultValue
                              size={30}
                              aria-required="true"
                              required
                              type="text"
                            />
                          </div>
                          <div className="form-field-wrapper">
                            <label>
                              Email<span className="required">*</span>
                            </label>
                            <input
                              id="email"
                              name="email"
                              className="form-full"
                              defaultValue
                              size={30}
                              aria-required="true"
                              required
                              type="email"
                            />
                          </div>
                          <div className="form-field-wrapper">
                            <input
                              name="submit"
                              id="submit"
                              className="btn btn--primary"
                              defaultValue="Submit"
                              type="submit"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
      
                    <div className="col-md-6">
                      <div className="comments">
                        <h4 className="review-title">
                          3 Review for <span>This Product</span>
                        </h4>
                        <ul className="commentlist">
           
                          <li className="comment-item">
                            <img
                              className="avtar"
                              src="img/avtar.jpg"
                              alt="avtar"
                            />
                            <div className="comment-text">
                              <div
                                className="star-rating"
                                itemProp="reviewRating"
                                itemScope
                                itemType="http://schema.org/Rating"
                                title="Rated 4 out of 5"
                              >
                                <span style={{ width: "80%" }} />
                              </div>
                              <p className="meta">
                                <strong>James Koster</strong>
                                <span>–</span>
                                <time dateTime="2018-08-21">
                                  August 21, 2018
                                </time>
                              </p>
                              <div className="description">
                                <p>
                                  when an unknown printer took a galley of type
                                  and scrambled it to make a type specimen book.
                                  It has survived not only five centuries
                                </p>
                              </div>
                            </div>
                          </li>
                          
                          <li className="comment-item">
                            <img
                              className="avtar"
                              src="img/avtar.jpg"
                              alt="avtar"
                            />
                            <div className="comment-text">
                              <div
                                className="star-rating"
                                itemProp="reviewRating"
                                itemScope
                                itemType="http://schema.org/Rating"
                                title="Rated 4 out of 5"
                              >
                                <span style={{ width: "100%" }} />
                              </div>
                              <p className="meta">
                                <strong>Michel</strong>
                                <span>–</span>
                                <time dateTime="August 21, 2018">
                                  August 21, 2018
                                </time>
                              </p>
                              <div className="description">
                                <p>Wow Special!</p>
                              </div>
                            </div>
                          </li>
                      
                          <li className="comment-item">
                            <img
                              className="avtar"
                              src="img/avtar.jpg"
                              alt="avtar"
                            />
                            <div className="comment-text">
                              <div
                                className="star-rating"
                                itemProp="reviewRating"
                                itemScope
                                itemType="http://schema.org/Rating"
                                title="Rated 4 out of 5"
                              >
                                <span style={{ width: "60%" }} />
                              </div>
                              <p className="meta">
                                <em>Your comment is awaiting approval</em>
                              </p>
                              <div className="description">
                                <p>When an unknown printer took a galley!</p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/*Custom Tab*/}
              {/* <div id="tab_custom" role="tabpanel" className="tab-pane fade">
              
              <div id="accrodianFour" className="product-Content-toggle">
                <Link
                  data-toggle="collapse"
                  data-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  Custom Tab
                </Link>
              </div>

              <div
                id="collapseFour"
                className="product-tab-Content-body collapse"
                aria-labelledby="accrodianFour"
                data-parent="#product-accordian-Content"
              >
                <div className="row">
                  
                  <div className="col-md-5 mb-0 mb-sm-3">
                    <img src="img/blank.png" alt="banner" />
                  </div>
                  
                  <div className="col-md-7 d-flex">
                    <div className="align-self-center">
                      <span className="page-sub-title">New Arrival</span>
                      <h3>Spring Collection 2019</h3>
                      <p className="large">
                        Vibrant color with floral pattern becoming the fashion
                        <br />
                        trending in this summer.
                      </p>
                      <Link
                        to={"/Home"} 
                        className="btn btn--primary btn--sm space-t--1"
                      >
                        More Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            </div>
            {/*End Tabs Content*/}
          </div>
        </div>
        {/*End Product Tabs*/}
        {/*Related Product*/}
        <div className="container sec-padding--md">
          <div className="page-head">
            <h2 className="page-title">Related Products</h2>
          </div>
          <Swiper
            className="swiper-theme"
            loop={true}
            slidesPerView={4}
            navigation={false}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={false}
          >
            {/* Item 1 */}
            {allData.slice(0, 10).map((product) => (
              <SwiperSlide>
                <div className="prodct-item-element col-sm-6 col-md-4 col-lg-12">
                  <div className="product-item">
                    <div className="product-item-img">
                      <Link
                        to={`/product_detail/${product.id}/${product.category}`}
                        className="product-item-img-link"
                      >
                        <img src={product.mainImage} alt="Product Item" />
                      </Link>

                      <div className="add-to-link">
                        <button
                          onClick={addToCart}
                          className="btn btn-outline-primary btn--sm button"
                        >
                          Add To Cart
                        </button>
                      </div>

                      <div className="hover-product-icon">
                        <div className="product-icon-btn-wrap">
                          <button
                            onClick={addToCart}
                            data-toggle="tooltip"
                            data-placement="left"
                            title="Add to Wishlist"
                          >
                            <i className="ti-heart" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="product-item-content">
                      {/* <div className="tag">
                        <Link to={"/Home"}>Minimal</Link>
                      </div> */}
                      <Link to={"/Home"} className="product-item-title">
                        <span>{product.productName}</span>
                      </Link>
                      <p className="product-item-price">
                        <span className="product-price-amount">
                          <span className="product-price-currency-symbol"></span>
                          &#8377;{product.price}
                        </span>
                      </p>
                      <div className="product-rating">
                        <div
                          className="star-rating"
                          itemProp="reviewRating"
                          itemScope
                          itemType="http://schema.org/Rating"
                          title="Rated 4 out of 5"
                        >
                          <span style={{ width: "60%" }} />
                        </div>
                        <Link to={"/Home"} className="product-rating-count">
                          <span className="count">3</span> Reviews
                        </Link>
                      </div>
                      <p className="product-description">
                        When an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic remaining essentially unchanged.
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/*End Related Product*/}
      </section>
    </>
  );
};

export default Section1;
