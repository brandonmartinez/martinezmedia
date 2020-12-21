const optimizedImages = require('next-optimized-images');
const path = require('path');
const withPlugins = require('next-compose-plugins');

const nextConfig = {
	env: {
		buildId: (process.env.BUILD_BUILDNUMBER || 'local').replace(
			'brandonmartinez_',
			''
		)
	},
	webpack: function (config, { isServer }) {
		// Fix for using fs
		if (!isServer) {
			config.node = {
				fs: 'empty'
			};
		}

		// Loaders
		config.module.rules.push({
			test: /\.md$/,
			use: 'raw-loader'
		});

		// Aliases for contexts
		// TODO: this is being added to next.js soon, and can be done just via jsconfig.json at that point
		const basePath = path.resolve(__dirname);
		config.resolve.alias['~'] = basePath;
		config.resolve.alias['components'] = path.join(basePath, 'src/components');
		config.resolve.alias['images'] = path.join(basePath, 'resources/images');

		return config;
	},
	trailingSlash: true,
	exportPathMap: async (defaultPathMap, { dev }) => {
		if (!dev) {
			// We're going to generate these after the next.js export, remove them
			delete defaultPathMap['/sitemap.xml'];
			delete defaultPathMap['/rss.xml'];
		}

		return defaultPathMap;
	}
};

module.exports = withPlugins(
	[
		[
			optimizedImages,
			{
				optimizeImagesInDev: true,
				inlineImageLimit: -1,
				mozjpeg: {
					quality: 75
				}
			}
		]
	],
	nextConfig
);
