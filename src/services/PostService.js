import { DateTime } from 'luxon';

// Custom Services
import PostRepository from '../repositories/PostRepository';
import BasePostService from './BasePostService';

class PostService extends BasePostService {
	PostRepository = PostRepository;

	async getPost({ year, month, day, title }) {
		const postPath = `${year}/${month}/${year}-${month}-${day}-${title}.md`;

		const file = await this.PostRepository.getPost({ postPath });
		const post = this.mapFileToPost({ file });
		return post;
	}

	async getLatestPost() {
		const paginatedPosts = await this.getPaginatedPosts({ page: 1 });
		return paginatedPosts.posts[0];
	}

	mapFileToPost({ file }) {
		// If we don't have an id (i.e. it didn't come from the wordpress export), generate one with the date (new posts)
		const id =
			file.metadata.id ||
			DateTime.fromISO(file.metadata.datetime).toFormat('yyyyMMdd');

		return {
			id,
			absoluteUri: file.route.uri,
			absoluteUriWithSlash: file.route.uri + '/',
			relativeUri: file.route.path,
			title: file.metadata.title,
			publishedAt: file.metadata.datetime,
			categories: (file.metadata.categories || '').split(','),
			tags: (file.metadata.tags || '').split(','),
			content: file.content,
			excerpt: file.metadata.excerpt || file.excerpt,
			coverImageUri: file.metadata.coverImageUri
		};
	}

	defaultPostSort(a, b) {
		const dateA = Date.parse(a.publishedAt);
		const dateB = Date.parse(b.publishedAt);

		return dateB - dateA;
	}
}

export default new PostService();
