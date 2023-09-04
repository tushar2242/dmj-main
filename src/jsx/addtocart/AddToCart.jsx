import React from "react";
import Banner from "../Banner/Banner";
import HeaderCon from "../header/HeaderCon";
import Navbar from "../header/Navbar";
import productImg from '../../assets/images/brace.jpg';
import Footer from '../footer/Footer';
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";


const url = 'http://137.184.3.191:8080/DMJ/';
const endPoint = 'api/v1/products/';
const productEndPoint = 'api/v1/products';




const AddToCart = () => {

    const [proDetails, setProDetails] = useState([])

    // async function addProductData() {
    //


    async function fethcProductData(id) {
        try {
            const res = await axios.get(url + productEndPoint + '/' + id)

            console.log(res.data.data)
            return res.data.data
        }
        catch (err) {
            console.log(err)
        }
    }


    const cart = JSON.parse(localStorage.getItem('pdIds')) || [];

    useEffect(() => {
        window.scrollTo(0, 0);
        // addProductData()
        // console.log(cart)
    }, [])

    return (
        <>
            <HeaderCon />
            <Navbar />
            <Banner
                title="Cart"
                fullTitle=""
            >
                <NavLink to="/" className="text-decoration-none">
                    <i className="bi bi-chevron-left"></i>
                    Continue shopping</NavLink>
            </Banner>


            <div className="container-fluid">
                <div className="row">

                    {
                        cart.length > 0 && cart.map((item => {
                            // console.log(item)
                            fethcProductData(item)
                            return (
                                <ProductDetails
                                    productId={item}
                                />
                            )
                        }))
                    }
                    <OrderDetails />

                </div>
            </div>

            <Footer />
        </>
    );
}


class ProductDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: 0,
        }

        this.removeItem = this.removeItem.bind(this);
    }

    removeItem() {
        console.log('fired')
    }

    render() {

        const { productId } = this.props
        return (
            <>
                <div className="col-md-8">
                    <div className="cart-bg d-flex justify-content-between" style={{ overflowX: 'hidden' }}>
                        <h6 className="pro-font">PRODUCT</h6>
                        <div className="d-flex">
                            <h6 className="pro-font">QUANTITY</h6>
                            <h6 className="pro-font ms-5">PRICE</h6>
                            <h6 className="pro-font ms-5">REMOVE</h6>
                        </div>
                    </div>
                    <Products
                        productName='InterLinked Necklace'
                        removeItem={this.removeItem}
                    />

                </div>
            </>
        )
    }
}

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemQuan: 2,
            productName: 'Product Nameloremlgjsldfkasdfasdf',
            price: 3,
            totalPrice: 3,
        }

        this.addQuan = this.addQuan.bind(this);
        this.minQuan = this.minQuan.bind(this);
    }

    minQuan() {

        let itemQuan = this.state.itemQuan;
        let totalPrice = this.state.totalPrice;
        let price = this.state.price;
        if (itemQuan > 2) {
            this.setState({
                itemQuan: itemQuan - 1,
                totalPrice: totalPrice - price
            })
        }

    }

    addQuan() {
        let itemQuan = this.state.itemQuan;
        let price = this.state.price;
        if (itemQuan < 6) {
            this.setState({
                itemQuan: itemQuan + 1,
                totalPrice: price * itemQuan,
            });
        }

    }
    removeItem() {
        console.log('fired')
    }

    setValue() {
        console.log('working')
    }
    render() {
        const { itemQuan, productName, totalPrice, removeItem } = this.state;
        return (

            <>

                <div className="cart-display mt-3">
                    <div className="d-flex">
                        <img src={productImg} alt="Cart" className="img-fluid cart-img" />
                        <div>
                            <p className="ms-2 cart-font">
                                {productName.length < 25 ? productName : productName.slice(0, 25) + '...'
                                }
                            </p>
                            <p className="ms-2 cart-font">Availablity : <span className="text-primary">In Stock</span></p>
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className="num-block skin-1 mt-2">
                            <div className="num-in">
                                <span className="minus dis" onClick={this.minQuan}></span>
                                <input type="text" className="in-num" value={itemQuan - 1} readOnly="" onChange={this.setValue} />
                                <span className="plus" onClick={this.addQuan}></span>
                            </div>
                        </div>
                        <h6 className="pro-font mt-3 cart-qty"><i className="bi bi-currency-rupee"></i>{totalPrice}</h6>
                        <h6 className="pro-font mt-3 cart-qty" onClick={() => removeItem()}><i className="bi bi-trash-fill fs-5 text-danger"></i></h6>
                    </div>
                </div>

                <hr />
            </>
        )
    }
}


class OrderDetails extends React.Component {
    render() {
        return (
            <>
                <div className="col-md-4">
                    <div className="order-dtl shadow-sm">
                        <h6 className="pro-font">Order Details</h6>
                        <hr />
                        <div className="d-flex justify-content-between mt-3">
                            <p className="sub-ttl">Subtotal</p>
                            <p className="sub-ttl"><i className="bi bi-currency-rupee"></i>37,300</p>
                        </div>

                        <div className="d-flex justify-content-between mt-3">
                            <p className="sub-ttl">Discount</p>
                            <p className="sub-ttl"><i className="bi bi-currency-rupee"></i>5,000</p>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <p className="sub-ttl">Delivery Charges</p>
                            <p className="sub-ttl"><i className="bi bi-currency-rupee"></i>0</p>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mt-3">
                            <p><b>Total Amount</b></p>
                            <p>
                                <b><i className="bi bi-currency-rupee"></i>32,000</b>
                            </p>
                        </div>
                        <hr />
                        <p className="save-dtl">You will save <i className="bi bi-currency-rupee"></i>5,000 on this order.</p>
                    </div>

                    <div className="text-end mt-3">
                        <NavLink to="/checkout"><button className="px-5 py-2 view-btn">Place Order</button></NavLink>
                    </div>
                </div>
            </>
        )
    }
}




export default AddToCart;