import React from 'react';

import Link from 'next/link';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';

// Custom Components
import Layout from '../../components/Layout';
import Post from '../../components/shared/Post';
// Custom Services
import PostService from '../../services/PostService';

const getPaginationItems = ({ currentPage, totalPages }) => {
	// Sanitize
	if (typeof currentPage !== 'Number') {
		currentPage = parseInt(currentPage, 10);
	}

	if (typeof totalPages !== 'Number') {
		totalPages = parseInt(totalPages, 10);
	}

	const paginationItems = [];

	// Build a sliding window of pages
	const numberOfPagesToShowEachSide = 2;
	let startPage = currentPage - numberOfPagesToShowEachSide;
	let endPage = currentPage + numberOfPagesToShowEachSide;

	if (startPage <= 0) {
		startPage = 1;
	}

	if (endPage > totalPages) {
		endPage = totalPages;
	}

	// Add beginning elements (if needed)
	if (startPage != 1) {
		paginationItems.push(
			<Link href='/posts/pages/1' prefetch={false} passHref key={'1-start'}>
				<Pagination.First />
			</Link>
		);
	}

	if (currentPage != 1) {
		const previousPage = currentPage - 1;
		paginationItems.push(
			<Link
				href={`/posts/pages/${currentPage - 1}`}
				prefetch={false}
				passHref
				key={`${previousPage}-previous`}
			>
				<Pagination.Prev />
			</Link>
		);
	}

	if (startPage != 1) {
		paginationItems.push(<Pagination.Ellipsis key={'start-ellipsis'} />);
	}

	for (let number = startPage; number <= endPage; number++) {
		paginationItems.push(
			<Link
				href={`/posts/pages/${number}`}
				prefetch={false}
				passHref
				key={number}
			>
				<Pagination.Item active={number === currentPage}>
					{number}
				</Pagination.Item>
			</Link>
		);
	}

	if (endPage != totalPages) {
		paginationItems.push(<Pagination.Ellipsis key={'end-ellipsis'} />);
	}

	if (currentPage != totalPages) {
		const nextPage = currentPage + 1;
		paginationItems.push(
			<Link
				href={`/posts/pages/${nextPage}`}
				prefetch={false}
				passHref
				key={`${nextPage}-next`}
			>
				<Pagination.Next />
			</Link>
		);
	}

	if (endPage != totalPages) {
		paginationItems.push(
			<Link
				href={`/posts/pages/${totalPages}`}
				prefetch={false}
				passHref
				key={`${totalPages}-end`}
			>
				<Pagination.Last />
			</Link>
		);
	}

	return paginationItems;
};

const PostPagination = ({ paginationItems }) => (
	<Row>
		<Col md='12'>
			<Pagination>{paginationItems}</Pagination>
		</Col>
	</Row>
);

const StyledPostPagination = styled(PostPagination)``;

const Index = ({ posts, pagination }) => {
	const paginationItems = getPaginationItems({
		currentPage: pagination.page,
		totalPages: pagination.totalPages
	});

	return (
		<Layout>
			<Row>
				<Col md='0' lg='2' />
				<Col md='12' lg='8'>
					{posts.map((p) => (
						<Post
							key={p.relativeUri}
							post={p}
							isPreview={true}
							showMetadata={true}
						/>
					))}
				</Col>
				<Col md='0' lg='2' />
			</Row>
			<StyledPostPagination paginationItems={paginationItems} />
		</Layout>
	);
};

export async function getStaticProps() {
	const paginatedPosts = await PostService.getPaginatedPosts({
		page: 1
	});

	const posts = paginatedPosts.posts;
	const pagination = paginatedPosts;
	delete pagination.posts;

	return {
		props: {
			pagination,
			posts
		}
	};
}

export default Index;
