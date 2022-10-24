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

const Footer = () => {
    const theme = useTheme()
    return (
        <Box style={{ marginTop: "0px" }}>
            <Container>
                <Row>
                    <Column>
                        <Heading>关于我们</Heading>
                        <FooterText>雅威国际物流提供专业的从中国至东马的海运物流服务。初衷以简单，实惠，安全和快速为主。</FooterText>
                    </Column>
                    <Column>
                        <Heading>相关资讯</Heading>
                        <FooterLink href="#">常见问题</FooterLink>
                        <FooterLink href="#">如何代运</FooterLink>
                        <FooterLink href="#">普货和敏感货</FooterLink>
                        <FooterLink href="#">海运费用</FooterLink>
                        <FooterLink href="#">我的账户</FooterLink>
                    </Column>
                    <Column>
                        <Heading>客服服务</Heading>
                        <FooterLink href="#">
                            Address
                        </FooterLink>
                        <FooterLink href="#">
                            Contact
                        </FooterLink>
                        <FooterLink href="#">
                            Email
                        </FooterLink>
                        <FooterLink href="#">
                            WechatID
                        </FooterLink>
                        <FooterLink href="#">
                            Operation Time
                        </FooterLink>
                        <FooterLink href="#">
                            Facebook
                        </FooterLink>
                    </Column>
                </Row>
            </Container>
        </Box>
    );
};
export default Footer;
