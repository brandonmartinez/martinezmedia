import {
	useMemo,
	useState
} from 'react';

// Custom Components
import Images from 'components/shared/Images';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';

import { useScrollPosition } from '@n8tb1t/use-scroll-position';

const StyledNavbarWrapper = ({ isScrolled, backgroundImages, ...rest }) => (
	<Navbar expand='lg' fixed='top' variant='dark' {...rest} />
);
const StyledNavbar = styled(StyledNavbarWrapper)`
	border-bottom: ${(props) => props.theme.borderWidth} solid
		${(props) => props.theme.grayLight};
	color: ${(props) => props.theme.white};
	${(props) => Images.cssBackgroundImageSet(props.backgroundImages)}
	transition: all 1s ease-out 0s;
	opacity: ${(props) => (props.isScrolled ? 0.8 : 1)};

	&:hover {
		opacity: 1;
	}

	.navbar-brand {
		font-size: 1.5rem;
		font-family: ${(props) => props.theme.fontHeadings};
		letter-spacing: 0.2rem;
		font-weight: 800;
		color: ${(props) => props.theme.white};

		@media only screen and (min-width: ${(props) =>
				props.theme.breakpointLarge}) {
			padding: 10px 20px;
			color: ${(props) => props.theme.white};
			&:focus,
			&:hover {
				color: fade-out(${(props) => props.theme.white}, 0.2);
			}
		}
	}

	.navbar-toggler {
		font-size: 1rem;
		font-weight: 800;
		padding: 13px;
		text-transform: uppercase;
		color: ${(props) => props.theme.white};
	}

	@media only screen and (min-width: ${(props) =>
			props.theme.breakpointLarge}) {
		border-bottom: 1px solid transparent;
	}
`;

const NavLink = ({ className, children, ...rest }) => (
	<Nav.Item className={className}>
		<Nav.Link {...rest}>{children}</Nav.Link>
	</Nav.Item>
);

const StyledNavbarLink = styled(NavLink)`
	font-size: 1rem;
	font-weight: 800;
	letter-spacing: 1px;
	text-transform: uppercase;

	@media only screen and (min-width: ${(props) =>
			props.theme.breakpointLarge}) {
		padding: 10px 20px;
		color: ${(props) => props.theme.white};
		&:focus,
		&:hover {
			color: fade-out(${(props) => props.theme.white}, 0.2);
		}
	}
`;

const SiteNavigation = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const backgroundImages = useMemo(() =>
		Images.requireSiteOriginal('./nav-background.png')
	);

	useScrollPosition(
		({ prevPos, currPos }) => {
			const nbc = Math.abs(currPos.y) > 100;
			setIsScrolled(nbc);
		},
		[isScrolled],
		null,
		true,
		600
	);

	return (
		<StyledNavbar isScrolled={isScrolled} backgroundImages={backgroundImages}>
			<Container>
				<Navbar.Brand href='/'>Martinez Media, LLC</Navbar.Brand>
				<Navbar.Toggle
					aria-controls='navbar-toggler'
					aria-expanded='false'
					area-label='Toggle Navigation'
				/>
				<Navbar.Collapse id='navbar-toggler'>
					<Nav className='ml-auto'>
						<StyledNavbarLink href='/'>Home</StyledNavbarLink>
						<StyledNavbarLink href='/posts'>Blog</StyledNavbarLink>
						{/* <StyledNavbarLink href='/contact'>Contact</StyledNavbarLink> */}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</StyledNavbar>
	);
};

export default SiteNavigation;
