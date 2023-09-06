import React from "react";
import CheckIcon from '@mui/icons-material/Check';
import { TextField, Button } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { TweenMax } from "gsap";
import axios from "axios";
import FormLabel from '@mui/material/FormLabel';
// import { Navigate, useNavigate } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
// import {withRouter} from 'react-router-dom';


const url = 'http://137.184.3.191:8080/DMJ/';
const endPoint = 'api/v1/user/signup';

var userAuth = localStorage.getItem('userAuth')



class UpdateLogin extends React.Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.state = {
            password: '',
            userName: '',
            lName: '',
            email: '',
            gender: 'male',
            phoneNumber: '',
            nickName: '',
            age: '',
            isPhoneEmail: false,
            isVerfy: false,
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleForm = this.handleForm.bind(this)
    }



    componentDidMount() {
        userAuth = localStorage.getItem('userAuth')
        // const navigator = useNavigate()
        if (userAuth) {
            this.setState({ isVerfy: true })
            this.setState({ phoneNumber: userAuth })
        }
        else {
            this.setState({ isVerfy: false })
        }
        const containerRef = this.containerRef.current;
        TweenMax.fromTo(containerRef, 1, { y: -1050, opacity: 0 }, { y: 0, opacity: 1 });
        if (!isNaN(userAuth)) {
            this.setState({ isPhoneEmail: true })
        }
    }

    handleForm = evt => {
        evt.preventDefault();

        const { password, userName, lName, email, gender, phoneNumber, nickName } = this.state;
        let countryCode = 91;
        let age = 43;
        let deviceToken = "79hifgh7"
        let name = userName + ' ' + lName
        // console.log(password, userName, gender, email, phoneNumber);

        axios
            .post(url + endPoint, {
                "userName": name,
                "email": email,
                "password": password,
                "phoneNumber": phoneNumber,
                "deviceToken": "79hi7",
                "gender": gender,
                "age": age,
                "countryCode": 91,
                "roles": ["user"]
            })
            .then(response => {
                console.log(response.data);
                alert(response.data)
                // console.log(formData);
            })
            .catch(error => {
                alert(error)
                console.log(error);
            });
    }

    render() {
        const { password, userName, lName, email, gender, phoneNumber, nickName, isPhoneEmail, isVerfy } = this.state;

        let upperCaseMatch = /(?=.*[A-Z])/gm;
        let numericMatch = /(?=.*\d)/gm;
        let specialMatch = /[~`!@#$%^&*()--+={}[\]|:;"'<>,.?_₹]/gm;

        return (
            <>
                <div className="outer-login">
                    {!isVerfy ?
                        <div className="inner-login">

                            <form onSubmit={this.handleForm} style={{ height: '100%' }}>
                                <div className="inputBoxContainer" ref={this.containerRef}>
                                    <b>Complete Your Sign up</b>
                                    <br />
                                    <div className="checkBox-input">
                                        <div className="box-input">
                                            {isPhoneEmail ?

                                                <label htmlFor="mobileNo mt-4">Mobile Number</label>
                                                :
                                                <label htmlFor="mobileNo mt-4">Email Id</label>
                                            }
                                            <p className="">{userAuth}</p>
                                        </div>
                                        <CheckIcon className="checkIcon" />
                                    </div>

                                    <TextField label="Password" variant="standard" className="inputFeild mb-1" required type='password'
                                        onChange={(e) => this.setState({ password: e.target.value })}
                                    />

                                    <div className="errorBox">
                                        <ErrMessageBox
                                            text='8 Characters'
                                            color={password.length > 7 ? 'green' : 'rgba(128, 128, 128, 0.534)'}
                                        />
                                        <ErrMessageBox
                                            text='1 Special'
                                            color={specialMatch.test(password) ? 'green' : 'rgba(128, 128, 128, 0.534)'}
                                        />
                                        <ErrMessageBox
                                            text='1 Uppercase'
                                            color={upperCaseMatch.test(password) ? 'green' : 'rgba(128, 128, 128, 0.534)'}
                                        />
                                        <ErrMessageBox
                                            text='1 Numeric'
                                            color={numericMatch.test(password) ? 'green' : 'rgba(128, 128, 128, 0.534)'}
                                        />
                                    </div>
                                    <br />
                                    <div className="nameBox mt-2">
                                        <TextField label="First Name" variant="standard" required onChange={(e) => this.setState({ userName: e.target.value })} />
                                        <TextField label="Last Name" variant="standard" className="lstName" onChange={(e) => this.setState({ lName: e.target.value })} required />
                                    </div>
                                    {isPhoneEmail ?
                                        <TextField label="Phone " type='phone' variant="standard" className="inputFeild mb-1 mt-2" onChange={(e) => this.setState({ email: e.target.value })} required />
                                        :
                                        <TextField label="Email " type='email' variant="standard" className="inputFeild mb-1 mt-2" onChange={(e) => this.setState({ email: e.target.value })} required />
                                    }


                                    <FormControl className="mt-3 radioControl" onChange={(e) => this.setState({ gender: e.target.value })} required>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Select Gender</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            className="radioButtonGroup"

                                        >
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        </RadioGroup>
                                    </FormControl>

                                    <TextField label="Age" type='number' variant="standard" className="inputFeild mb-1 mt-2" onChange={(e) => this.setState({ age: e.target.value })} required />



                                    {/* <label style={{ fontSize: "0.68rem" }}>This Will help recover your account if needed</label> */}

                                    <br />
                                    {/* <TextField label="Nick Name" variant="standard" className="inputFeild mb-1" type='text'
                                    onChange={(e) => this.setState({ nickName: e.target.value })}
                                    required
                                /> */}
                                </div>
                                <Button variant="contained" type='submit' className="signUpButton" color="error">Sign Up</Button>
                            </form>


                        </div>
                        :
                        <div className="text-center ps-4" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                            <h2 className="mb-4">Please verify Mobile No. Or Email-Id </h2>
                            <NavLink to='/login' className='btn btn-primary' style={{ padding: '12px 34px' }}>Verify Phone No. or Email-id</NavLink>
                        </div>
                    }
                </div>

            </>
        );
    }
}

export default UpdateLogin


class ErrMessageBox extends React.Component {
    render() {
        const { text, color } = this.props;
        return (
            <div className="err-box" style={{ backgroundColor: color }}>
                {text}
            </div>
        );
    }
}
