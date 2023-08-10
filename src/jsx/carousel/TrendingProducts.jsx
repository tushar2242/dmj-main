import React from "react";
import "../../assets/css/trending.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import earring from "../../assets/images/earring.jpg";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { NavLink } from "react-router-dom";

const TrendingProducts = () => {
  return (
    <>
      <Tabs>
        <div className="container">
          <div className="row  mb-4">
            <div className="col-md-12 mt-4">
              <div className="trend-dpy">
                <div>
                  <h3 className="trend-heading">
                    <b>TRENDING PRODUCTS</b>
                  </h3>
                  <p className="trending-bottom"></p>
                </div>

                <TabList className="tab">
                  <Tab>
                    <h6 className="trend-tab">
                      <b>Jewellery</b>
                    </h6>
                  </Tab>
                  <Tab>
                    <h6 className="trend-tab">
                      <b>Handicraft</b>
                    </h6>
                  </Tab>
                  <Tab>
                    {" "}
                    <h6 className="trend-tab">
                      <b>Blue Pottery</b>
                    </h6>
                  </Tab>
                </TabList>
              </div>
            </div>

            <div className="col-md-12">
              <TabPanel>
              <div className="row">
                <TrendingCard title="Jewellery" />
                <TrendingCard title="Jewellery" />
                <TrendingCard title="Jewellery" />
                <TrendingCard title="Jewellery" />
                </div>
              </TabPanel>
              <TabPanel>
              <div className="row">
                <TrendingCard title="Handicraft" />
                <TrendingCard title="Handicraft" />
                <TrendingCard title="Handicraft" />
                <TrendingCard title="Handicraft" />
                </div>
              </TabPanel>
              <TabPanel>
              <div className="row">
                <TrendingCard title="Blue Pottery" />
                <TrendingCard title="Blue Pottery" />
                <TrendingCard title="Blue Pottery" />
                <TrendingCard title="Blue Pottery" />
                </div>
              </TabPanel>
            </div>
          </div>
        </div>
      </Tabs>
    </>
  );
};
export default TrendingProducts;

const TrendingCard = (props) => {
  return (
    <>
      
        <div className="col-md-3 mt-3">
          <NavLink to="/productDetails" className="text-decoration-none">
            <div className="trending-pro-card">
              <img
                src={earring}
                alt="product"
                className="img-fluid trend-cd-img"
              />
              <NavLink to="/wishlist">
                <div className="trend-ht-icon">
                  <FavoriteBorderIcon className="ht-td-icon" />
                </div>{" "}
              </NavLink>
              <p className="trend-cont-fnt">{props.title}</p>
              <div className="d-flex">
            <p className="strike-text">
              <b>
                <CurrencyRupeeIcon className="rup-icon-sz" /> 249.00
              </b>
            </p>
            <p className="trend-price">
              <b>
                <CurrencyRupeeIcon className="rup-icon-sz ms-1" /> 249.00
              </b>
              <span className="span-pr-fnt">on wards</span>
            </p>
            </div>
              <div className="d-flex">
                <p className="trend-rt-box">
                  <b>
                    4.5 <i className="bi bi-star-fill trend-rt-icon"></i>
                  </b>
                </p>
                <span className="trend-span-fnt">15 reviews</span>
              </div>
              <NavLink to="/addToCart">
                <button className="trend-cart-btn">
                  <b>Add To Cart</b>
                </button>
              </NavLink>
            </div>
          </NavLink>
        </div>
      
    </>
  );
};
