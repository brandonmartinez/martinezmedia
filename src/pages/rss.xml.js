import { DateTime } from 'luxon';

import PostService from '../services/PostService';

const getRssPostXml = (posts) => {
	let latestPost = 0;
	let rssItemsXml = '';
	posts.forEach((post) => {
		const postDate = DateTime.fromISO(post.publishedAt);
		if (!latestPost || postDate > latestPost) {
			latestPost = postDate;
		}
		rssItemsXml += `
      <item>
        <title>${post.title}</title>
        <link>
          https://www.martinezmedia.net${post.relativeUri}/
        </link>
        <guid>
          https://www.martinezmedia.net${post.relativeUri}/
        </guid>
        
        <pubDate>${postDate.toRFC2822()}</pubDate>
        <description>
        <![CDATA[
			${post.excerpt}
		]]>
        </description>
    </item>`;
	});
	return {
		rssItemsXml,
		latestPost
	};
};

const getRssXml = (posts) => {
	const { rssItemsXml, latestPost } = getRssPostXml(posts);
	return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"
		xmlns:content="http://purl.org/rss/1.0/modules/content/"
		xmlns:wfw="http://wellformedweb.org/CommentAPI/"
		xmlns:dc="http://purl.org/dc/elements/1.1/"
		xmlns:atom="http://www.w3.org/2005/Atom"
		xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
		xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
		xmlns:georss="http://www.georss.org/georss" xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#"
>
		<channel>
			<title>Martinez Media, LLC</title>
			<link>https://www.martinezmedia.net/</link>
			<atom:link href="https://www.martinezmedia.net/rss.xml" rel="self" type="application/rss+xml" />
			<description>tech guru and media geek</description>
			<language>en</language>
			<category>Personal</category>
			<copyright>Copyright 2006 - ${new Date().getFullYear()}, Martinez Media, LLC. All rights reserved.</copyright>
			<lastBuildDate>${latestPost.toRFC2822()}</lastBuildDate>
			${rssItemsXml}
		</channel>
	</rss>`;
};

const renderRss = async () => {
	const postsPage = await PostService.getPaginatedPosts({ page: 1 });
	const posts = postsPage.posts;
	const sitemapXml = getRssXml(posts);
	return sitemapXml;
};

const Rss = () => {
	// We can't render this as part of the normal next.js export process, due to
	// needing to write pure XML with no HTML wrappers
	// We'll call it from a secondary export process
};

Rss.getInitialProps = async ({ res: response }) => {
	const rss = await renderRss();

	// If we're serving in dev, write to the response stream to set content type
	if (response && response.write) {
		response.setHeader('Content-Type', 'text/xml');
		response.write(rss);
		response.end();
	}
};

Rss.render = renderRss;

export default Rss;
