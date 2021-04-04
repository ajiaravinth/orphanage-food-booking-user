import { AvForm, AvGroup } from "availity-reactstrap-validation";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Button, Label } from "reactstrap";
import moment from "moment";
import request from "../config/api";
import _ from "lodash";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { toast, ToastContainer } from "react-toastify";


const Dashboard = (props) => {

    const options = [
        { value: 'Christ Faith Home For Children & Women', label: 'Christ Faith Home For Children & Women' },
        { value: 'Avvai Home & Orphanage', label: 'Avvai Home & Orphanage' },
        { value: 'Nethaji Mercy Home', label: 'Nethaji Mercy Home' },
        { value: 'Dazzling Stone Orphanage', label: 'Dazzling Stone Orphanage' },
        { value: "Children's Home of Hope", label: "Children's Home of Hope" },
        { value: 'Faith Home Orphanage', label: 'Faith Home Orphanage' },
        { value: 'Udhavum Ullangal Illam', label: 'Udhavum Ullangal Illam' },
        { value: "ANNAL CHILDREN'S HOME", label: "ANNAL CHILDREN'S HOME" },
        { value: 'Greater Love Children Home', label: 'Greater Love Children Home' },
        { value: "Solomons children's home", label: "Solomons children's home" },
        { value: 'Children Home India', label: 'Children Home India' },
        { value: 'Annai Teresa Charitable Trust', label: 'Annai Teresa Charitable Trust' },
    ];

    const slots = [
        { value: 'breakfast', label: 'Breakfast' },
        { value: 'lunch', label: 'Lunch' },
        { value: 'dinner', label: 'Dinner' },
    ];

    const [username, setusername] = useState("");
    const [selectedOption, setselectedOption] = useState("");
    const [selectedSlot, setSelectedSlot] = useState([]);
    const [date, setDate] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        console.log(props, "props")
        let name = props.location.state.username
        setusername(name)
    }, [props])

    const handleChange = option => {
        setselectedOption(option);
    };

    const slotChange = (slot) => {
        setSelectedSlot(slot)
        populateData(slot)
    }

    const logout = () => {
        localStorage.clear()
        toast.success("Logged Out!!");
        setTimeout(() => {props.history.push("/")}, 1000)
    }

    const dateChange = (e) => {
        console.log(e, "e")
        setDate(e)
    }

    const populateData = (slot) => {
        let bookingData = {
            orphanage_name: selectedOption.value,
            date: date,
            slot_timing: slot.value,
        }
        request({
            url: "/user/booking/details",
            method: "POST",
            data: bookingData,
        }).then(res => {
            if (res.status === 1) {
                setShow(res.response)
            }
            if (res.status === 0) {
                setShow(res.response)
            }
        }).catch(err => console.log(err))
    }

    const formSubmit = () => {
        const formData = {
            orphanage_name: selectedOption.value,
            date: date,
            slot_timing: selectedSlot.value,
            userid: props.location.state.userId ? props.location.state.userId : "",
            username: props.location.state.username ? props.location.state.username : "",
            user_phone: props.location.state.phone ? props.location.state.phone : "",
            user_address: props.location.state.address ? props.location.state.address : "",
        }
        request({
            url: "/user/bookslot",
            method: "POST",
            data: formData
        })
            .then(res => {
                if (res.status === 1) {
                    toast.success(res.response)
                    setTimeout(() => {
                        props.history.push({
                            pathname: "/booking/details",
                            state: {
                                result: res.result,
                                address: props.location.state.address,
                                phone: props.location.state.phone,
                                userId: props.location.state.userId,
                                username: props.location.state.username
                            }
                        })
                    }, 1000)
                }
                else {
                    toast.error("Somthing Went wrong")
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <ToastContainer autoClose={1000} position="top-right" />
            <div className="header">
                <h5>{username}</h5>
                <Button color="danger" onClick={logout}>Logout</Button>
            </div>
            <div className="booking-form">
                <h3>Book And Donate Food</h3>
                <AvForm onValidSubmit={() => formSubmit()}>
                    <AvGroup>
                        <Label>Select Orphanage</Label>
                        <Select value={selectedOption}
                            placeholder={"Select Orpanage"}
                            onChange={handleChange}
                            options={options} />
                    </AvGroup>
                    <AvGroup>
                        <Label>Select Date</Label>
                        <Datetime
                            dateFormat="DD-MM-YYYY"
                            timeFormat={false}
                            closeOnSelect={true}
                            value={date}
                            inputProps={{
                                placeholder: "Pick Date",
                            }}
                            isValidDate={(current) =>
                                current.isAfter(moment().subtract(0, 'day'))
                            }
                            onChange={(e) => {
                                if (e._isValid) {
                                    setDate(e);
                                } else if (!e) {
                                    setDate(null);
                                } else {
                                    setDate(null);
                                }
                            }}
                        />
                    </AvGroup>
                    <AvGroup>
                        <Label>Select Timing</Label>
                        <Select value={selectedSlot}
                            placeholder={"Select Timing"}
                            onChange={slotChange}
                            options={slots} />
                    </AvGroup>
                    <AvGroup>
                        <Button color="primary" disabled={show ? true : false}>Book Now</Button>
                    </AvGroup>
                </AvForm>
                {show && <span style={{ color: "green" }}> This Timing is Already Booked </span>}
            </div>
        </div>
    )
}

export default Dashboard;
