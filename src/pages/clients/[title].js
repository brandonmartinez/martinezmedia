import React from 'react';

import { NextSeo } from 'next-seo';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

// Custom Components
import Layout from '../../components/Layout';
// Custom Services
import GearService from '../../services/ClientService';

const Post = ({ post, className }) => (
	<Row className={className}>
		<Col lg='2' className='d-md-none d-lg-block'>
			&nbsp;
		</Col>
		<Col lg='8' md='12'>
			<h1>{post.title}</h1>

			<ReactMarkdown source={post.content} />
		</Col>
		<Col lg='2' className='d-md-none d-lg-block'>
			&nbsp;
		</Col>
	</Row>
);

const StyledPost = styled(Post)`
	p {
		padding-bottom: 1rem;
	}

	p img,
	img {
		display: block;
		max-width: 75%;
		height: auto;
		max-height: 50vh;
		margin: 3rem auto 0 auto;
	}
`;

const PostLayoutTemplate = ({ post }) => (
	<Layout
		masthead={{
			title: post.title,
			subtitle: 'My Gear',
			backgroundImage: post.mastheadUri
		}}
	>
		<NextSeo title={post.title} description={post.excerpt} />
		<StyledPost post={post} />
	</Layout>
);

export async function getStaticProps(context) {
	const { title } = context.params;

	const post = await GearService.getPost({ title });
	return { props: { post } };
}

export async function getStaticPaths() {
	// Build list of all blog posts to pre-render
	const postPaths = await GearService.getPostPaths();
	return {
		paths: postPaths,
		fallback: false
	};
}

export default PostLayoutTemplate;
