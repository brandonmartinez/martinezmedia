import React from 'react';

import ThemeProviderTheme from 'components/layout/ThemeProviderTheme';
// Site Styling
import Images from 'components/shared/Images';
import { DefaultSeo } from 'next-seo';
import NextApp from 'next/app';
import { ThemeProvider } from 'styled-components';

export default class App extends NextApp {
	render() {
		const { Component, pageProps } = this.props;
		const openGraphImage = Images.requireSiteOriginal('./opengraph-large.png');
		return (
			<ThemeProvider theme={ThemeProviderTheme}>
				<DefaultSeo
					openGraph={{
						type: 'website',
						locale: 'en_US',
						url: 'https://www.martinezmedia.net/',
						site_name: 'Martinez Media, LLC',
						images: [
							{
								url: openGraphImage,
								width: 1200,
								height: 630,
								alt: 'Martinez Media, LLC'
							}
						]
					}}
					twitter={{
						handle: '@martinezmediami',
						site: '@martinezmediami',
						cardType: 'summary_large_image'
					}}
					titleTemplate='%s | Martinez Media, LLC'
				/>
				<Component {...pageProps} />
			</ThemeProvider>
		);
	}
}
