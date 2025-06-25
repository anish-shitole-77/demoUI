import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../global/GlobalContext";
import { authService_sadee } from "../../data-services/authService_sadee";
import Admin_Header from "../Admin/Admin_Header";
import { authService_myPro } from "../../data-services/authService_myPro";
import { authService_accessories } from "../../data-services/authService_accessories";
import { useAuth } from "../../global/AuthContext";

const Upload_products = () => {
  const { p_category } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    // ✅ Protect route: redirect if not logged in
    useEffect(() => {
      if (!user) {
        navigate("/Home");
      }
    }, [user]);
  
  ///// header data set ///////////////////
  const { isChecked } = useGlobalContext();
  ////////////  set form data ///////////////

  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    qty: "",
    category: "",
    subCategory: "",
    material: "",
    color: "",
    length: "",
    width: "",
    weight: "",
    printWork: "",
    occasion: "",
    packContain: "",

    mainImage: null,
    firstImage: null,
    secondImage: null,
    thirdImage: null,
    fourthImage: null,
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // images preview
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    if (file) {
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview((prev) => ({
          ...prev,
          [name]: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  ///////////  convert to Base64 //////////////

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  //////////////// Uploding Data /////////////


  const handlesubmit = async (e) => {
    e.preventDefault();

    // const data = new FormData();
    // data.append("productName", formData.productName);
    // data.append("price", formData.price);
    // data.append("qty", formData.qty);
    // data.append("category", formData.category);
    // data.append("subCategory", formData.subCategory);
    // data.append("material", formData.material);
    // data.append("color", formData.color);
    // data.append("length", formData.length);
    // data.append("width", formData.width);
    // data.append("weight", formData.weight);
    // data.append("printWork", formData.printWork);
    // data.append("occasion", formData.occasion);
    // data.append("packContain", formData.packContain);

    // data.append("mainImage", formData.mainImage);
    // data.append("firstImage", formData.firstImage);
    // data.append("secondImage", formData.secondImage);
    // data.append("thirdImage", formData.thirdImage);
    // data.append("fourthImage", formData.fourthImage);
    const mainI = await convertToBase64(formData.mainImage);
    const firstI = await convertToBase64(formData.firstImage);
    const secondI = await convertToBase64(formData.secondImage);
    const thirdI = await convertToBase64(formData.thirdImage);
    const fourthI = await convertToBase64(formData.fourthImage);

    const data = {
      productName: formData.productName,
      price: formData.price,
      qty: formData.qty,
      category: formData.category,
      subCategory: formData.subCategory,
      material: formData.material,
      color: formData.color,
      length: formData.length,
      width: formData.width,
      weight: formData.weight,
      printWork: formData.printWork,
      occasion: formData.occasion,
      packContain: formData.packContain,

      mainImage: mainI,
      firstImage: firstI,
      secondImage: secondI,
      thirdImage: thirdI,
      fourthImage: fourthI,
    };

    try {
      // const response = await fetch("http://localhost:3001/sadeeData", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });

      // if (!response.ok) {
      //   throw new Error("Server Error: " + response.status);
      // }

      // await response.json();
      let result = null;

      switch (p_category) {
        case "FashionIsta Product's":
          result = authService_myPro.uploadFashion(data);
          break;
        case "Saree":
          result = authService_sadee.uploadSadee(data);
          break;
        case "Accessories":
          result = authService_accessories.uploadAccessaries(data);
          break;
      }

      // return result;

      setFormData({
        productName: "",
        price: "",
        qty: "",
        category: "",
        subCategory: "",
        material: "",
        color: "",
        length: "",
        width: "",
        weight: "",
        printWork: "",
        occasion: "",
        packContain: "",

        mainImage: null,
        firstImage: null,
        secondImage: null,
        thirdImage: null,
        fourthImage: null,
      });
      if (result) {
        alert("Product Add successful..!");
        navigate("/Home");
      }
    } catch (error) {
      console.error("Error Creating User:", error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      <Header />

      {isChecked ? <Admin_Header /> : null}

      {/* <div className="page-contaiter"> */}

      {/*Content*/}
      <section className="sec-padding">
        <div className="container">
          <div className="row justify-content-around"></div>
          {/*  */}
          <div className="col-md-12">
            <div className="my-account-box mb-4 rounded-4 shadow">
              <h1>Upload {p_category}</h1>
              <br></br>
              {/* <div class="row "> */}
              <div className="col-md-12" style={{ border: "0px solid black" }}>
                {/* <h2>Login</h2> */}
                <a>
                  <b>Product Information</b>
                </a>
                <form>
                  <div className="row mt-2">
                    <div className="col-md-3 mb-3">
                      <label htmlFor="ProductName" className="form-label">
                        Product Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="productName"
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-3 mb-3">
                      <label htmlFor="price" className="form-label">
                        Price <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        name="price"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="qty" className="form-label">
                        QTY <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        name="qty"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  
                  </div>

                  <hr />

                  {/* Product Discription */}
                  <a>
                    <b>Product Discription</b>
                  </a>

                  <div className="row mt-2 ">
                    <div className="col-md-3 mb-3">
                      <label htmlFor="category" className="form-label">
                        Category <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="category"
                        value={p_category}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="subcategory" className="form-label">
                        Sub-Category <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="subCategory"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="material" className="form-label">
                        Material <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="material"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="color" className="form-label">
                        Color <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="color"
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-3 mb-3">
                      <label htmlFor="length" className="form-label">
                        Length <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="length"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="width" className="form-label">
                        Width <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="width"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="weight" className="form-label">
                        Weight <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="weight"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="weight" className="form-label">
                        Print / Work <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        name="printWork"
                        onChange={handleInputChange}
                        value={formData.printWork || ""} // controlled component
                        required
                      >
                        <option value="">-- Select --</option>
                        <option value="print">Print</option>
                        <option value="work">Work</option>
                      </select>
                    </div>

                    <div className="col-md-12 mb-3">
                      <label htmlFor="description" className="form-label">
                        Discription <span className="text-danger">*</span>
                      </label>
                      <textarea
                        type="text"
                        className="form-control form-control-lg"
                        name="description"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <hr />

                  {/* Other Information's */}
                  <a>
                    <b>Other Information's</b>
                  </a>
                  {/*  */}
                  <div className="row mt-2">
                    <div className="col-md-3 mb-3">
                      <label htmlFor="occasion" className="form-label">
                        Occasion <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg "
                        name="occasion"
                        onChange={handleInputChange}
                        placeholder="Daily/Office/Festive/Party"
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="packContain" className="form-label">
                        Pack Contain's <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg "
                        name="packContain"
                        onChange={handleInputChange}
                        placeholder="Qty in Pack..?"
                        required
                      />
                    </div>
                  </div>

                  <hr />
                  {/* Start Image Uploding  */}
                  <a>
                    <b>Upload Image's</b>
                  </a>
                  {/*  */}
                  <div className="row mt-2">
                    <div className="col-md-3 mb-3">
                      <label htmlFor="mainImage" className="form-label">
                        Main Image <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        name="mainImage"
                        onChange={handleFileChange}
                        className=" form-control"
                        required
                      ></input>
                      {preview && (
                        <img
                          src={preview.mainImage}
                          alt="preview"
                          width="200"
                          height="200"
                        />
                      )}
                    </div>

                    <div className="col-md-2 mb-3">
                      <label htmlFor="firstImage" className="form-label">
                        First Image <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        name="firstImage"
                        accept="image/*"
                        onChange={handleFileChange}
                        className=" form-control"
                      ></input>
                      {preview && (
                        <img
                          src={preview.firstImage}
                          alt="preview"
                          width="200"
                          height="200"
                        />
                      )}
                    </div>
                    <div className="col-md-2 mb-3">
                      <label htmlFor="secondImage" className="form-label">
                        Second Image <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        name="secondImage"
                        onChange={handleFileChange}
                        className=" form-control "
                      ></input>
                      {preview && (
                        <img
                          src={preview.secondImage}
                          alt="preview"
                          width="200"
                          height="200"
                        />
                      )}
                    </div>
                    <div className="col-md-2 mb-3">
                      <label htmlFor="thirdImage" className="form-label">
                        Third Image <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        name="thirdImage"
                        onChange={handleFileChange}
                        className=" form-control "
                      ></input>
                      {preview && (
                        <img
                          src={preview.thirdImage}
                          alt="preview"
                          width="200"
                          height="200"
                        />
                      )}
                    </div>
                    <div className="col-md-2 mb-3">
                      <label htmlFor="fourthImage" className="form-label">
                        Fourth Image <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        name="fourthImage"
                        onChange={handleFileChange}
                        className=" form-control "
                      ></input>
                      {preview && (
                        <img
                          src={preview.fourthImage}
                          alt="preview"
                          width="200"
                          height="200"
                        />
                      )}
                    </div>
                  </div>

                  <hr />

                  <div className="mb-3">
                    <button
                      type="submit"
                      className="btn btn-outline-primary btn-lg button"
                      name="login"
                      onClick={handlesubmit}
                      value="Log in"
                    >
                      <b>Upload Data</b>
                    </button>
                  </div>
                </form>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </section>
      {/*End Content*/}
      {/* </div> */}

      <Footer />
    </>
  );
};

export default Upload_products;
