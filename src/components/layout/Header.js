import Images from 'components/shared/Images';
import styled from 'styled-components';

import Animated from '../shared/Animated';
import Masthead from '../shared/Masthead';

const logoImgSrc = Images.requireSite('./logo.png');
const StyledImg = styled.img`
	max-width: 100%;
	height: auto;
`;

const Header = ({ backgroundImage, title, subtitle, heightPercentage }) => {
	if (!backgroundImage) {
		backgroundImage = './mastheads/sunset.jpg';
	}

	return (
		<Masthead
			backgroundImage={backgroundImage}
			heightPercentage={heightPercentage}
		>
			<Animated.FromLeft duration={4}>
				<Masthead.Heading>
					{title || (
						<StyledImg
							srcSet={logoImgSrc.srcSet}
							src={logoImgSrc.src}
							alt='Martinez Media Logo'
							className='mb-3 d-none d-md-block'
						/>
					)}
				</Masthead.Heading>
			</Animated.FromLeft>
			<Animated.FromRight duration={4}>
				<Masthead.Subheading>{subtitle}</Masthead.Subheading>
			</Animated.FromRight>
		</Masthead>
	);
};

export default Header;
