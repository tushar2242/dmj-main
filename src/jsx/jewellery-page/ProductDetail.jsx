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
import TwitterIcon from '@mui/icons-material/Twitter';
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
// import './App.css'
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';
import ReactImageMagnify from 'react-image-magnify';

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

  // const responsive = {
  //   superLargeDesktop: {
  //     breakpoint: { max: 4000, min: 3000 },
  //     items: 5
  //   },
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 4
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 4
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 2
  //   }
  // };


  const fetchData = async () => {
    const id = localStorage.getItem('productId')
    try {
      const res = await axios.get(url + endPoint + id)
      setItemInfo(res.data.data)
      // console.log(res.data.data)
      setIsLoad(false)
      await setSelectedImage(res.data.data.thum_image)
    }
    catch (err) {
      console.log(err)
      setIsLoad(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();

  }, []);







  const handleImageClick = (image) => {
    // console.log(image);
    setSelectedImage(image);
  };



  const location = useLocation();
  const productId = location.state?.id;



  // console.log(productId)
  // console.log(id)



  return (
    <>

      {!isLoad ? <div className="MainDiv">
        <div className="topPart">
          <div className="img">

            {/* {selectedImage ? <img src={selectedImage} alt="Item 2" className='CarouselImageTop' />
              : <img src={url + 'images/' + itemInfo.thum_image} className='CarouselImageTop' alt="Item 2" />} */}






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
                  {!isLoad && itemInfo.pictures.map((image, index) => (
                    <div key={index} className='smalCarouselimg'
                      onClick={() => handleImageClick(image)}
                    >
                      <img src={url + 'images/' + image} alt={`Image ${index + 1}`}

                      />
                    </div>
                  ))}

                </Swiper>
              </div>

            </div>


            {/* {selectedImage ? */}


            <ReactImageMagnify style={{ zIndex: '5' }}
              {...{
                smallImage: {
                  alt: 'Wristwatch by Ted Baker London',
                  // isFluidWidth: true,
                  height: 480,
                  width: 340,


                  src: url + 'images/' + selectedImage,

                },
                largeImage: {
                  src: url + 'images/' + selectedImage,
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





            {/* <img src={selectedImage} alt="Item 2" />  */}
            {/* :  <img src={url + 'images/' + itemInfo.thum_image} className='CarouselImageTop' alt="Item 2" />} */}


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
      // console.log(res.data.data)
      setReletedProduct(res.data.data.order)
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