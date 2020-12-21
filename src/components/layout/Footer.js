import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';

const StyledFooterContainer = styled.footer.attrs((props) => ({
	className: 'pt-4 mt-5'
}))`
	background-color: ${(props) => props.theme.grayDark};
	border-top: 2rem solid ${(props) => props.theme.grayExtraDark};
	color: ${(props) => props.theme.white};

	a {
		color: ${(props) => props.theme.white};
		font-weight: bold;
	}
`;

const Footer = () => (
	<StyledFooterContainer>
		<Container>
			<Row>
				{/* <Col md='4' className='mt-md-0 mt-3'>
					<h5 className='text-uppercase mb-3'>Martinez Media, LLC</h5>
					<About.Avatar />
					<p className='d-sm-block d-md-none'>
						Web, Social, and Design Consulting
					</p>
				</Col> */}

				{/* <Col md='6' className='mt-md-0 mt-3'>
					<h5 className='text-uppercase mb-3'>Social</h5>

					<About.SocialAccounts />
				</Col> */}

				<Col md='6' className='mt-md-0 mt-3'>
					<h5 className='text-uppercase mb-3'>Disclaimer</h5>
					<p>
						Content belongs to Martinez Media, LLC unless otherwise noted or
						shared from another content creator. Client work is copyrighted to
						the client unless otherwise stated, and shared for portfolio
						purposes.
					</p>
					<p>
						Copyright &copy; 2013 - {new Date().getFullYear()},{' '}
						<a href='https://www.martinezmedia.net/'>Martinez Media, LLC</a>.
						All Rights Reserved where applicable.
					</p>
					<p>Version: {process.env.buildId}</p>
				</Col>
			</Row>
		</Container>
	</StyledFooterContainer>
);

export default Footer;
