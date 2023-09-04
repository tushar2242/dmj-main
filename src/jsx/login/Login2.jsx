/* eslint-disable no-undef */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import img1 from '../../assets/images/carpet.jpg';
import '../../assets/css/login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// import { TextField } from '@mui/material';
// import { withRouter } from 'react-router-dom';


const url = 'http://137.184.3.191:8080/DMJ/';
const endPoint = 'api/v1/user';

export default class Login2 extends React.Component {

    render() {
        return (
            <>
                <LoginWithMobileNo />
            </>
        )
    }
}

const LoginWithMobileNo = () => {

    const [mobileNo, setMobileNo] = useState('')
    const [isPhone, setIsPhone] = useState('')

    const [validTxt, setValidTxt] = useState(false)

    const navigate = useNavigate()

    async function authUser(txt) {
        const formdata = new FormData()
        formdata.append('request', txt)
        formdata.append('type', false)
        try {
            const res = await axios.post(url + endPoint, formdata)
            console.log(res)
        }
        catch (err) {
            console.log(err)
        }
    }

    async function validation(txt) {
        const mobilePattern = /^[789]\d{9}$/gm;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm;

        if (mobilePattern.test(txt)) {
            // console.log('mobile number:', txt);
            setValidTxt(true)
            // You can perform additional actions for a valid mobile number here.
        } else if (emailPattern.test(txt)) {
            // console.log('email address:', txt);
            setValidTxt(true)
            // You can perform additional actions for a valid email address here.
        } else {

            setValidTxt(false)
            alert("Please Enter a Correct Mobile Number / Email-Id")
            // You can handle the case of invalid input here.
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await validation(mobileNo)
        console.log(validTxt)
        if (validTxt) {
            await authUser(mobileNo)
        }

        // await localStorage.setItem('dmjMobileNo', mobileNo);

        // navigate('/otp')
    }

    return (
        <>

            <div className="fullpage-bg">

                <div className="login-bg">
                    <div className="">
                        <div className="">
                            <img src={img1} className="coupon-img" alt="Coupon" />
                            <div className="user-login">
                                <h6><b>Login or Signup</b></h6>
                                <form onSubmit={handleSubmit}>
                                    <input type="tel" className="login-input" id="login-number" placeholder="Mobile Number / Email-id *" value={mobileNo} onChange={(e) => {
                                        setMobileNo(e.target.value)
                                    }} required />
                                    {/* <label className="error" style={{ display: showError }}>Enter a Correct Email-Id / Phone No.</label> */}
                                    <br />
                                    <p style={{ fontSize: '13px', marginTop: '4px' }}>Enter only no example :- 1234567890</p>
                                    <p className="tp-text">By Continuing, I agree to the <span className="tp-color"><b>Terms of Use & Privacy Policy</b></span></p>
                                    <button type="submit" className="continue-btn">CONTINUE</button>
                                    <p className="tp-text">Already Have an account ? <NavLink to="/defaultLogin" className="tp-color"><span className="text-danger"><b>Login</b></span></NavLink></p>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}