import Container from 'react-bootstrap/Container';
import styled from 'styled-components';

// Custom Components
import Footer from './layout/Footer';
import GlobalStyles from './layout/GlobalStyles';
import Head from './layout/Head';
import Header from './layout/Header';
import GoogleAnalytics from './shared/GoogleAnalytics';

const StyledContainer = styled(({ isScrolled, showHeader, fluid, ...rest }) => (
	<Container fluid={fluid} {...rest} />
))`
	margin-top: ${(props) => (props.showHeader ? 0 : '7rem')};
	padding-left: ${(props) => (props.fluid ? '0' : '1rem')};
	padding-right: ${(props) => (props.fluid ? '0' : '1rem')};
`;

const Layout = ({ masthead, fluid, children }) => {
	GoogleAnalytics.useAnalytics();

	const showHeader =
		masthead &&
		(masthead.backgroundImage ||
			masthead.heightPercentage ||
			masthead.subtitle ||
			masthead.title);
	return (
		<>
			<Head />
			<GlobalStyles />
			{/* <SiteNavigation /> */}
			{showHeader && <Header {...masthead} />}
			<StyledContainer showHeader={showHeader} fluid={fluid}>
				{children}
			</StyledContainer>

			<Footer />
			<script
				src='https://unpkg.com/react/umd/react.production.min.js'
				crossOrigin='true'
			/>

			<script
				src='https://unpkg.com/react-dom/umd/react-dom.production.min.js'
				crossOrigin='true'
			/>

			<script
				src='https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js'
				crossOrigin='true'
			/>
		</>
	);
};

export default Layout;
