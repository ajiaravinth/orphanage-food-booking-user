import React, { Component } from 'react'
import { Button } from 'reactstrap'

export const HomePage = (props) => {
    return (
        <div className="container text-center">
            <div className="home-container">
                <div className="content">
                    <h3>Want to Donate Food For an Orphanage???</h3>
                    <Button color="primary" onClick={() => props.history.push("/signin")}>Click Here!!</Button>
                </div>
            </div>
        </div>
    )
}
