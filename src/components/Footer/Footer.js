import React from 'react'
import { Typography } from '@material-ui/core';
import './Footer.css'


const Footer = () => {
    return (
        <div className="footer">
            <div className="footer_left">
                <Typography className="footer_name">
                    Dvd Rental
                </Typography>
            </div>
            <div className="footer_right">
                <Typography className="footer_copyright">
                    Design and Developed by {" "}
                    <a href="/" target="_blank">Mochamad Dwi Fadly</a>
                    <br />
                    Clone idea from {" "}
                    <a href="https:///themeforest.net/user/travonline" target="_blank">Travonline</a>
                </Typography>
            </div>
        </div>
    )
}

export default Footer
