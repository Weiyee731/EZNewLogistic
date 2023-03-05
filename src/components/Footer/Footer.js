import React from "react";
import {
    FooterContainer,
    Heading,
    FooterText
} from "./FooterStyles";
import { useTheme } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { Typography, Grid, } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Stack from "@mui/material/Stack";
import './Footer.css'


const Footer = () => {
    const theme = useTheme()
    const navigate = useNavigate()

    const FooterLinkStyle = {
        color: '#fff',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
            color: '#f1f1f1',
        },
        fontSize: 16,
        mb: 1
    }

    const InfoStyle = {
        color: '#fff',
        cursor: 'pointer',
        '&:hover': {
            // textDecoration: 'underline',
            color: '#f1f1f1',
        },
        fontSize: 16,
        my: 'auto',
        ml: 2,
    }

    const IconStyle = {
        color: '#FFF',
        fontSize: 28,
    }

    const IconButtonStyle = {
        size: 64,
        bgcolor: 'black',
    }

    const handleClick = (feature) => {
        switch (feature) {
            case 'Facebook':
                window.open("https://www.facebook.com/yourwaylogistic")
                break;

            case 'Whatsapp':
                const phoneNumber = '601155842203'
                window.open(`https://api.whatsapp.com/send/?phone=${phoneNumber}&text&type=phone_number&app_absent=0`, "_target")
                break;

            case 'Wechat':
                // window.open(`https://facebook.com`, "_target")
                window.open("https://u.wechat.com/IJ3N-SlE7TJbVNdXqF20Ev4")
                break;

            case 'Gmail':
                const mailaddress = 'yawei_helpdesk@gmail.com'
                window.open(`mailto:${mailaddress}`, "_target")
                break;

            case 'faq-0':
                navigate("/faq/0", { replace: true })
                window.scrollTo(0, 0)
                break;

            case 'faq-1':
                navigate("/faq/1", { replace: true })
                window.scrollTo(0, 0)
                break;

            case 'faq-2':
                navigate("/faq/2", { replace: true })
                window.scrollTo(0, 0)
                break;

            case 'pricing':
                navigate("/pricing", { replace: true })
                window.scrollTo(0, 0)
                break;

            case 'profile':
                window.scrollTo(0, 0)
                navigate("/profile", { replace: true })
                break;

            default: break;
        }
    }
    return (
        <div style={{
            position: "fixed",
            bottom: "0px",
            width: "100%",
            height: "35px",
            backgroundColor: "#23395d",
            alignItems: "center",
            flexFlow: 'row',
            flexWrap: 'nowrap',
            alignContent: 'space-between',
        }}>
            <div className="row" style={{ color: "white", textAlign: "right", paddingRight: "20px" }}>
                <label >  壹智国际物流 </label>
            </div>
        </div>
    );
};
export default Footer;