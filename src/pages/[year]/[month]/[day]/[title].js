import React from 'react';

import { DateTime } from 'luxon';
import { NextSeo } from 'next-seo';

// Custom Components
import Layout from '../../../../components/Layout';
import Post from '../../../../components/shared/Post';
// Custom Services
import PostService from '../../../../services/PostService';

const PostLayoutTemplate = ({ post }) => {
	const masthead = !!post.coverImageUri
		? {
				title: post.title,
				subtitle: DateTime.fromISO(post.publishedAt).toFormat('LLL dd, yyyy'),
				heightPercentage: 0.5,
				backgroundImage: post.coverImageUri
		  }
		: null;
	return (
		<Layout masthead={masthead}>
			<NextSeo
				title={post.title}
				description={post.excerpt}
				openGraph={{
					url: post.absoluteUri,
					title: post.title,
					description: post.excerpt,
					type: 'article'
				}}
			/>
			<Post post={post} showMetadata={true} />
		</Layout>
	);
};

export async function getStaticProps(context) {
	const { year, month, day, title } = context.params;

	const post = await PostService.getPost({ year, month, day, title });
	return { props: { post } };
}

export async function getStaticPaths() {
	// Build list of all blog posts to pre-render
	const postPaths = await PostService.getPostPaths();
	return {
		paths: postPaths,
		fallback: false
	};
}

export default PostLayoutTemplate;
