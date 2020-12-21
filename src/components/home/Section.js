import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';

// Custom Components
import Animated from '../shared/Animated';

const SectionContainer = ({ className, children }) => (
	<div className={className}>
		<Container>{children}</Container>
	</div>
);

const SectionContainerWrapper = ({ dark, ...rest }) => (
	<SectionContainer {...rest} />
);
const Section = styled(SectionContainerWrapper)`
	background-color: ${props =>
		props.dark ? props.theme.grayDark : props.theme.white};
	color: ${props => (props.dark ? props.theme.white : 'inherit')};
	width: 100%;
	margin-bottom: ${props => props.theme.gutterExtraLarge};
	padding: ${props => (props.dark ? props.theme.gutterLarge : 0)} 0
		${props => props.theme.gutterExtraLarge} 0;

	&:first-child {
		padding-top: 0;
	}
`;

const Title = ({ className, children }) => (
	<Row className={className}>
		<Col md='12'>
			<Animated.FadeIn>
				<div>
					<h1 className='section-title'>{children}</h1>
				</div>
			</Animated.FadeIn>
		</Col>
	</Row>
);

const TitleWrapper = ({ dark, ...rest }) => <Title {...rest} />;
const StyledTitle = styled(TitleWrapper)`
	.section-title {
		text-align: center;
		padding: 1rem 0 2rem;
		text-transform: lowercase;
		letter-spacing: 0.15rem;
		margin: ${props => props.theme.gutterLarge} auto
			${props => props.theme.gutterLarge} auto;
		position: relative;
		line-height: 1.6;
		width: 50%;

		@media only screen and (min-width: ${props =>
				props.theme.breakpointLarge}) {
			&:before,
			&:after {
				background: none repeat scroll 0 0 #666666;
				content: '';
				height: 0.15rem;
				left: 0;
				position: absolute;
				top: 3.3rem;
				width: 10%;
			}

			&:after {
				right: 0;
				left: auto;
			}
		}

		span {
			background-color: ${props =>
				props.dark ? props.theme.white : props.theme.grayDark};
			color: ${props =>
				props.dark ? props.theme.grayDark : props.theme.white};
			border-radius: ${props => props.theme.borderRadius};
			padding: 0 ${props => props.theme.gutterSmall};
		}
	}
`;

const Description = ({ className, children }) => (
	<Row className={className}>
		<Col lg='2' className='d-md-none d-lg-block'>
			&nbsp;
		</Col>
		<Col lg='8' md='12'>
			<h3>{children}</h3>
		</Col>
		<Col lg='2' className='d-md-none d-lg-block'>
			&nbsp;
		</Col>
	</Row>
);
const DescriptionWrapper = ({ dark, ...rest }) => <Description {...rest} />;
const StyledDescription = styled(DescriptionWrapper)`
	margin-bottom: ${props => props.theme.gutterLarge};

	h3 {
		text-align: center;
	}
`;

Section.Title = StyledTitle;
Section.Description = StyledDescription;

export default Section;
