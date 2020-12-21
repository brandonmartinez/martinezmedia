import ExperienceRepository from '../repositories/ExperienceRepository';
import BasePostService from './BasePostService';

class ExperienceService extends BasePostService {
	PostRepository = ExperienceRepository;

	async getPost({ title }) {
		const postPath = `${title}.md`;

		const file = await ExperienceRepository.getPost({ postPath });
		const post = this.mapFileToPost({ file });
		return post;
	}

	mapFileToPost({ file }) {
		return {
			absoluteUri: file.route.uri || null,
			absoluteUriWithSlash: file.route.uri ? file.route.uri + '/' : null,
			relativeUri: file.route.path || null,
			title: file.metadata.title || null,
			content: file.content || null,
			company: file.metadata.company || null,
			companyUri: file.metadata.companyUri || null,
			icon: file.metadata.icon || null,
			iconBackground: file.metadata.iconBackground || null,
			startDate: file.metadata.startDate || null,
			endDate: file.metadata.endDate || null
		};
	}

	defaultPostSort(a, b) {
		const dateA = Date.parse(a.startDate);
		const dateB = Date.parse(b.startDate);

		return dateB - dateA;
	}
}

export default new ExperienceService();
