import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { AvField, AvGroup, AvForm } from "availity-reactstrap-validation";
import { Link } from "react-router-dom";
import request from "../config/api";
import { toast, ToastContainer } from "react-toastify";

const Login = (props) => {
  const user = {
    username: "",
    password: ""
  }
  const [values, setValues] = useState(user);

  useEffect(() => {
    let authCheck = localStorage.getItem("authToken");
    if (authCheck) {
      props.history.push("/dashboard");
    }

  }, [props]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const formSubmit = (e) => {
    e.preventDefault();
    let formData = {
      email: values.username,
      password: values.password,
    };

    request({
      url: "/user/login",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        if (res.status === 0) {
          toast.error("Invalid Credentials")
        }
        if (res.status === 1) {
          localStorage.setItem("authToken", res.response.auth_token);
          toast.success(res.message)
          setTimeout(() => {
            props.history.push({
              pathname: "/dashboard",
              state: {
                message: res.message,
                auth_token: res.response.auth_token,
                username: res.response.data,
                userId: res.response.userid,
                address: res.response.address,
                phone: res.response.phone,
              },
            });
          }, 1000);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <ToastContainer autoClose={1000} position="top-right" />
      <div className="userContainer">
        <h3 style={{ textAlign: "center" }}>Login</h3>
        <hr />
        <AvForm onValidSubmit={formSubmit}>
          <AvGroup>
            <AvField
              type="text"
              name="username"
              label="Username"
              placehoder="Enter Username"
              value={values.username}
              onChange={handleChange}
              validate={{
                required: { value: true, errMessage: "Please enter name" },
              }}
            />
          </AvGroup>
          <AvGroup>
            <AvField
              type="password"
              name="password"
              label="Password"
              placehoder="Enter Password"
              value={values.password}
              onChange={handleChange}
              validate={{
                required: { value: true, errMessage: "Please enter Password" },
              }}
            />
          </AvGroup>
          <Button color="success">Login</Button>
        </AvForm>
        <div className="mt-3"><Link to="/register">Go to Register</Link></div>
      </div>
    </div>
  );
};

export default Login;
