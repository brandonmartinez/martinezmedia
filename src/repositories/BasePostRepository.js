import { join, basename } from 'path';
import { readText, getFilesInDirectory } from '../data/FileService';
import matter from 'gray-matter';

const firstFourLines = (file, options) => {
	file.excerpt =
		file.data.excerpt ||
		file.content
			.split('\n')
			.slice(0, 4)
			.join('\n');
};

class BasePostRepository {
	async getPost({
		filePath,
		basePath,
		postPath,
		excludeMetadata,
		excludeContent
	}) {
		if (!filePath) {
			filePath = join(
				basePath || process.cwd(),
				this.basePostContentFolder,
				postPath
			);
		}

		const routeInfo = this.extractRouteFromFile({ filePath });
		if (!routeInfo) {
			return null;
		}

		const post = {
			route: {
				uri: `https://www.brandonmartinez.com${routeInfo.relativeUri}`,
				path: routeInfo.relativeUri,
				template: this.postRouteTemplate,
				params: routeInfo.params
			},
			path: {
				relative: routeInfo.relativePath,
				absolute: filePath,
				filename: basename(routeInfo.relativePath)
			},
			metadata: {},
			content: null,
			excerpt: ''
		};

		if (!excludeMetadata || !excludeContent) {
			const content = await readText(post.path.absolute);

			const document = matter(content, {
				excerpt: firstFourLines
			});

			if (!excludeContent) {
				post.content = document.content;
			}

			if (!excludeMetadata) {
				post.metadata = document.data;
				post.excerpt = document.excerpt;
			}
		}

		return post;
	}

	async *getPosts({ basePath, postsPath, includeMetadata, includeContent }) {
		basePath = basePath || process.cwd();
		postsPath = join(basePath, postsPath || this.basePostContentFolder);
		includeMetadata = includeMetadata;
		includeContent = includeContent;

		for await (const filePath of getFilesInDirectory(postsPath)) {
			const post = await this.getPost({
				filePath,
				excludeMetadata: !includeMetadata,
				excludeContent: !includeContent
			});

			if (post) {
				yield post;
			}
		}
	}
}

export default BasePostRepository;
