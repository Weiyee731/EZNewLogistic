import React from 'react';
import styled from 'styled-components';

export const FooterContainer = styled.div`
background: #023047;
padding: 120px 0px;

@media (max-width: 768px) {
	padding: 30px;
}

`;

// export const Container = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: center;
// 	max-width: 1196px;
// 	margin: auto;
// 	background: #023047;
// `

// export const Column = styled.div`
// display: flex;
// flex-direction: column;
// text-align: center;
// margin: 0 20px;
// `;

// export const Row = styled.div`
// display: grid;
// grid-template-columns: repeat(auto-fill, minmax(33.333%, 2fr));
// grid-gap: 10px;

// @media (max-width: 1196px) {
// 	grid-template-columns: repeat(auto-fill, minmax(33.333%, 2fr));
// }
// `;

export const FooterText = styled.div`
color: #fff;
margin-bottom: 5px;
font-size: 16px;
text-decoration: none;
word-wrap: break-word;
display: flex;

@media (max-width: 768px) {
	width: 360px;
}
`;

// export const FooterLink = styled.a`
// color: #fff;
// margin-bottom: 5px;
// font-size: 14px;
// text-decoration: none;
// &:hover {
// 	color: #8ECAE6;
// 	transition: 200ms ease-in;
// }
// @media (max-width: 768px) {
// 	width: 360px;
// }
// `;

export const Heading = styled.p`
font-size: 32px;
color: #fff;
margin-bottom: 20px;
font-weight: bold;
color: #8ECAE6;
`;

