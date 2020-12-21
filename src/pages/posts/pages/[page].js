// Custom Components
import Index from '../index';

// Custom Services
import PostService from '../../../services/PostService';

export async function getStaticProps(context) {
	const page = context.params.page;
	const paginatedPosts = await PostService.getPaginatedPosts({
		page
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
export async function getStaticPaths() {
	// Build list of all blog posts to pre-render
	const postPaths = await PostService.getPaginatedPostPaths();
	const paths = postPaths.map(postPath => {
		return {
			params: {
				page: postPath.params.page.toString()
			}
		};
	});

	return {
		paths,
		fallback: false
	};
}

export default Index;
