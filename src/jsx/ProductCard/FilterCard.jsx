import "./filtercard.css";
// import ringimg from '../../assets/images/ring2.jpg'
// import tika from '../../assets/images/tika.jpg'
// import necklace from '../../assets/images/necklace3.jpg'
// import neckpiece from '../../assets/images/neckpiece.jpg'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const proto = "http://137.184.3.191:8080/DMJ/";
const endPoint = "api/v1/products/search?query=j";

// const search = 'dd';

const FilterCard = () => {
  const searchSelctor = useSelector((state) => state.product.search.payload);

  const [searchData, setSearchData] = useState([]);

  const fetData = async () => {
    try {
      const res = await axios.get(`${proto}${endPoint}${searchSelctor}`);
      console.log(res.data.data.order)
      setSearchData(res.data.data.order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetData();
    window.scrollTo(0, 0);
  }, [searchSelctor]);

  return (
    <>
      <div className="container contain-grid">
        <div className="grid-view">
          {searchData.length > 0 &&
            searchData.map((sItem) => {
              return (
                <ProductItemCard
                  img={proto + "images/" + sItem.thum_image}
                  key={sItem.id}
                  item={sItem}
                />
              );
            })}

        </div>
      </div>
    </>
  );
};

export default FilterCard;





const ProductItemCard = ({ img, item }) => {

  const navigate = useNavigate();

  function RedirectDetailsPage(id, dir) {
    navigate(dir, { state: { id: id } });
    localStorage.setItem("productId", id);
  }
  return (
    <>
      <div className="grid-column">
        <div className="text-decoration-none pro-cd-flt-box">

          <div
            className="card__container shadow-sm"
            onClick={() => RedirectDetailsPage(item.id, "/productDetails")}
          >
            <div className="bg-box"></div>
            <div className="card__top__section">
              <div className="pro-img-box">
                <img src={img} alt="product" className="pro-img-card" />
              </div>
              <div
                onClick={() => RedirectDetailsPage(id, "/wishlist")}
                className="text-decoration-none"
              ><div className="card__top__section__icons">
                  <FavoriteBorderIcon className="card-pro-icon" />
                </div>
              </div>
            </div>

            <div
              onClick={() => RedirectDetailsPage(id, "/productDetails")}
              className="text-decoration-none">

              <p className="trend-cont-fnt ms-2">{item.name}</p>
            </div>
            <div className="d-flex">
              <p className="strike-text1">
                <b>
                  <CurrencyRupeeIcon className="rup-icon-sz" /> {item.manualPrice}
                </b>
              </p>
              <p className="trend-price1">
                <b>
                  <CurrencyRupeeIcon className="rup-icon-sz ms-1" />{item.price}
                </b>
                <span className="span-pr-fnt">on wards</span>
              </p>
            </div>
            <div className="d-flex p-2">
              <p className="trend-rt-box1">
                <b>
                  4.5 <i className="bi bi-star-fill trend-rt-icon"></i>
                </b>
              </p>
              <p className="trend-span-fnt1">15 reviews</p>
            </div>

            <NavLink to="/addToCart">
              <div className="ft-add-cart-btn"><button className="trend-cart-btn1">
                <b>Add To Cart</b>
              </button></div>
            </NavLink>
          </div>


        </div>
      </div>

    </>
  );
};
