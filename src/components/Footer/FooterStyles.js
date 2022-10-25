import styled from 'styled-components';

export const Box = styled.div`
background: #023047;;
width: 100%;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 1000px;
	margin: 0 auto;
	background: #023047;
`

export const Column = styled.div`
display: flex;
flex-direction: column;
text-align: center;
margin: 0 20px;

`;

export const Row = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill,
						minmax(250px, 1fr));
grid-gap: 20px;

@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(250px, 1fr));
}
`;

export const FooterText = styled.div`
color: #fff;
margin-bottom: 5px;
font-size: 14px;
text-decoration: none;
text-align:left;
`;

export const FooterLink = styled.a`
color: #fff;
margin-bottom: 5px;
font-size: 14px;
text-decoration: none;
text-align:left;
&:hover {
	color: #8ECAE6;
	transition: 200ms ease-in;
}
`;

export const Heading = styled.p`
font-size: 24px;
color: #fff;
margin-bottom: 20px;
text-align:left;
font-weight: bold;
color: #8ECAE6;
`;
