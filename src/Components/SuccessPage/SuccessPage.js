import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Row, Table } from 'reactstrap'

export const SuccessPage = (props) => {
    const [bookingDetails, setbookingDetails] = useState({})
    useEffect(() => {
        console.log(props, "props");
        if (props && props.location && props.location.state) {
            setbookingDetails(props.location.state.result)
        }
    }, [])

    const backToBookingPage = () => {
        props.history.push({
            pathname: "/dashboard",
            state: {
                address: props.location.state.address,
                phone: props.location.state.phone,
                userId: props.location.state.userId,
                username: props.location.state.username
            }
        })
    }
    console.log(bookingDetails)
    return (
        <div className="container text-center mt-5">
            <h3>Thanks For Donating Food</h3>
            <div>
                <h5>Your Booking Details</h5>
                <div className="booking-details">
                    <Row>
                        <Col lg="6"><h6>Orphanage Name:</h6></Col><Col lg="6">{bookingDetails.orphanage_name}</Col>
                        <Col lg="6"><h6>Booking Date:</h6></Col><Col lg="6">{moment(bookingDetails.booking_date).format("DD/MM/YYYY")}</Col>
                        <Col lg="6"><h6>Booking Time:</h6></Col><Col lg="6">{bookingDetails.slot_timing}</Col>
                        <Col lg="6"><h6>Booking Person:</h6></Col><Col lg="6">{bookingDetails.username}</Col>
                        <Col lg="6"><h6>Booking Person Phonenumber:</h6></Col><Col lg="6">{bookingDetails.user_phone}</Col>
                    </Row>
                </div>
            </div>
            <div className="back-btn">
                {/* <Link to='/dashboard'>Back To Booking</Link> */}
                <Button color="success" className="backBtn" onClick={backToBookingPage}>Close</Button>
            </div>
        </div>
    )
}
