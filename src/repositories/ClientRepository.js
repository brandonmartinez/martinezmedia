// Custom Repositories
import BasePostRepository from './BasePostRepository';

class ClientRepository extends BasePostRepository {
	basePostContentFolder = './content/clients';
	postRouteTemplate = '/clients/[title]';

	extractRouteFromFile({ filePath }) {
		const regex = /gear\/(.*)\.md$/gi;
		const m = regex.exec(filePath);
		if (!m) {
			return null;
		}

		const [relativePath, title] = m;
		const relativeUri = `/clients/${title}`;

		return {
			relativePath,
			relativeUri,
			params: { title }
		};
	}
}

export default new ClientRepository();
