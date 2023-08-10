import React from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import Marquee from "react-fast-marquee";

export default class HeaderCon extends React.Component {
  render() {
    return (
      <>
        <div className="header-deskvw">
          <div className="header-bg">
            <div className="header-cont-box">
              <div className="header-icon header-box-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <FmdGoodIcon />
                <p>
                  <b>Select your address</b>
                </p>
              </div>
              <div>
                <Marquee>
                  Up to 50% off Deal of the day
                </Marquee>
              </div>
              <div className="header-icon">
                <p className="header-text">
                  <i className="bi bi-telephone-fill"></i> +91-9876543210
                </p>
                <p className="ms-3 header-text">
                  <i className="bi bi-envelope-fill"></i> dmj@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* -----------------------------Mobile View---------------------------- */}
        <div className="header-cont-mbvw">
          <div className="header-bg">
            <div>
              <Marquee>
                Up to 50% off Deal of the day
              </Marquee>
            </div>
            <div className="header-cont-box mt-1">
              <div className="header-icon header-box-1 header-text" data-bs-toggle="modal" data-bs-target="#exampleModal">

                <p className="header-text">
                  <i className="bi bi-geo-alt"></i> Location
                </p>
              </div>

              <div className="header-icon">
                <p className="header-text">
                  <i className="bi bi-telephone-fill"></i> +91-9876543210
                </p>
                <p className="ms-3 header-text">
                  <i className="bi bi-envelope-fill"></i> dmj@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>



        {/* --------------------------Modal PopUp---------------------- */}
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel"><b>Choose your location</b></h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p className="popup-cont-sz">Delivery options and delivery speeds may vary for different locations</p>
                <button className="popup-sign-btn">Sign in to see your addresses</button>
                <hr />

                <form>
                  <label htmlFor="" className="popup-cont-sz"><b>Enter a zip code</b></label>
                  <div className="d-flex">
                    <input className="form-control me-2" type="text" />
                    <button className="btn btn-outline-dark" type="submit">Apply</button>
                  </div>
                  <p className="popup-tagline-bt"></p>

                  <select className="form-select popup-sel-sz" aria-label="Default select example">
                    <option value="1" selected>India</option>
                    <option value="2">Australia</option>
                    <option value="3">Canada</option>
                  </select>
                </form>
              </div>
              <div className="modal-footer">

                <button type="button" className="popup-dn-btn">Done</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

