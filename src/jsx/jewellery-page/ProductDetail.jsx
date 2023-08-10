

import React, { useEffect, useState } from 'react';
import HeaderCon from '../header/HeaderCon';
import Navbar from '../header/Navbar';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './Productdetail.css'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
// import TwitterIcon from '@mui/icons-material/Twitter';
import axios from 'axios';
import "react-multi-carousel/lib/styles.css";
import Carousel from 'react-multi-carousel';
import { NavLink, useLocation } from 'react-router-dom';
import Footer from '../footer/Footer';
import Loader from '../loader/Loader';
import { ProductCard } from '../carousel/CarouselForHome';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Navigation, Pagination } from 'swiper/modules';




const url = 'http://137.184.3.191:8080/DMJ/';
const endPoint = 'api/v1/products/';
const productEndPoint = 'api/v1/products';



const ProductDetails = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <>
      <HeaderCon />
      <Navbar />
      <Product />
      <Footer />
    </>
  )
}
const responsive1 = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1022 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1020, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};




function Product() {


  const [quantity, setQuantity] = useState(1)
  const [showDescription, setShowDescription] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [apiCheck, setApiCheck] = useState(false)

  const [itemInfo, setItemInfo] = useState([]);
  const [isLoad, setIsLoad] = useState(true)
  const [pinCode, setPinCode] = useState();

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




  useEffect(() => {
    axios.get('https://api.slingacademy.com/v1/sample-data/photos')
      .then(response => {

        setImages(response.data.photos);
      })
      .catch(error => {
        console.error('Error fetching API data:', error);
      });
  }, []);



  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4
    }
  };


  const fetchData = async () => {
    const id = localStorage.getItem('productId')
    try {
      const res = await axios.get(url + endPoint + id)
      setItemInfo(res.data.data)
      setIsLoad(false)
    }
    catch (err) {
      console.log(err)
      setIsLoad(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData()
  }, []);







  const handleImageClick = (image) => {

    setSelectedImage(image.url);
  };



  const location = useLocation();
  const productId = location.state?.id;


  return (
    <>

      {!isLoad ? <div className="MainDiv">
        {/* <div className="topPart">
          <div className="img">
            {selectedImage ? <img src={selectedImage} alt="Item 2" className='CarouselImageTop' />
              : <img src={url + 'images/' + itemInfo.thum_image} className='CarouselImageTop' alt="Item 2" />}

            <div className="carouselmini">
              <div className="upperSmallCarousel">
                <Carousel
                  swipeable={true}
                  draggable={true}
                 
                  responsive={responsive}
                  ssr={true}
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={2000}
                  keyBoardControl={true}
                  customTransition="all .5s"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
                  dotListClass=""
                  itemClass="carousel-item-padding-10-px"
                >

                  {!isLoad && itemInfo.pictures.map((image, index) => (
                    <div key={index} className='smalCarouselimg'
                      onClick={() => handleImageClick(image)}
                    >
                      <img src={url + 'images/' + image} alt={`Image ${index + 1}`}

                      />
                    </div>
                  ))}
                  
                </Carousel>
              </div>

            </div>

          </div>
          <div className="details">
            <h1>{itemInfo.name}</h1>
            <div className="stars d-flex">
              <div>
                <i className="bi bi-star-fill" style={{ color: '#0227bd' }}></i>
                <i className="bi bi-star-fill" style={{ color: '#0227bd' }}></i>
                <i className="bi bi-star-fill" style={{ color: '#0227bd' }}></i>
                <i className="bi bi-star-fill" style={{ color: '#0227bd' }}></i>
                <i className="bi bi-star-half" style={{ color: '#0227bd' }}></i>
              </div> <span className="sp-rv-name ms-2">(1 customer review)</span>

            </div>
            <h4 className="price mt-2"> <span style={{ textDecoration: 'line-through', marginRight: '15px' }}>$8000</span>{itemInfo.price}</h4>
            <div className="para">
              <p>  36 people are watching right now</p>
              <p>{itemInfo.description}</p>
            </div>
            <div className="quantitydiv">
              <div className="upperButton">
                <RemoveIcon onClick={handeldec} /> <span>{quantity}</span>  <AddIcon onClick={handleIncrement} />
                <NavLink to="/addToCart" className="text-decoration-none"><div className="buttons">
                  <button>Add to Cart </button>
                </div></NavLink>
                <FavoriteBorderIcon style={{ color: 'black' }} />
              </div>


              <NavLink to="/checkout" className="text-decoration-none"><div className="buybutton">

                <button>Buy Now</button>
              </div></NavLink>

              <div className="icons">
                <p className="mt-3"><b>Guaranteed Safe Gateway</b> </p>
              </div>
              <p><LocalShippingIcon style={{ color: 'black' }} /> Free shipping worldwide on all orders over 100$</p>
              <p><CalendarMonthOutlinedIcon style={{ color: 'black' }} /> Deliver in: 3-7 working days <span style={{ textDecoration: 'underline' }}>shipping & return</span>
              </p>
              <hr />
              <div className="categorydetails">
                <p>SKU : {itemInfo.sku}</p>
                <p>Category:{itemInfo.type}</p>
                <p>Tags:Hot, Trend</p>
                <p>Share:  <FacebookTwoToneIcon /><TwitterIcon /></p>
              </div>
            </div>

          </div>


        </div> */}



        <div className="topPart">
          <div className="img">
            <div className="carouselmini">
              <div className="upperSmallCarousel">
                <Swiper
                  direction={'vertical'}
                  slidesPerView={5}
                  pagination={{
                    clickable: true,
                  }}
                  Navigation={true}


                  modules={[Navigation, Pagination]}
                  className="mySwiper"
                >

                  {images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="smallCarouselImg"
                        onClick={() => handleImageClick(image)}
                      >
                        <img src={image.url} alt={`Image ${index + 1}`} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

            </div>

            <div className="magnifier" >
              {selectedImage ?


                <ReactImageMagnify style={{ zIndex: '5' }}
                  {...{
                    smallImage: {
                      alt: 'Wristwatch by Ted Baker London',
                      // isFluidWidth: true,
                      height: 505,
                      width: 340,


                      src: selectedImage,

                    },
                    largeImage: {
                      src: selectedImage,
                      width: 1200,
                      height: 1800,
                    },
                    enlargedImageContainerDimensions: {
                      width: '200%',
                      height: '120%',
                    },
                    isHintEnabled: true,

                  }}
                />





                // <img src={selectedImage} alt="Item 2" />
                : <img src="https://www.pearlparadise.com/cdn/shop/collections/8e2fb98a007d24ba4cd42242806ed893_2c612848-dd0d-48ca-aec5-b1f9aa638cf0.jpg?v=1593615774" alt="Item 2" />}


            </div>


          </div>
          <div className="details">
            <div className="productHeading">
              <h1>Pearls Earings</h1>
            </div>
            <div className="stars">
              <StarOutlineIcon style={{ color: '#d38916' }} /><StarOutlineIcon style={{ color: '#d38916' }} /><StarOutlineIcon style={{ color: '#d38916' }} /><StarOutlineIcon style={{ color: '#d38916' }} /><StarHalfIcon style={{ color: '#d38916' }} />(1 customer review)



            </div>
            <h4 className="price"> <span style={{ textDecoration: 'line-through', marginRight: '40px' }}>$8000  </span>    $5000</h4>
            <div className="para">
              <p className='watchingText'>  36 people are watching right now</p>
              <p>Lorem ipsum dolor sit amet consec tetur adipisicing elit. Maiores delectus rem repellendus ea! Aliquam, consectetur.</p>
            </div>
            <div className="quantitydiv">
              <div className="upperButton">
                <RemoveIcon onClick={handeldec} style={{ color: 'black', border: '2px solid black', padding: '5px' }} /> <span className='quantity' style={{ fontSize: '20px' }}>{quantity}</span>  <AddIcon onClick={handleIncrement} style={{ color: 'black', border: '2px solid black', padding: "5px" }} />
                <div className="buttons">
                  <button>Add to Cart </button>
                </div>
                <FavoriteBorderIcon style={{ color: 'black', border: '2px solid black', padding: '5px' }} />
              </div>


              <div className="buybutton">

                <button>Buy Now</button>
              </div>

              <div className="pinCodeCheck">
                <h4>check your pin code</h4>
                <div className="inputs">
                  <input type="text" placeholder='enter pincode' value={pinCode} onChange={(e) => setPinCode(e.target.value)} />

                  <button className="pinCheck">Check</button>
                </div>
              </div>
              <div className="icons">
                <svg enableBackground="new 0 0 780 500" height="500" viewBox="0 0 780 500" width="780" xmlns="http://www.w3.org/2000/svg"><path d="m449.01 250c0 99.143-80.371 179.5-179.51 179.5s-179.5-80.361-179.5-179.5c0-99.133 80.362-179.5 179.5-179.5 99.137 0 179.51 80.371 179.51 179.5" fill="#d9222a" /><path d="m510.49 70.496c-46.379 0-88.643 17.596-120.5 46.467-6.49 5.889-12.548 12.237-18.125 18.996h36.267c4.965 6.037 9.536 12.387 13.685 19.012h-63.635c-3.827 6.122-7.281 12.469-10.342 19.008h84.313c2.894 6.185 5.431 12.53 7.601 19.004h-99.513c-2.09 6.234-3.832 12.58-5.217 19.008h109.94c2.689 12.49 4.045 25.231 4.042 38.008 0 19.935-3.254 39.112-9.254 57.021h-99.513c2.164 6.477 4.7 12.824 7.596 19.008h84.316c-3.063 6.541-6.519 12.889-10.347 19.013h-63.625c4.147 6.62 8.719 12.966 13.685 18.996h36.259c-5.57 6.772-11.63 13.127-18.13 19.013 31.857 28.866 74.117 46.454 120.5 46.454 99.139 0 179.51-80.361 179.51-179.5 0-99.129-80.371-179.5-179.51-179.5" fill="#ee9f2d" /><path d="m666.07 350.06c0-3.199 2.592-5.801 5.796-5.801s5.796 2.602 5.796 5.801-2.592 5.801-5.796 5.801-5.796-2.602-5.796-5.801zm5.796 4.408c2.434-.001 4.407-1.974 4.408-4.408 0-2.432-1.971-4.402-4.402-4.404h-.006c-2.429-.003-4.4 1.963-4.404 4.391v.014c-.002 2.433 1.968 4.406 4.4 4.408.001-.001.003-.001.004-.001zm-.783-1.86h-1.187v-5.096h2.149c.45 0 .908 0 1.305.254.413.279.646.771.646 1.279 0 .571-.338 1.104-.884 1.312l.938 2.25h-1.315l-.779-2.017h-.871zm0-2.89h.658c.246 0 .505.021.726-.1.195-.125.296-.359.296-.584-.005-.209-.112-.402-.288-.518-.207-.129-.536-.101
                -.758-.101h-.634zm-443.5-80.063c-2.046-.238-2.945-.301-4.35-.301-11.046 0-16.638 3.787-16.638 11.268 0 4.611 2.729 7.545 6.987 7.545 7.939 0 13.659-7.559 14.001-18.512zm14.171 32.996h-16.146l.371-7.676c-4.926 6.065-11.496 8.949-20.426 8.949-10.563 0-17.804-8.25-17.804-20.229 0-18.024 12.596-28.541 34.217-28.541 2.208 0 5.042.199 7.941.57.604-2.441.763-3.488.763-4.801 0-4.908-3.396-6.737-12.5-6.737-9.533-.108-17.396 2.271-20.625 3.333.204-1.229 2.7-16.659 2.7-16.659 9.712-2.846 16.116-3.917 23.325-3.917 16.732 0 25.596 7.513 25.579 21.712.033 3.805-.597 8.5-1.579 14.671-1.691 10.734-5.32 33.721-5.816 39.325zm-62.158 0h-19.487l11.162-69.997-24.925 69.997h-13.279l-1.642-69.597-11.733 69.597h-18.242l15.237-91.056h28.021l1.7 50.968 17.092-50.968h31.167zm354.97-32.996c-2.037-.238-2.941-.301-4.342-.301-11.041 0-16.634 3.787-16.634 11.268 0 4.611 2.726 7.545 6.983 7.545 7.94 0 13.664-7.559 13.993-18.512zm14.184 32.996h-16.146l.366-7.676c-4.926 6.065-11.5 8.949-20.422 8.949-10.565 0-17.8-8.25-17.8-20.229 0-18.024 12.588-28.541 34.213-28.541 2.208 0 5.037.199 7.934.57.604-2.441.763-3.488.763-4.801 0-4.908-3.392-6.737-12.496-6.737-9.533-.108-17.387 2.271-20.629 3.333.204-1.229 2.709-16.659 2.709-16.659 9.712-2.846 16.112-3.917 23.313-3.917 16.74 0 25.604 7.513 25.587 21.712.032 3.805-.597 8.5-1.579 14.671-1.684 10.734-5.321 33.721-5.813 39.325zm-220.39-1.125c-5.333 1.679-9.491 2.398-14 2.398-9.962 0-15.399-5.725-15.399-16.267-.142-3.271 1.433-11.88 2.671-19.737 1.125-6.917 8.449-50.529 8.449-50.529h19.371l-2.263 11.208h11.699l-2.642 17.796h-11.742c-2.25 14.083-5.454 31.625-5.491 33.95 0 
                3.816 2.037 5.483 6.671 5.483 2.221 0 3.94-.227 5.254-.7zm59.392-.6c-6.654 2.034-13.075 3.017-19.879 3-21.684-.021-32.987-11.346-32.987-33.032 0-25.313 14.38-43.947 33.899-43
                
                .947 15.971 0 26.171 10.433 26.171 26.796 0 5.429-.7 10.729-2.388 18.212h-38.574c-1.305 10.741 5.57 15.217 16.837 15.217 6.935 0 13.188-1.429 20.142-4.663zm-10.888-43.9c.107-1.543 2.055-13.217-9.013-13.217-6.171 0-10.583 4.704-12.38 13.217zm-123.42-5.017c0 9.367 4.542 15.826 14.842 20.676 7.892 3.709 9.112 4.81 9.112 8.17 0 4.617-3.479 6.701-11.191 6.701-5.813 0-11.221-.
                
                908-17.458-2.922 0 0-2.563 16.321-2.68 17.102 4.43.967 8.38 1.861 20.279 2.19 20.563 0 30.059-7.829 30.059-24.75 0-10.175-3.976-16.146-13.737-20.634-8.171-3.75-9.108-4.587-9.108-8.045 0-4.004 3.237-6.046 9.537-6.046 3.825 0 9.05.408 14 1.112l2.775-17.175c-5.046-.8-12.696-1.442-17.15-1.442-21.801.001-29.347 11.388-29.28 25.063m229.09-23.116c5.412 0 10.458 1.421 17.412 4.921l3.188-19.763c-2.854-1.121-12.904-7.7-21.417-7.7-13.041 0-24.065 6.471-31.82 17.15-11.309-3.746-15.958 3.825-21.657 11.367l-5.063 1.179c.383-2.483.729-4.95.612-7.446h-17.896c-2.445 22.917-6.778 46.128-10.171 69.075l-.884 4.976h19.496c3.254-21.143 5.037-34.68 6.121-43.842l7.341-4.084c1.097-4.078 4.529-5.458 11.417-5.291-.926 5.008-1.389 10.091-1.383 15.184 0 24.225 13.07 39.308 34.05 39.308 5.404 0 10.041-.712 17.221-2.658l3.43-20.759c-6.458 3.181-11.759 4.677-16.559 4.677-11.329 0-18.184-8.363-18.184-22.185 0-20.051 10.196-34.109 24.746-34.109" /><path d="m185.21 297.24h-19.491l11.171-69.988-24.926 69.988h-13.283l-1.642-69.588-11.733 69.588h-18.241l15.237-91.042h28.021l.788 56.362 18.904-56.362h30.267z" fill="#fff" /><path d="m647.52 211.6-4.321 26.309c-5.329-7.013-11.054-12.088-18.612-12.088-9.833 0-18.783 7.455-24.642 18.425-8.158-1.692-16.597-4.563-16.597-4.563l-.004.067c.658-6.134.921-9.875.862-11.146h-17.9c-2.438 22.917-6.771 46.128-10.157 69.075l-.893 4.976h19.492c2.633-17.096 4.648-31.291 6.133-42.551 6.658-6.016 9.992-11.266 16.721-10.916-2.979 7.205-4.725 15.503-4.725 24.017 0 18.513 9.366 30.725 23.533 30.725 7.142 0 12.621-2.462 17.967-8.171l-.913 6.884h18.435l14.842-91.042zm-24.371 73.941c-6.634 0
                -9.983-4.908-9.983-14.596 0-14.555 6.271-24.875 15.112-24.875 6.695 0 10.32 5.104 10.32 14.509.001 14.679-6.37 24.962-15.449 24.962z" /><path d="m233.19 264.26c-2.042-.236-2
                
                .946-.299-4.346-.299-11.046 0-16.634 3.787-16.634 11.266 0 4.604 2.729 7.547 6.979 7.547 7.947-.001 13.668-7.559 14.001-18.514zm14.178 32.984h-16.146l.367-7.663c-4.921 6.054-11.5 8.95-20.421 8.95-10.567 0-17.805-8.25-17.805-20.229 0-18.032 12.592-28.542 34.217-28.542 2.208 0 5.042.2 7.938.571.604-2.441.763-3.487.763-4.808 0-4.909-3.392-6.729-12.496-6.729-9.537-.108-17.396 2.271-20.629 3.321.204-1.225 2.7-16.637 2.7-16.637 9.708-2.858 16.12-3.929 23.32-3.929 16.737 0 25
                .604 7.517 25.588 21.704.029 3.821-.604 8.513-1.584 14.675-1.687 10.724-5.319 33.724-5.812 39.316zm261.38-88.592-3.191 19.767c-6.95-3.496-12-4.92-17.407-4.92-14.551 0-24.75 14.058-24.75 34.106 0 13.821 6.857 22.181 18.184 22.181 4.8 0 10.096-1.492 16.554-4.675l-3.421 20.75c-7.184 1.957-11.816 2.67-17.225 2.67-20.977 0-34.051-15.084-34.051-39.309 0-32.55 18.059-55.3 43.888-55.3 8.507.001 18.561 3.609 21.419 4.73m31.443 55.608c-2.041-.236-2.941-.299-4.347-.299-11.041 0-16.633 3.787-16.633 11.266 0 4.604 2.729 7.547 6.983 7.547 7.938-.001 13.663-7.559 13.997-18.514zm14.178 32.984h-16.15l.371-7.663c-4.925 6.054-11.5 8.95-20.421 8.95-10.563 0-17.804-8.25-17.804-20.229 0-18.032 12.596-28.542 34.212-28.542 2.213 0 5.042.2 7.941.571.601-2.441.763-3.487.763-4.808 0-4.909-3.393-6.729-12.495-6.729-9.533-.108-17.396 2.271-20.63 3.321.204-1.225 2.704-16.637 2.704-16.637 9.709-2.858 16.116-3.929 23.316-3.929 16.741 0 25.604 7.517 25.583 21.704.033 3.821-.596 8.513-1.579 14.675-1.682 10.724-5.323 33.724-5.811 39.316zm-220.39-1.121c-5.338 1.679-9.496 2.408-14 2.408-9.962 0-15.399-5.726-15.399-16.268-.138-3.279 1.438-11.88 2.675-19.736 1.12-6.926 8.445-50.534 8.445-50.534h19.368l-2.26 11.212h9.941l-2.646 17.788h-9.975c-2.25 14.092-5.463 31.62-5.496 33.95 0 3.83 2.041 5.482 6.671 5.482 2.221 0 3.938-.216 5.254-.691zm59.391-.592c-6.65 2.033-13.079 3.012-19.879 3-21.685-.021-32.987-11.
                346-32.987-33.033 0-25.321 14.379-43.95 33.899-43.95 15.971 0 26.171 10.429 26.171 26.8 0 5.434-.7 10.733-2.384 18.212h-38.574c-1.306 10.741 5.569 15.222 16.837 15.222 6.93 0 13.188-1.435 20.138-4.677zm-10.891-43.912c.116-1.538 2.06-13.217-9.013-13.217-6.167 0-10.579 4.717-12.375 13.217zm-123.42-5.005c0 9.367 4.542 15.818 14.842 20.675 7.892 3.709 9.112 4.812 9.112 8.172 0 4.616-3.483 6.699-11.188 6.699-5.816 0-11.225-.908-17.467-2.921 0 0-2.554 16.321-2.671 17.101 4.421.967 8.375 1.85 20.275 2.191 20.566 0 30.059-7.829 30.059-24.746 0-10.18-3.971-16.15-13.737-20.637-8.167-3.759-9.113-4.584-9.113-8.046 0-4 3.246-6.059 9.542-6.059 3.821 0 9.046.421 14.004 1.125l2.771-17.179c-5.042-.8-12.692-1.441-17.146-1.441-21.804 0-29.346 11.379-29.283 25.066m398.45 50.63h-18.438l.917-6.893c-5.347 5.717-10.825 8.18-17.968 8.18-14.166 0-23.528-12.213-23.528-30.726 0-24.63 14.521-45.392 31.708-45.392 7.559 0 13.279 3.087 18.604 10.096l4.325-26.308h19.221zm-28.746-17.109c9.075 0 15.45-10.283 15.45-24.953 0-9.405-3.629-14.509-10.325-14.509-8.837 0-15.115 10.315-15.115 24.875-.001 9.686 3.357 14.587 9.99 14.587zm-56.842-56.929c-2.441 22.917-6.773 46.13-10.162 69.063l-.892 4.976h19.491c6.972-45.275 8.658-54.117 19.588-53.009 1.742-9.267 4.982-17.383 7.399-21.479-8.163-1.7-12.721 2.913-18.688 11.675.471-3.788 1.333-7.467 1.162-11.225zm-160.42 0c-2.446 22.917-6.779 46.13-10.167 69.063l-.888 4.976h19.5c6.963-45.275 8.646-54.117 19.57-53.009 1.75-9.267 4.991-17.383 7.399-21.479-8.154-1.7-12.717 2.913-18.679 11.675.471-3.788 1.324-7.467 1
                
                .162-11.225zm254.57 68.241c-.004-3.199 2.586-5.795 5.784-5.799h.012c3.197-.004 5.793 2.586 5.796 5.783v.016c-.001 3.201-2.595 5.795-5.796 5.797-3.201-.002-5.795-2.596-5.796-5.797zm5.796 4.405c2.431.002 4.402-1.969 4.403-4.399v-.004c.003-2.433-1.968-4.406-4.399-4.408h-.004c-2.435.001-4.407 1.974-4.408 4.408.002 2.432 1.975 4.403 4.408 4.403zm-.784-1.871h-1.188v-5.082h2.153c.446 0 .909.009 1.296.254.417.283.654.767.654 1.274 0 .575-.337 1.112-.888 1.317l.941 2.236h-1.32l-.779-2.009h-.87zm0-2.879h.653c.246 0 .513.019.729-.1.196-.125.296-.361.296-.588-.009-.21-.114-.404-.287-.523-.204-.117-.542-.084-.763-.084h-.629z" fill="#fff" /></svg>
                <svg enableBackground="new 0 0 780 500" height="500" viewBox="0 0 780 500" width="780" xmlns="http://www.w3.org/2000/svg"><path d="m293.2 348.73 33.359-195.76h53.358l-33.384 195.76zm246.11-191.54c-10.569-3.966-27.135-8.222-47.821-8.222-52.726 0-89.863 26.551-90.181 64.604-.297 28.129 26.515 43.822 46.754 53.185 20.771 9.598 27.752 15.716 27.652 24.283-.133 13.123-16.586 19.115-31.924 19.115-21.355 0-32.701-2.967-50.225-10.273l-6.878-3.111-7.487 43.822c12.463 5.467 35.508 10.199 59.438 10.445 56.09 0 92.502-26.248 92.916-66.885.199-22.27-14.016-39.215-44.801-53.188-18.65-9.056-30.072-15.099-29.951-24.269 0-8.137 9.668-16.838 30.56-16.838 17.446-.271 30.088 3.534 39.936 7.5l4.781 2.259zm137.31-4.223h-41.23c-12.772 0-22.332 3.486-27.94 16.234l-79.245 179.4h56.031s9.159-24.121 11.231-29.418c6.123 0 60.555.084 68.336.084 1.596 6.854 6.492 29.334 6.492 29.334h49.512l-43.187-195.64zm-65.417 126.41c4.414-11.279 21.26-54.724 21.26-54.724-.314.521 4.381-11.334 7.074-18.684l3.606 16.878s10.217 46.729 12.353 56.527h-44.293zm-363.3-126.41-52.239 133.5-5.565-27.129c-9.726-31.274-40.025-65.157-73.898-82.12l47.767 171.2 56.455-.063 84.004-195.39-56.524-.001" fill="#0e4595" /><path d="m146.92 152.96h-86.041l-.682 4.073c66.939 16.204 111.23 55.363 129.62 102.42l-18.709-89.96c-3.229-12.396-12.597-16.096-24.186-16.528" fill="#f2ae14" /></svg>
                {/* <svg enableBackground="new 0 0 780 500" height="500" viewBox="0 0 780 500" width="780" xmlns="http://www.w3.org/2000/svg"><path d="m725 0h-670c-30.327 0-55 24.673-55 55v391c0 30.327 24.673 55 55 55h670c30.325 0 55-24.673 55-55v-391c0-30.327-24.675-55-55-55z" fill="#fff" /><path d="m168.38 169.85c-8.399-5.774-19.359-8.668-32.88-8.668h-52.346c-4.145 0-6.435 2.073-6.87 6.214l-21.265 133.48c-.221 1.311.107 2.51.981 3.6.869 1.093 1.962 1.636 3.271 1.636h24.864c4.361 0 6.758-2.068 7.198-6.216l5.888-35.985c.215-1.744.982-3.162 2.291-4.254 1.308-1.09 2.944-1.804 4.907-2.13 1.963-.324 3.814-.487 5.562-.487 1.743 0 3.814.11 6.217.327 2.397.218 3.925.324 4.58.324 18.756 0 33.478-5.285 44.167-15.866 10.684-10.577 16.032-25.244 16.032-44.004 0-12.868-4.202-22.192-12.597-27.975zm-26.99 40.08c-1.094 7.635-3.926 12.649-8.506 15.049-4.581 2.403-11.124 3.597-19.629 3.597l-10.797.328 5.563-35.007c.434-2.397 1.851-3.597 4.252-3.597h6.218c8.72 0 15.049 1.257 18.975 3.761 3.924 2.51 5.233 7.802 3.924 15.869z" fill="#003087" /><path d="m720.79 161.18h-24.208c-2.405 0-3.821 1.2-4.253 3.599l-21.267 136.1-.328.654c0 1.096.437 2.127 1.311 3.109.868.979 1.963 1.471 3.271 1.471h21.595c4.138 0 6.429-2.068 6.871-6.215l21.265-133.81v-.325c-.002-3.053-1.424-4.58-4.257-4.58z" fill="#009cde" /><path d="m428.31 213.86c0-1.088-.438-2.126-1.306-3.106-.875-.981-1.857-1.474-2.945-1.474h-25.191c-2.404 0-4.366 1.096-5.89 3.271l-34.679 51.04-14.394-49.075c-1.096-3.488-3.493-5.236-7.198-5.236h-24.54c-1.093 0-2.075.492-2.942 1.474-.875.98-1.309 2.019-1.309
                 2 1.635 3.271 1.635h26.826c2.617 0 4.361-1.416 5.235-4.252l5.89-37.949c.216-1.744.98-3.162 2.29-4.254 1.309-1.09 2.943-1.803 4.908-2.13 1.962-.324 3.812-.487 5.562-.487 1.743 0 3.814.11 6.214.327 2.399.218 3.931.324 4.58.324 18.76 0 33.479-5.285 44.168-15.866 10.688-10.577 16.031-25.244 16.031-44.004.002-12.867-4.199-22.191-12.594-27.974zm-33.534 53.82c-4.799 3.271-11.997 4.906-21.592 4.906l-10.47.328 5.562-35.007c.432-2.397 1.849-3.597 4.252-3.597h5.887c4.798 0 8.614.218 11.454.653 2.831.44 5.562 1.799 8.179 4.089 2.618 2.291 3.926 5.618 3.926 9.98 0 9.16-2.402 15.375-7.198 18.648z" fill="#009cde" /></svg> */}

                <svg enableBackground="new 0 0 780 500" height="500" viewBox="0 0 780 500" width="780" xmlns="http://www.w3.org/2000/svg"><path d="m216.4 69.791h142.39c19.87 0 32.287 16.406 27.63 36.47l-66.333 287.48c-4.656 20.063-24.629 36.47-44.498 36.47h-142.39c-19.87 0-32.287-16.406-27.63-36.47l66.331-287.48c4.657-20.168 24.526-36.47 44.395-36.47h.104z" fill="#d10429" /><path d="m346.34 69.791h163.82c19.867 0 10.865 16.406 6.209 36.47l-66.334 287.48c-4.658 20.063-3.209 36.47-23.078 36.47h-163.81c-19.972 0-32.287-16.406-27.527-36.47l66.334-287.48c4.656-20.168 24.524-36.47 44.498-36.47h-.104z" fill="#022e64" /><path d="m504.41 69.791h142.39c19.869 0 32.287 16.406 27.631 36.47l-66.334 287.48c-4.656 20.063-24.629 36.47-44.498 36.47h-142.39c-19.973 0-32.288-16.406-27.631-36.47l66.334-287.48c4.656-20.168 24.525-36.47 44.393-36.47z" fill="#076f74" />
                  <g fill="#fefefe"><path d="m480.5 340.81h13.453l3.828-13.063h-13.35zm10.762-35.95-4.658 15.467s5.072-2.613 7.865-3.449c2.795-.627 6.934-1.15 6.934-1.15l3.207-10.763h-13.451zm6.726-22.153-4.449 14.839s4.967-2.3 7.76-3.029c2.795-.732 6.934-.941 6.934-.941l3.207-10.764h-13.348zm29.7 0-17.385 57.997h4.656l-3.621 12.018h-4.658l-1.137 3.657h-16.559l1.139-3.657h-33.529l3.311-11.076h3.416l17.594-58.938 3.518-11.913h16.867l-1.76 5.956s4.449-3.239 8.797-4.39c4.244-1.148 28.666-1.566 28.666-1.566l-3.623 11.809h-5.795z" /><path d="m534.59 270.79h18.006l.207 6.792c-.102 1.149.828 1.672 3.002 1.672h3.621l-3.311 11.183h-9.729c-8.381.627-11.59-3.03-11.383-7.106l-.311-12.437zm2.217 53.2h-17.178l2.89
                
                
                -.619 2.194-1.137 3.867-2.793 5.33-1.76 1.463-3.725 3.03-8.484 3.03l-8.797.418-.104 7.942c-.104 2.193.518 1.984.828 2.402.414.418.723.523 1.137.732l2.795-.21 8.383-.417-3.52 11.704h-9.623c-6.727 0-11.797-.21-13.35-1.463-1.656-1.046-1.863-2.3-1.863-4.599l.621-31.141h15.42l-.207 6.374h3.725c1.242 0 2.174-.104 2.691-.418.516-.313.828-.836 1.035-1.567l1.551-5.016h
                
                
                2.109zm-219.37-156c-.517 2.508-10.451 48.592-10.451 48.592-2.174 9.3-3.726 15.989-8.9 20.273-3.001 2.508-6.52 3.657-10.555 3.657-6.52 0-10.245-3.239-10.866-9.404l-.104-2.09s1.966-12.436 1.966-12.54c0 0 10.349-42.009 12.212-47.548.103-.313.103-.522.103-.627-20.18.21-23.801 0-24.008-.313-.104.418-.621 3.03-.621 3.03l-10.556 47.34-.932 3.97-1.758 13.168c0 3.866.724 7.105 2.277 9.718 4.863 8.569 18.627 9.823 26.388 9.823 10.038 0 19.455-2.195 25.767-6.061 11.073-6.584 13.97-16.929 16.454-26.02l1.242-4.703s10.659-43.576 12.522-49.219c.103-.314.103-.523.207-.627-14.695.104-18.938 0-20.387-.314zm59.029 86.623c-7.141-.105-9.728-.105-18.11.313l-.311-.627c.724-3.24 1.552-6.374 2.173-9.614l1.035-4.389c1.552-6.792 3.001-14.839 3.208-17.242.207-1.463.62-5.12-3.519-5.12-1.759 0-3.518.835-5.38 1.671-1.036 3.658-3.002 13.899-4.037 18.497-2.07 9.823-2.173 10.972-3.104 15.78l-.621.626c-7.347-.104-9.934-.104-18.42.314l-.414-.732c1.449-5.852 2.794-11.704 4.14-17.556 3.518-15.78 4.45-21.84 5.38-29.887l.725-.418c8.279-1.149 10.245-1.463 19.248-3.239l.724.836-1.345 5.016c1.552-.94 3.001-1.881 4.553-2.613 4.243-2.09 8.9-2.717 11.487-2.717 3.932 0 8.279 1.15 10.038 5.748 1.656 4.075.62 9.091-1.656 19.019l-1.138 5.016c-2.277 11.077-2.69 13.062-3.933 20.586l-.827.627zm29.058.027c-4.346 0-7.14-.104-9.83 0-2.691 0-5.278.21-9.314.314l-.207-.314-.207-.418c1.138-4.18 1.656-5.643 2.277-7.106.517-1.463 1.034-2.926 2.07-7.21 1.241-5.539 2.069-9.405 2.586-12.854.621-3.24.932-6.06 1.346-9.3l.31-.209.31-.313c4.347-.627 7.038-1.045 9.832-1.463s5.691-.94 10.141-1.776l.207.418.103.418-2.482 10.345c-.828 3.449-1.656 6.897-2
                .38 10.346-1.554 7.315-2.277 10.032-2.587 12.017-.414 1.881-.519 2.822-1.14 6.584l-.414.313-.414.314zm45.941-25.675c-.31 1.881-1.966 8.883-4.139 11.809-1.553 2.194-3.312 3.55
                
                3-5.382 3.553-.62 0-4.14 0-4.242-5.33 0-2.612.517-5.33 1.138-8.255 1.863-8.465 4.14-15.466 9.831-15.466 4.451 0 4.76 5.225 2.794 13.689zm18.731.836c2.483-11.077.518-16.302-1.862-19.437-3.726-4.807-10.348-6.374-17.178-6.374-4.141 0-13.867.418-21.525 7.524-5.484 5.12-8.071 12.122-9.52 18.81-1.554 6.792-3.312 19.019 7.864 23.617 3.414 1.463 8.382 1.88 11.59 1.88 8.176 0 16.558-2.298 22.87-8.986 4.863-5.434 7.036-13.585 7.864-17.034zm174.43 26.08c-8.693-.104-11.176-
                104-19.145.314l-.518-.627c2.174-8.256 4.346-16.616 6.312-24.976 2.484-10.868 3.105-15.466 3.934-21.84l.619-.522c8.59-1.254 10.971-1.567 19.973-3.239l.207.731c-1.656 6.897-3.207 13.69-4.863 20.482-3.311 14.317-4.451 21.632-5.691 29.156l-.828.627z" /><path d="m547.75 224.16c-.414 1.776-2.07 8.882-4.242 11.808-1.449 2.09-4.967 3.449-6.934 3.449-.621 0-4.035 0-4.242-5.225 0-2.613.516-5.33 1.137-8.256 1.863-8.255 4.141-15.257 9.832-15.257 4.449 0 6.416 5.12 4.449 13.585zm17.076.836c2.482-11.077-7.658-.94-9.211-4.598-2.484-5.748-.932-17.243-10.865-21.109-3.83-1.568-12.832.418-20.49 7.524-5.381 5.016-8.072 12.017-9.52 18.705-1.555 6.688-3.312 19.02 7.76 23.304 3.52 1.567 6.727 1.985 9.934 1.776 11.178-.627 19.662-17.661 25.977-24.349 4.86-5.329 5.689 1.986 6.415-1.253zm-129.94 23.413c-7.141-.105-9.625-.105-18.006.313l-.311-.627c.725-3.24 1.553-6.374 2.275-9.614l.932-4.389c1.553-6.792 3.105-14.839 3.207-17.242.207-1.463.621-5.12-3.414-5.12-1.76 0-3.621.835-5.381 1.671-.932 3.658-3.002 13.899-4.037 18.497-1.965 9.823-2.172 10.972-3.104 15.78l-.621.626c-7.346-.104-9.934-.104-18.419.314l-.414-.732c1.449-5.852 2.794-11.704 4.14-17.556 3.518-15.78 4.346-21.84 5.379-29.887l.621-.418c8.281-1.149 10.35-1.463 19.248-3.239l.727.836-1.242 5.016c1.449-.94 3-1.881 4.449-2.613 4.244-2.09 8.9-2.717 11.486-2.717 3.934 0 8.176 1.15 10.037 5.748 1.656 4.075.52 9.091-1.758 19.019l-1.139 5.016c-2.379 11.077-2.689 13.062-3.934 20.586l-.826.627zm62-86.519-6.002.105c-15.523.209-21.732.104-24.215-.209-.207 1.15-.621 3.135-.621 3.135s-5.588 25.916-5.588 26.02c0 0-13.246 55.176-13.867 57.788 13.557-.209 19.041-.20
                9 21.422.105.518-2.613 3.621-17.974 3.725-17.974 0 0 2.691-11.286 2.795-11.704 0 0 .826-1.15 1.654-1.672h1.242c11.695 0 24.836 0 35.186-7.628 7.037-5.225 11.797-13.063 13.971-2
                
                2.468.516-2.299.93-5.016.93-7.837 0-3.658-.723-7.21-2.793-10.032-5.279-7.42-15.732-7.524-27.839-7.629zm7.762 27.066c-1.242 5.747-4.967 10.659-9.727 12.958-3.934 1.985-8.693 2.194-13.66 2.194h-3.209l.207-1.254s5.9-25.916 5.9-25.811l.205-1.359.104-1.045 2.381.21s12.211 1.044 12.418 1.044c4.759 1.881 6.83 6.688 5.381 13.063zm127.21 8.666-.725-.836c-8.795 1.776-10
                
                
                .451 2.09-18.523 3.24l-.621.626c0 .105-.104.21-.104.418v-.104c-6.002 14.107-5.898 11.077-10.762 22.154 0-.523 0-.836-.104-1.359l-1.242-24.035-.725-.836c-9.314 1.777-9.52 2.09-18.006 3.24l-.621.627c-.104.313-.104.627-.104.94l.104.105c1.035 5.538.828 4.284 1.863 12.958.518 4.284 1.139 8.569 1.654 12.749.828 7.106 1.348 10.554 2.381 21.318-5.795 9.613-7.141 13.271-12.729 21.734l.311.836c8.383-.312 10.244-.312 16.453-.312l1.348-1.568c4.654-10.135 40.254-71.79 40.254-71.79zm-302.72 6.922c4.76-3.344 5.38-7.942 1.345-10.345-4.036-2.404-11.176-1.672-15.937 1.672-4.76 3.24-5.277 7.837-1.241 10.345 3.932 2.3 11.073 1.672 15.833-1.672z" /><path d="m590.33 270.9-6.936 12.019c-2.172 4.075-6.311 7.21-12.727 7.21l-11.074-.209 3.209-10.868h2.172c1.139 0 1.967-.104 2.588-.418.621-.209.932-.627 1.449-1.254l4.139-6.583h17.281z" /></g></svg>
                <p>Guaranteed Safe Gateway </p>
              </div>
              <div className="shipping">
                <p><LocalShippingIcon style={{ color: 'black' }} /> Free shipping worldwide on all orders over 100$</p>
                <p><CalendarMonthOutlinedIcon style={{ color: 'black' }} /> Deliver in: 3-7 working days <span style={{ textDecoration: 'underline' }}>shipping & return</span>

                </p>
                <hr />
              </div>
              <div className="categorydetails">
                <p>SKU:D2409</p>
                <p>Category:earrings</p>
                <p>Tags:Hot, Trend</p>
                <p>Share:  <FacebookTwoToneIcon />   <FaLinkedinIn />    <FaTwitter /></p>
              </div>
            </div>

          </div>


        </div>





        <div className="bottomdetails">
          <div className="reviews">
            <div className="heading">
              <p onClick={handleReviewClick} className={showReview ? 'underline' : ''} style={{ cursor: 'pointer' }}>
                <b>Reviews</b>
              </p>
              <p onClick={handleDescriptionClick} className={showDescription ? 'underline' : ''} style={{ cursor: 'pointer' }}>
                <b>Description</b>
              </p>
            </div>
            {showDescription && (
              <p className="description">
                {itemInfo.seo_description}
              </p>
            )}
            {showReview && (

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
              // itemClass="carousel-item-padding-10-px"
              >
                <div className="review">
                  <ProductCard
                    key={'abcd'}
                    img={'https://images.unsplash.com/photo-1682687218982-6c508299e107?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'}
                    name={'ghjfgh'}
                    category={'cghsfgh'}
                    id={'dfhg'}
                    price={'sgdghnhfn'}
                  />


                </div>
                <div className="review">
                  <ProductCard
                    key={'abcd'}
                    img={'https://images.unsplash.com/photo-1682687218982-6c508299e107?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'}
                    name={'ghjfgh'}
                    category={'cghsfgh'}
                    id={'dfhg'}
                    price={'sgdghnhfn'}
                  />


                </div>
                <div className="review">
                  <ProductCard
                    key={'abcd'}
                    img={'https://images.unsplash.com/photo-1682687218982-6c508299e107?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'}
                    name={'ghjfgh'}
                    category={'cghsfgh'}
                    id={'dfhg'}
                    price={'sgdghnhfn'}
                  />


                </div>
                <div className="review">
                  <ProductCard
                    key={'abcd'}
                    img={'https://images.unsplash.com/photo-1682687218982-6c508299e107?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'}
                    name={'ghjfgh'}
                    category={'cghsfgh'}
                    id={'dfhg'}
                    price={'sgdghnhf11111'}
                  />


                </div>
              </Carousel>

            )}
          </div>
          <div className="lowerCarousel">
            <p><b>Related Products</b></p>

          </div>

          <RelatedProduct />
        </div>
      </div>
        : <Loader />
      }

    </>
  )
}

export default ProductDetails;

const RelatedProduct = () => {

  const [relatedProduct, setReletedProduct] = useState([])

  async function fetchData() {
    try {
      const res = await axios.get(url + productEndPoint)
      console.log(res.data.data)
      setReletedProduct(res.data.data)
    }
    catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    fetchData()
  }, []);



  return (
    <>


      {relatedProduct ?
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
                img={url + 'images/' + item.thum_image}
                name={item.seo_title}
                category={item.name}
                id={item.id}
                price={item.price}
              />

            )
          })}
        </Carousel>
        : 'loading..'}


    </>
  )
}