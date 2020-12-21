class BasePostService {
	async getPostPaths() {
		const paths = [];

		for await (const post of this.PostRepository.getPosts({})) {
			paths.push({ params: post.route.params });
		}

		return paths;
	}

	async getPaginatedPostPaths() {
		const number = 10;
		const paths = [];
		const posts = await this.getPosts();
		const numberOfPages = Math.ceil(posts.length / number);

		for (let pageIndex = 0; pageIndex < numberOfPages; pageIndex++) {
			paths.push({
				params: { page: pageIndex + 1 }
			});
		}

		return paths;
	}

	async getPosts() {
		const files = [];

		for await (const post of this.PostRepository.getPosts({
			includeMetadata: true,
			includeContent: true
		})) {
			files.push(post);
		}

		// File system returns raw post info, convert into mapped post info
		const posts = files
			.map(file => this.mapFileToPost({ file }))
			.sort(this.defaultPostSort);

		return posts;
	}

	async getPaginatedPosts({ page }) {
		const number = 10;
		const posts = await this.getPosts();
		const totalPosts = posts.length;
		const totalPages = Math.ceil(totalPosts / number);
		const slicedPosts = posts.slice(
			(page - 1) * number,
			(page - 1) * number + number
		);

		return {
			page,
			totalPosts,
			totalPages,
			posts: slicedPosts
		};
	}
}

export default BasePostService;
