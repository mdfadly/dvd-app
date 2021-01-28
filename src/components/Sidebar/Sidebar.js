import React from 'react'
import { Typography } from '@material-ui/core';
import './Sidebar.css'
import imageSidebar from '../../assets/images/download.jpg'
import CustomButton from '../Button/CustomButton'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const Sidebar = () => {
    return (
        <div className="sidebar container_shadow">
            <div className="app_name">
                <Typography className="name">DVD Rental</Typography>
            </div>

            <figure className="app_image">
                <img src={imageSidebar} alt="" />
            </figure>
            <br />
            
            <div className="button_container">
                <CustomButton text={'Rent'} icon={<AddShoppingCartIcon/>}/>
            </div>
            {/* <CustomButton></CustomButton> */}
        </div>
    )
}

export default Sidebar
