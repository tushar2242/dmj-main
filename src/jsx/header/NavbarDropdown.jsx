import { TrendingWrap, SellerWrap } from "./Navbar";
import { NavLink } from "react-router-dom";
import { memo } from "react";

const NavbarDropdown = (props) => {
    const { title } = props;
    return (
        <>

            <ul className="dropdown-menu1">
                <h4>{title}</h4>
                <div className="row">
                    <div className="col-md-3">
                        <h6 className="menu-heading-ft mb-3"><b>SHOP BY TYPE</b></h6>
                        <li className="">
                            <NavLink to="/search" className="sp-list-type">RINGS</NavLink>
                        </li>
                        <li className=""> <NavLink to="/search" className="sp-list-type">NECKLACE</NavLink></li>
                        <li className=""> <NavLink to="/search" className="sp-list-type">EARRINGS</NavLink></li>
                        <li className=""> <NavLink to="/search" className="sp-list-type">BANGLES</NavLink></li>
                        <li className=""> <NavLink to="/search" className="sp-list-type">BRACELETS</NavLink></li>
                        <li className=""> <NavLink to="/search" className="sp-list-type">PENDANTS</NavLink></li>
                    </div>

                    <div className="col-md-3">
                        <h6 className="menu-heading-ft mb-3"><b>TRENDING NOW</b></h6>
                        <li className="">
                            <TrendingWrap />
                        </li>
                        <li className="">
                            <TrendingWrap />
                        </li>
                        <li className="">
                            <TrendingWrap />
                        </li>

                    </div>

                    <div className="col-md-3">
                        <h6 className="menu-heading-ft mb-3"><b>NEW ARRIVAL</b></h6>
                        <li className="">
                            <TrendingWrap />
                        </li>
                        <li className="">
                            <TrendingWrap />
                        </li>

                    </div>

                    <div className="col-md-3">
                        <h6 className="menu-heading-ft mb-3"><b>BEST SELLERS</b></h6>
                        <li className="">
                            <SellerWrap />
                        </li>
                    </div>
                </div>
            </ul>
        </>

    );

}


export default memo(NavbarDropdown)