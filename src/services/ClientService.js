// Custom Components
import Images from 'components/shared/Images';

import ClientRepository from '../repositories/ClientRepository';
import BasePostService from './BasePostService';

class ClientService extends BasePostService {
	PostRepository = ClientRepository;

	async getPost({ title }) {
		const postPath = `${title}.md`;

		const file = await ClientRepository.getPost({ postPath });
		const post = this.mapFileToPost({ file });
		return post;
	}

	mapFileToPost({ file }) {
		// Create different sizes of the masthead uri
		const jpgFileName = file.path.filename.replace('.md', '.jpg');
		const images = Images.requireGear('./' + jpgFileName);
		const thumbnailUri = images.images[2].path;

		return {
			absoluteUri: file.route.uri,
			absoluteUriWithSlash: file.route.uri + '/',
			relativeUri: file.route.path,
			title: file.metadata.title,
			content: file.content,
			excerpt: file.metadata.excerpt,
			mastheadUri: './gear/' + jpgFileName,
			thumbnailUri
		};
	}

	defaultPostSort(a, b) {
		return a.title > b.title ? 1 : b.title > a.title ? -1 : 0;
	}
}

export default new ClientService();
