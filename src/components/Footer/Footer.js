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
            textDecoration: 'underline',
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
                window.open(`https://facebook.com`, "_target")
                break;

            case 'Whatsapp':
                const phoneNumber = '601155552203'
                window.open(`https://api.whatsapp.com/send/?phone=${phoneNumber}&text&type=phone_number&app_absent=0`, "_target")
                break;

            case 'Wechat':
                window.open(`https://facebook.com`, "_target")
                break;

            case 'Gmail':
                const mailaddress = 'yawei_helpdesk@gmail.com'
                window.open(`mailto:${mailaddress}`, "_target")
                break;

            case 'faq':
                // navigate("/faq", { replace: true })
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
        <FooterContainer>
            <Grid className="footer-container-grid" container columnSpacing={3}>
                <Grid item xs={12} md={4} className="container-item">
                    <Heading>关于我们</Heading>
                    <FooterText>雅威国际物流提供专业从中国至东马的海运物流服务。初衷以简单，实惠，安心交托为主。</FooterText>

                    <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                        <IconButton sx={{ ...IconButtonStyle }} onClick={() => handleClick('Facebook')}>
                            <FacebookIcon sx={{ ...IconStyle }} size="large" />
                        </IconButton>
                        <IconButton sx={{ ...IconButtonStyle }} onClick={() => handleClick('Whatsapp')}>
                            <WhatsAppIcon sx={{ ...IconStyle }} size="large" />
                        </IconButton>
                        <IconButton sx={{ ...IconButtonStyle }} onClick={() => handleClick('Wechat')}>
                            <span class='material-icons' style={{ ...IconStyle }}>wechat</span>
                        </IconButton>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4} className="container-item">
                    <Heading>客服服务</Heading>
                    <FooterText>
                        <LocationOnIcon sx={{ my: 'auto' }} />
                        <Typography variant="subtitle" component="a" sx={{ ...InfoStyle }} >Hongnion Garden, 93150 Kuching, Sarawak</Typography>
                    </FooterText>
                    <FooterText>
                        <CallIcon sx={{ my: 'auto' }} />
                        <Typography variant="subtitle" component="a" sx={{ ...InfoStyle }} >011 - 5555 2203</Typography>
                    </FooterText>
                    <FooterText onClick={() => handleClick("Gmail")}>
                        <EmailIcon sx={{ my: 'auto' }} />
                        <Typography variant="subtitle" component="a" sx={{ ...InfoStyle }} >yawei_helpdesk@gmail.com</Typography>
                    </FooterText>
                    <FooterText>
                        <AccessTimeIcon sx={{ my: 'auto' }} />
                        <Typography variant="subtitle" component="a" sx={{ ...InfoStyle }} >Mon - Sat : 9:00am - 6:00pm</Typography>
                    </FooterText>
                    <FooterText>
                        <FacebookIcon sx={{ my: 'auto' }} />
                        <Typography variant="subtitle" component="a" sx={{ ...InfoStyle }} >Yourway Logistic Sdn Bhd</Typography>
                    </FooterText>
                </Grid>

                <Grid item xs={12} md={4} className="container-item">
                    <Heading>相关资讯</Heading>
                    <Typography sx={{ ...FooterLinkStyle }} onClick={() => handleClick('faq')}>
                        常见问题
                    </Typography>
                    <Typography sx={{ ...FooterLinkStyle }} onClick={() => handleClick('faq')}>
                        如何代运
                    </Typography>
                    <Typography sx={{ ...FooterLinkStyle }} onClick={() => handleClick('faq')}>
                        普货和敏感货
                    </Typography>
                    <Typography sx={{ ...FooterLinkStyle }} onClick={() => handleClick('faq')}>
                        海运费用
                    </Typography>
                    <Typography sx={{ ...FooterLinkStyle }} onClick={() => handleClick('profile')}>
                        我的账户
                    </Typography>

                </Grid>
            </Grid>
        </FooterContainer>
    );
};
export default Footer;


// <Column>
// </Column>
// <Column>

// </Column>
// <Column>

// </Column>