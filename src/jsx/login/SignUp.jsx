import React from 'react';
import { NavLink } from 'react-router-dom';
import Footer from '../footer/Footer';
import HeaderCon from '../header/HeaderCon';
import Navbar from '../header/Navbar';
import axios from 'axios';

localStorage.setItem('userToken', 'userName');

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
      phone: '',
      emailError: 'none',
      passwordError: 'none',
      nameError: 'none',
      phoneError: 'none'
    };
  }

  handleForm = evt => {
    evt.preventDefault();


    const { userName, password, email, phone } = this.state;

    axios
      .post('http://localhost:8080/api/v1/user/signup', {
        userName,
        password,
        email,
        phone
      })
      .then(response => {
        console.log(response.data);
        // Do something with the response, such as redirect to a success page
      })
      .catch(error => {

        console.log(error);
        // Handle the error, such as displaying an error message to the user
      });
  };

  render() {
    const {
      userName,
      password,
      email,
      phone,
      emailError,
      passwordError,
      nameError,
      phoneError
    } = this.state;
    console.log('hjgfktfiu');
    return (
      <>
        <HeaderCon />
        <Navbar />

        <div className="login-bg shadow mt-5 mb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3 className="text-center mdl-frm">
                  <b>Signup</b>
                </h3>
                <form onSubmit={this.handleForm}>
                  <label htmlFor="signup_fname" className="form-label mt-3 label-text">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control input-holder"
                    value={userName}
                    onChange={e => {
                      this.setState({ userName: e.target.value });
                      let nameCheck = /^[a-z\d]{2,}$/gms;
                      if (!nameCheck.test(userName)) {
                        this.setState({ nameError: 'block' });
                      } else {
                        this.setState({ nameError: 'none' });
                      }
                    }}
                    placeholder="Full Name"
                  />
                  <label className="error" style={{ display: nameError }}>
                    Enter a Correct Name
                  </label>
                  <br />

                  <label htmlFor="signup_email" className="form-label mt-1 label-text">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control input-holder"
                    value={email}
                    onChange={e => {
                      this.setState({ email: e.target.value });
                      let emailcheck = /^[A-Za-z_0-9]{2,}@[A-Za-z]{2,}[.]{1}[A-Za-z.]{1,6}$/gm;
                      if (!emailcheck.test(email)) {
                        this.setState({ emailError: 'block' });
                      } else {
                        this.setState({ emailError: 'none' });
                      }
                    }}
                    placeholder="Email"
                  />
                  <label className="error" style={{ display: emailError }}>
                    Enter a Correct Password
                  </label>
                  <br />

                  <label htmlFor="signup_email" className="form-label mt-1 label-text">
                    Phone No.
                  </label>
                  <input
                    type="text"
                    className="form-control input-holder"
                    value={phone}
                    onChange={e => {
                      this.setState({ phone: e.target.value });
                      let phoneCheck = /^[6-9]\d{8}$/;
                      if (!phoneCheck.test(phone)) {
                        this.setState({ phoneError: 'block' });
                      } else {
                        this.setState({ phoneError: 'none' });
                      }
                    }}
                    placeholder="Phone No."
                  />
                  <label className="error" style={{ display: phoneError }}>
                    Enter a Correct Mobile NO.
                  </label>
                  <br />

                  <label htmlFor="signup_password" className="form-label mt-1 label-text">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control input-holder"
                    value={password}
                    onChange={e => {
                      this.setState({ password: e.target.value });
                      let passwordcheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/gms;
                      if (!passwordcheck.test(password)) {
                        this.setState({ passwordError: 'block' });
                      } else {
                        this.setState({ passwordError: 'none' });
                      }
                    }}
                    placeholder="Password"
                  />
                  <label className="error" style={{ display: passwordError }}>
                    Enter a Correct Password
                  </label>
                  <br />

                  <div className="text-center">
                    <button type="submit" className="px-5 py-2 mt-3 mb-3 signup-btn sign-button">
                      Sign Up
                    </button>
                  </div>
                  <p className="text-center mt-3">
                    <b>
                      Already have an account?
                      <NavLink to="/login" className="text-decoration-none">
                        Login
                      </NavLink>
                    </b>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }
}
