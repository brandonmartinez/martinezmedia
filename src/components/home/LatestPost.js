import React from 'react';

// Custom Components
import Post from '../shared/Post';
import Section from './Section';

const LatestPost = ({ data, ...rest }) => (
	<Section {...rest}>
		<Section.Title {...rest}>
			<span>Latest</span> Blog Entry
		</Section.Title>
		<Post post={data} isPreview={true} showMetadata={false} dark />
	</Section>
);

export default LatestPost;
