import React from "react";
import {
    Box,
    Container,
    Row,
    Column,
    FooterLink,
    Heading,
    FooterText
} from "./FooterStyles";
import { useTheme } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Typography, Grid, } from '@mui/material';
import useAuth from "../../hooks/useAuth";
const Footer = () => {
    const theme = useTheme()
    const { auth, setAuth } = useAuth()
    return (
        <Box style={{ marginTop: "0px" }}>
            <Container>
                <Row>
                    <Column>
                        <Heading>关于我们</Heading>
                        <FooterText>雅威国际物流提供专业从中国至东马的海运物流服务。初衷以简单，实惠，安心交托为主。</FooterText>
                    </Column>
                    <Column>
                        <Heading>相关资讯</Heading>
                        <FooterLink href="/faq/0">常见问题</FooterLink>
                        <FooterLink href="/faq/2">如何代运</FooterLink>
                        <FooterLink href="/faq/2">普货和敏感货</FooterLink>
                        <FooterLink href="/pricing">海运费用</FooterLink>
                        <FooterLink href={auth?.UserID !== null ? "/profile" : "/login"}>我的账户</FooterLink>
                    </Column>
                    <Column>
                        <Heading>客服服务</Heading>
                        <FooterText>
                            <Grid container spacing={2} >
                                <Grid item xs={2} ><LocationOnIcon /></Grid>
                                <Grid item xs={10}>Stapok</Grid>
                            </Grid>
                        </FooterText>
                        <FooterText>
                            <Grid container spacing={2} >
                                <Grid item xs={2} ><CallIcon /></Grid>
                                <Grid item xs={10}>011 - 5555 2203</Grid>
                            </Grid>
                        </FooterText>
                        <FooterLink href="#">
                            <Grid container spacing={2} >
                                <Grid item xs={2} ><EmailIcon /></Grid>
                                <Grid item xs={10}>yawei_helpdesk@gmail.com</Grid>
                            </Grid>
                        </FooterLink>
                        <FooterText>
                            <Grid container spacing={2} >
                                <Grid item xs={2} ><AccessTimeIcon /></Grid>
                                <Grid item xs={10}>Mon - Sat : 9:00am - 6:00pm</Grid>
                            </Grid>
                        </FooterText>
                        <FooterLink href="./pricing">
                            <Grid container spacing={2} >
                                <Grid item xs={2} ><FacebookIcon /></Grid>
                                <Grid item xs={10}>Yourway Logistic Sdn Bhd</Grid>
                            </Grid>
                        </FooterLink>
                    </Column>
                </Row>
            </Container>
        </Box>
    );
};
export default Footer;
