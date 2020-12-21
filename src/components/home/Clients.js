import React from 'react';

import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';

import Animated from '../shared/Animated';
import Section from './Section';

const ClientContent = ({ item, className }) => (
	<Col md='4' className={className}>
		<div className='image-container'>&nbsp;</div>
		<h2 className='title'>{item.title}</h2>
		<div className='excerpt'>{item.excerpt}</div>

		<Link href={item.relativeUri} prefetch={false} passHref>
			<Button variant='primary' className='read-more'>
				Read More
			</Button>
		</Link>
	</Col>
);

const StyledClientContent = styled(ClientContent)`
	margin-bottom: ${(props) => props.theme.gutterExtraLarge};

	.image-container {
		background-position: center center;
		background-image: url(${(props) => props.item.thumbnailUri});
		background-size: cover;
		margin-bottom: ${(props) => props.theme.gutter};
		width: 100%;
		height: 10rem;
	}

	.title {
	}

	.excerpt {
		margin-bottom: ${(props) => props.theme.gutterLarge};
	}

	.read-more {
	}
`;

const ClientGroup = ({ items }) => (
	<>
		<Row>
			{items.map((item, i) => (
				<StyledClientContent item={item} key={i} />
			))}
		</Row>
	</>
);

const Clients = ({ data, groupSize, ...rest }) => {
	groupSize = groupSize || 3;

	const groupedData = Array.from(
		{ length: Math.ceil(data.length / groupSize) },
		(v, i) => data.slice(i * groupSize, i * groupSize + groupSize)
	);
	return (
		<Section {...rest}>
			<Section.Title {...rest}>
				<span>Our</span> Clients
			</Section.Title>
			<Section.Description>
				We love our large variety of clients and partners!
			</Section.Description>
			{groupedData.map((items, i) => (
				<Animated.FadeIn duration={5} key={i}>
					<ClientGroup items={items} />
				</Animated.FadeIn>
			))}
		</Section>
	);
};

export default Clients;
