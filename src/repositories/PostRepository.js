// Custom Repositories
import BasePostRepository from './BasePostRepository';

class PostRepository extends BasePostRepository {
	basePostContentFolder = './content/posts';
	postRouteTemplate = '/[year]/[month]/[day]/[title]';

	extractRouteFromFile({ filePath }) {
		const regex = /(\d{4})\/(\d{2})\/\d{4}\-\d{2}\-(\d{2})\-(.*)\.md$/gi;
		const m = regex.exec(filePath);
		if (!m) {
			return null;
		}
		const [relativePath, year, month, day, title] = m;
		const relativeUri = `/${year}/${month}/${day}/${title}`;

		return {
			relativePath,
			relativeUri,
			params: { year, month, day, title }
		};
	}
}

export default new PostRepository();
