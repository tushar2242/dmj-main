import React, { useEffect, useState } from "react";
import HeaderCon from "../header/HeaderCon";
import Navbar from "../header/Navbar";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./Productdetail.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import TwitterIcon from "@mui/icons-material/Twitter";
import axios from "axios";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { NavLink, useLocation } from "react-router-dom";
import Footer from "../footer/Footer";
import Loader from "../loader/Loader";
import { ProductCard } from "../carousel/CarouselForHome";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
// import './App.css'
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";
import ReactImageMagnify from "react-image-magnify";
import ShareIcon from "@mui/icons-material/Share";
import img1 from "../../assets/images/earring.jpg";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import StarsIcon from "@mui/icons-material/Stars";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import deliveryicon from "../../assets/images/delivery.png";
import payicon from "../../assets/images/payicon.png";
import exchange from "../../assets/images/exchange.png";


const url = "http://137.184.3.191:8080/DMJ/";
const endPoint = "api/v1/products/";
const productEndPoint = "api/v1/products";


const ProductDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
      <HeaderCon />
      <Navbar />
      <Product />
      <Footer />
    </>
  );
};
const responsive1 = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1022 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1020, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function Product() {
  const [quantity, setQuantity] = useState(1);
  const [showDescription, setShowDescription] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [apiCheck, setApiCheck] = useState(false);

  const [itemInfo, setItemInfo] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  const handleDescriptionClick = () => {
    setShowDescription(true);
    setShowReview(false);
  };

  const handleReviewClick = () => {
    setShowDescription(false);
    setShowReview(true);
  };
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handeldec = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const fetchData = async () => {
    const id = localStorage.getItem("productId");
    try {
      const res = await axios.get(url + endPoint + id);
      setItemInfo(res.data.data);
      // console.log(url+'images/' +itemInfo.thum_image+id)
      setIsLoad(false);
    } catch (err) {
      console.log(err);
      setIsLoad(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const handleImageClick = (image) => {
    // console.log(image);
    setSelectedImage(image.url);
  };

  const location = useLocation();
  const productId = location.state?.id;

  // console.log(productId)
  // console.log(id)

  return (
    <>
      {!isLoad ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 mt-5">
              <div className="product-display stk-box-item">
                <div className="carouselmini">
                  <div className="upperSmallCarousel mobile-view-dply">
                    <Swiper
                      direction={"vertical"}
                      slidesPerView={5}
                      pagination={{
                        clickable: true,
                      }}
                      Navigation={true}
                      modules={[Navigation, Pagination]}
                      className="mySwiper"
                    >
                      {!isLoad &&
                        itemInfo.pictures.map((image, index) => (
                          <div
                            key={index}
                            className="smalCarouselimg"
                            onClick={() => handleImageClick(image)}
                          >
                            <img
                              src={url + "images/" + image}
                              alt={`Image ${index + 1}`}
                            />
                          </div>
                        ))}
                    </Swiper>
                  </div>
                </div>

                <ReactImageMagnify
                  style={{ zIndex: "5",maxWidth:'400px',width:'100%' }}
                  {...{
                    smallImage: {
                      alt: "product image",
                      // isFluidWidth: true,
                      height: 480,
                      width: 440,

                      src: url + "images/" + itemInfo.thum_image,
                    },
                    largeImage: {
                      src: url + "images/" + itemInfo.thum_image,
                      width: 1200,
                      height: 1800,
                    },
                    enlargedImageContainerDimensions: {
                      width: "200%",
                      height: "120%",
                    },
                    isHintEnabled: true,
                  }}
                />
              </div>
            </div>
            <div className="col-md-6 mt-5">
              <div className="pt-mob-view">
                <ProductPrice />

                <div className="mt-2" style={{ display: "flex" }}>
                  <div>
                    <button className="add-to-cart-btn-sz">
                      <LocalMallIcon /> ADD To CART
                    </button>
                  </div>
                  <div>
                    <button className="wishlist-btn-sz">
                      <FavoriteBorderIcon /> WISHLIST
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="chk-del-date">Check delivery options</h4>
                  <form className="d-flex">
                    <input
                      className="form-control me-2 pin-box-int"
                      type="text"
                      placeholder="Enter your zipcode"
                    />
                    <button className="check-btn-del" type="submit">
                      Check
                    </button>
                  </form>
                  <p className="zip-code-fnt">
                    Please enter PIN code to check delivery time & Pay on Delivery
                    Availability
                  </p>
                  <div>
                    <DeliveryIcon
                      icon={deliveryicon}
                      title="Get it by Sun, Aug 27"
                    />
                    <DeliveryIcon
                      icon={payicon}
                      title="Pay on delivery available"
                    />
                    <DeliveryIcon
                      icon={exchange}
                      title="Easy 14 days return & exchange available"
                    />
                  </div>
                </div>
                <p className="tagline-line"></p>
                <OfferDetails />
                <p className="tagline-line"></p>
                <div className="mt-3">
                  <DetailsBox />

                  <div>
                    <button className="add-to-cart-btn-sz w-100">Buy Now</button>
                  </div>
                  <p className="tagline-line"></p>
                  <RatingBox />

                  <p className="tagline-line"></p>

                  <RatingComment />

                  <p className="tagline-line"></p>
                  <h6 className="text-primary">
                    <b>All 150 reviews</b>
                  </h6>

                  <RatingForm />
                </div>
              </div>
            </div>
          </div>

          <div className="bottomdetails">
            <div className="lowerCarousel">
              <p className="mt-3">
                <b>Related Products</b>
              </p>
            </div>

            <RelatedProduct />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default ProductDetails;

const ProductPrice = () => {
  return (
    <>
      <div>
        <h2 className="pro-detail-heading">Lorem, ipsum.</h2>
        <p className="pro-dt-para">Lorem Ipsum Dolor Sit Amet.</p>
        <div className="rate-icon-box">
          <p>
            <b>4.5</b> <i className="bi bi-star-fill rate-icon-col"></i> | 1.2K
            Ratings
          </p>
        </div>
      </div>
      <p className="tagline-line"></p>

      <h4 className="price">
        MRP : $6000
        <span
          style={{
            textDecoration: "line-through",
            marginLeft: "8px",
            fontSize: "14px",
            color: "#7a7a7a",
          }}
        >
          $8000
        </span>{" "}
        <span className="off-font">( 75% OFF )</span>
      </h4>
      <p className="tax-font">inclusive of all taxes</p>

      <p className="col-fnt-sz offer-heading-txt">MORE COLORS</p>

      <div>
        <img src={img1} alt="Product" className="pro-color-img" />
        <img src={img1} alt="Product" className="pro-color-img" />
        <img src={img1} alt="Product" className="pro-color-img" />
        <img src={img1} alt="Product" className="pro-color-img" />
        <img src={img1} alt="Product" className="pro-color-img" />
      </div>
      <p className="col-fnt-sz mt-4 offer-heading-txt">SELECT SIZE</p>

      <div style={{ display: "flex" }}>
        <p className="sel-size">2.2</p>
        <p className="sel-size" style={{ marginLeft: "8px" }}>
          2.4
        </p>
        <p className="sel-size" style={{ marginLeft: "8px" }}>
          2.6
        </p>
        <NotAvailable />
      </div>
    </>
  );
};

const NotAvailable = () => {
  return (
    <>
      <div className="out-stock" style={{ marginLeft: "8px" }}>
        <p className="">
          2.8
        </p>

      </div>
    </>
  );
}
const DetailsBox = () => {
  return (
    <>
      <h5 className="offer-heading-txt">
        <b>Product Details</b>
      </h5>
      <p className="pro-dtl-ft-sz">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab debitis
        quidem alias vero officia molestias! Lorem ipsum dolor sit, amet
        consectetur adipisicing elit. Magni consectetur fuga dolorum sapiente
        eum quod cumque voluptatem, labore modi ex.
      </p>
      <ul className="pro-dtl-ft-sz">
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, minus.</li>
      </ul>
      <ol className="pro-dtl-ft-sz">
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, dolores!</li>
      </ol>
      <h6 className="offer-heading-txt">
        <b>Size & Fit</b>
      </h6>
      <p className="pro-dtl-ft-sz">Length: 2.2 cm</p>
      <h6 className="offer-heading-txt">
        <b>Material & Care</b>
      </h6>
      <p className="pro-dtl-ft-sz">Material: Alloy</p>
      <p className="pro-dtl-ft-sz mate-mg-tp">Plating: Gold plated</p>
      <p className="pro-dtl-ft-sz mate-mg-tp">Stone type: American diamond</p>
      <p className="pro-dtl-ft-sz mate-mg-tp">
        Wipe with a clean cotton swab when needed
      </p>
      <h6 className="offer-heading-txt">
        <b>Specifications</b>
      </h6>
      <div className="product-display">
        <div>
          <p className="spe-p-tag">Occasion</p>
          <h6 className="pro-dtl-ft-sz mate-mg-tp">
            <b>Western</b>
          </h6>
          <hr className="w-100" />
        </div>
        <div style={{ marginLeft: "50px" }}>
          <p className="spe-p-tag">Base Metal</p>
          <h6 className="pro-dtl-ft-sz mate-mg-tp">
            <b>Alloy</b>
          </h6>
          <hr className="w-100" />
        </div>
      </div>
    </>
  );
};

const RatingBox = () => {
  return (
    <>
      <h5 className="mt-3 offer-heading-txt">
        <b>Ratings</b> <StarsIcon />
      </h5>
      <div className="d-flex justify-content-evenly">
        <div>
          <h5 className="rating-fnt-sz-1 mt-4">
            4.5{" "}
            <i
              className="bi bi-star-fill fs-4"
              style={{ color: "#b79d33" }}
            ></i>
          </h5>
          <p className="pro-dtl-ft-sz">1.2K Verified Buyers</p>
        </div>

        <div>
          <div>
            <p className="pro-dtl-ft-sz">
              <span>50</span>{" "}
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
            </p>
            <p className="pro-dtl-ft-sz" style={{ marginTop: "-11px" }}>
              <span>45</span>{" "}
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star" style={{ color: "#b79d33" }}></i>
            </p>
            <p className="pro-dtl-ft-sz" style={{ marginTop: "-11px" }}>
              <span>35</span>{" "}
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star" style={{ color: "#b79d33" }}></i>
            </p>
            <p className="pro-dtl-ft-sz" style={{ marginTop: "-11px" }}>
              <span>14</span>{" "}
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star" style={{ color: "#b79d33" }}></i>
            </p>
            <p className="pro-dtl-ft-sz" style={{ marginTop: "-11px" }}>
              <span>5</span>{" "}
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star" style={{ color: "#b79d33" }}></i>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const RatingComment = () => {
  return (
    <>
      <div className="d-flex">
        <p className="rating-box-1">
          4.5 <i className="bi bi-star-fill rating-icon-sz"></i>
        </p>
        <p className="pro-dtl-ft-sz ms-2 mt-1">Perfect Product</p>
      </div>
      <p className="pro-dtl-ft-sz">This is an amazing Product to begin with.</p>
      <div>
        <img src={img1} alt="Product" className="pro-color-img" />
      </div>
      <div className="user-cmt-bx mt-3">
        <div className="d-flex">
          <p className="pro-dtl-ft-sz">
            Tina Singh <i className="bi bi-check-circle-fill text-muted"></i>
          </p>
          <p className="pro-dtl-ft-sz ms-1">
            Certified Buyer, Mysore 10 months ago
          </p>
        </div>
        <div className="d-flex">
          <p className="like-fnt-icon">
            450 <ThumbUpIcon className="lk-icon-sz" />{" "}
          </p>
          <p className="ms-2 like-fnt-icon">
            15 <ThumbDownIcon className="lk-icon-sz" />
          </p>
        </div>
      </div>
    </>
  );
};

const RatingForm = () => {
  return (
    <>
      <div className="pro-rev-box-1 mt-4">
        <form action="">
          <h5 className="offer-heading-txt">
            <b>Rate Product</b>
          </h5>
          <Stack spacing={1}>
            <Rating
              className="cmt-rev-box"
              name="half-rating"
              defaultValue={5}
              precision={0.5}
            />
          </Stack>
          <label htmlFor="" className="form-label mt-3 cmt-rev-fnt">
            Your Review
          </label>
          <textarea
            name=""
            id=""
            cols="10"
            rows="4"
            className="form-control cmt-rev-input"
          ></textarea>
          <label htmlFor="" className="form-label mt-3 cmt-rev-fnt">
            Name
          </label>
          <input type="text" className="form-control cmt-rev-input" />
          <label htmlFor="" className="form-label mt-3 cmt-rev-fnt">
            Email
          </label>
          <input type="email" className="form-control cmt-rev-input" />
          <label htmlFor="" className="form-label mt-3 cmt-rev-fnt">
            Product
          </label>
          <input type="file" className="form-control cmt-rev-input" />
          <div>
            <button className="cmt-rev-box-smt">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

const DeliveryIcon = (props) => {
  return (
    <>
      <div className="d-flex">
        <img src={props.icon} alt="icon" className="img-fluid pro-icn-sz-1" />
        <p className="pro-icn-para ms-2 mt-1">{props.title}</p>
      </div>
    </>
  );
};

const OfferDetails = () => {
  return (
    <>
      <div>
        <h5 className="offer-heading-txt">
          <b>BEST OFFERS</b>
        </h5>
        <h6 className="offer-heading-txt">
          <b>
            Best Price: <span className="offer-price">Rs. 347</span>{" "}
          </b>
        </h6>
        <ul className="offer-list-fnt">
          <li>Coupon code: DMJ200</li>
          <li>Coupon Discount: Rs. 77 off (check cart for final savings)</li>
          <li>Applicable on: Orders above Rs. 1099 (only on first purchase)</li>
        </ul>
        <p className="offer-price">
          <b>View Eligible Products</b>
        </p>
        <h6 className="offer-heading-txt">
          <b>7.5% Instant Discount on Myntra Kotak Credit Card.</b>
        </h6>
        <ul className="offer-list-fnt">
          <li>Max Discount Up to ₹750 on every spends.</li>
        </ul>
        <p className="offer-price">
          <b>Terms & Condition</b>
        </p>
        <h6 className="offer-heading-txt">
          <b>UpTo ₹500 Cashback on CRED pay UPI transactions.</b>
        </h6>
        <ul className="offer-list-fnt">
          <li>Min Spend ₹1,000. Available only on Android Devices.</li>
        </ul>
        <p className="offer-price">
          <b>Terms & Condition</b>
        </p>
        <h6 className="offer-heading-txt">
          <b>EMI option available</b>
        </h6>
        <ul className="offer-list-fnt">
          <li>EMI starting from Rs.20/month</li>
        </ul>
      </div>
    </>
  );
};

const RelatedProduct = () => {
  const [relatedProduct, setReletedProduct] = useState([]);

  async function fetchData() {
    try {
      const res = await axios.get(url + productEndPoint);
      console.log(res.data.data);
      setReletedProduct(res.data.data.order);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {relatedProduct ? (
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive1}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          keyBoardControl={false}
          customTransition="all .5s"
          transitionDuration={500}
          containerClass="carousel-container"
          // removeArrowOnDeviceType={[ "tablet"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-10-px"
        >
          {relatedProduct.map((item) => {
            // console.log(image)
            return (
              <ProductCard
                key={item.id}
                img={url + "images/" + item.thum_image}
                name={item.seo_title}
                category={item.name}
                id={item.id}
                price={item.price}
              />
            );
          })}
        </Carousel>
      ) : (
        "loading.."
      )}
    </>
  );
};
