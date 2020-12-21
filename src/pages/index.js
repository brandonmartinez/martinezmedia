import React from 'react';

import matter from 'gray-matter';
import { NextSeo } from 'next-seo';

import About from '../components/home/About';
import Layout from '../components/Layout';
import ClientService from '../services/ClientService';
import PostService from '../services/PostService';

const Index = ({ about, clients, latestPost }) => (
	<Layout
		masthead={{
			title: null,
			subtitle: 'Web, Social, and Design Consulting',
			heightPercentage: 0.50
		}}
		fluid
	>
		<NextSeo
			title='Martinez Media, LLC | Web, Social, and Design Consulting'
			titleTemplate='%s'
			description='Martinez Media, LLC looks to help small businesses break into the large digital world of web and social media.'
		/>
		<About data={about} />
		{/* <LatestPost data={latestPost} dark />
		<Clients data={clients} dark /> */}
	</Layout>
);

export async function getStaticProps() {
	const getMarkdownContent = async (section) => {
		const content = await import(`../../content/index/${section}.md`);
		const data = matter(content.default);

		// Remove orig, as it's probably a buffer and can't be serialized
		delete data.orig;

		return { ...data };
	};

	const about = await getMarkdownContent('about');
	const clients = await ClientService.getPosts();
	const latestPost = await PostService.getLatestPost();

	return {
		props: {
			about,
			clients,
			latestPost
		}
	};
}

export default Index;
