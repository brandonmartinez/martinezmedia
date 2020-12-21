import { join } from 'path';
import fs from 'fs';
const { writeFile } = fs.promises;

// Custom Components and Services
// TODO: don't use the pages, move that code into a proper service
import SiteMap from '../pages/sitemap.xml';
import Rss from '../pages/rss.xml';

(async () => {
	// Assuming this is being called from the project root
	const workingDirectory = process.cwd();
	const outDirectory = join(workingDirectory, 'out');

	// Generate files and write them
	const sitemap = await SiteMap.render();
	const sitemapPath = join(outDirectory, 'sitemap.xml');
	await writeFile(sitemapPath, sitemap);

	// Generate files and write them
	const rss = await Rss.render();
	const rssPath = join(outDirectory, 'rss.xml');
	await writeFile(rssPath, rss);
})();
