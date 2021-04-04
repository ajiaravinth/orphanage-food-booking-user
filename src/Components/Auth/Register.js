import React, { useState } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import request from "../config/api";
import { AvField, AvGroup, AvForm } from "availity-reactstrap-validation";
import { toast, ToastContainer } from "react-toastify";

const Register = (props) => {

  const user = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    address: {
      line1: "",
      area: "",
      city: "",
      state: "",
      country: "",
      pincode: ""
    }
  }
  const [values, setValues] = useState(user);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    let formData = {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
      phone: values.phone,
      line1: values.address.line1,
      city: values.address.city,
      state: values.address.state,
      country: values.address.country,
      pincode: values.address.pincode
    };
    console.log(values)
    request({
      url: "/user/register",
      method: "POST",
      data: values,
    })
      .then((res) => {
        if (res.status === 0) {
          alert(res.response);
        }
        if (res.status === 1) {
          toast.success(res.message)
          setTimeout(() => {
            props.history.push("/signin");
          }, 1000)
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <ToastContainer autoClose={1000} position="top-right" />
      <div className="userContainer ">
        <h3 style={{ textAlign: "center" }}>Register</h3>
        <hr />
        <AvForm onValidSubmit={formSubmit}>
          <AvGroup>
            <AvField
              type="text"
              name="name"
              label="Name"
              placeholder="Enter your name"
              value={values.name}
              onChange={handleChange}
              validate={{
                required: { value: true, errorMessage: "Please enter name!" },
              }}
            />
          </AvGroup>
          <AvGroup>
            <AvField
              type="text"
              name="username"
              label="Username"
              placeholder="Enter Username"
              value={values.username}
              onChange={handleChange}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter username!",
                },
              }}
            />
          </AvGroup>
          <AvGroup>
            <AvField
              type="email"
              name="email"
              label="Email"
              placeholder="Enter your Email"
              value={values.email}
              onChange={handleChange}
              validate={{
                required: { value: true, errorMessage: "Please enter email!" },
              }}
            />
          </AvGroup>
          <AvGroup>
            <AvField
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter password!",
                },
              }}
            />
          </AvGroup>
          <AvGroup>
            <AvField
              type="password"
              name="confirm_password"
              label="Confirm Password"
              placeholder="Re-Enter your password"
              value={values.confirm_password}
              onChange={handleChange}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please re-enter password",
                },
                match: {
                  value: "password",
                  errorMessage: "Password doesn't match",
                },
              }}
            />
          </AvGroup>
          <AvGroup>
            <AvField
              type="number"
              name="phone"
              label="Phone Number"
              placeholder="Enter your Phone Number"
              value={values.phone}
              onChange={handleChange}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter phone number",
                },
                minLength: {
                  value: 10,
                  errorMessage: "Phone number must be 10 digits ",
                },
                maxLength: {
                  value: 12,
                  errorMessage: "Phone number must be 10 digits ",
                },
              }}
            />
          </AvGroup>
          {/* Address */}
          <AvGroup>
            <AvField
              type="text"
              name="line1"
              label="Door No"
              placeholder="Door Number"
              value={values.address.line1}
              onChange={handleChange}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter Door no",
                },
              }}
            />
          </AvGroup>
          <AvGroup>
            <AvField
              type="text"
              name="city"
              label="City/Town"
              placeholder="City"
              value={values.address.city}
              onChange={handleChange}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter City",
                },
              }}
            />
          </AvGroup>
          <AvGroup>
            <AvField
              type="text"
              name="state"
              label="State"
              placeholder="State"
              value={values.address.state}
              onChange={handleChange}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter state",
                },
              }}
            />
          </AvGroup>
          <AvGroup>
            <AvField
              type="text"
              name="country"
              label="Country"
              placeholder="Country"
              value={values.address.country}
              onChange={handleChange}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter country",
                },
              }}
            />
          </AvGroup>
          <AvGroup>
            <AvField
              type="number"
              name="pincode"
              label="Zip Code"
              placeholder="Zip Code"
              value={values.address.pincode}
              onChange={handleChange}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter Pin Code",
                },
              }}
            />
          </AvGroup>
          <AvGroup>
            <Button color="success">Register</Button>
          </AvGroup>
        </AvForm>
        <Link to="/signin">Go to Login</Link>
      </div>
    </div>
  );
};

export default Register;
