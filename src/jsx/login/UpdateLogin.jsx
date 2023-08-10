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

export default class UpdateLogin extends React.Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.state = {
            password: '',
            userName: '',
            lName: '',
            email: '',
            gender: '',
            phoneNumber: '',
            nickName: ''
        };
    }

    componentDidMount() {
        const containerRef = this.containerRef.current;
        TweenMax.fromTo(containerRef, 1, { y: -1050, opacity: 0 }, { y: 0, opacity: 1 });
    }

    handleForm = evt => {
        evt.preventDefault();

        const { password, userName, lName, email, gender, phoneNumber, nickName } = this.state;
        let countryCode=91;
        let age = 43;
        let  deviceToken = "79hifgh7"

        console.log(password, userName, gender, email, phoneNumber);
        const formData = { userName, email, password, phoneNumber, gender,countryCode,age,deviceToken };

        axios
            .post('http://localhost:8080/api/v1/user/signup', formData)
            .then(response => {
                console.log(response.data);
                console.log(formData);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { password, userName, lName, email, gender, phoneNumber, nickName } = this.state;

        let upperCaseMatch = /(?=.*[A-Z])/gm;
        let numericMatch = /(?=.*\d)/gm;
        let specialMatch = /[~`!@#$%^&*()--+={}[\]|:;"'<>,.?_₹]/gm;

        return (
            <>
                <div className="outer-login">
                    <div className="inner-login">
                        <form action="">
                            <div className="inputBoxContainer" ref={this.containerRef}>
                                <b>Complete Your Sign up</b>
                                <br />
                                <div className="checkBox-input">
                                    <div className="box-input">
                                        <label htmlFor="mobileNo mt-4">Mobile Number</label>
                                        <p className="">9584872001</p>
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
                                <div className="nameBox">
                                    <TextField label="First Name" variant="standard" required onChange={(e) => this.setState({ userName: e.target.value })} />
                                    <TextField label="Last Name" variant="standard" className="lstName" onChange={(e) => this.setState({ lName: e.target.value })} required />
                                </div>
                                <TextField label="Email (Optional)" variant="standard" className="inputFeild mb-1 mt-2" onChange={(e) => this.setState({ email: e.target.value })} />

                                <FormControl className="mt-2 radioControl" onChange={(e) => this.setState({ gender: e.target.value })}>
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

                                <TextField
                                    id="input-with-icon-textfield"
                                    label="Alternate Mobile No."
                                    type='number'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                    onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                                />
                                <label style={{ fontSize: "0.68rem" }}>This Will help recover your account if needed</label>

                                <br />
                                <TextField label="Nick Name (Optional)" variant="standard" className="inputFeild mb-1" type='text'
                                    onChange={(e) => this.setState({ nickName: e.target.value })}
                                />
                            </div>
                        </form>
                        <Button variant="contained" className="signUpButton" color="error" onClick={this.handleForm}>Sign Up</Button>
                    </div>
                </div>
            </>
        );
    }
}

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
