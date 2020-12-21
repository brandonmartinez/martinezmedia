// Custom Components
import Images from 'components/shared/Images';
import Head from 'next/head';

const favicon = Images.requireSiteOriginal('./favicon.png');
const appleTouchIcon = Images.requireSiteOriginal('./apple-touch-icon.png');

const CustomHead = () => (
	<Head>
		{/* Meta */}
		<meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
		<meta
			name='viewport'
			content='target-densitydpi=device-dpi, initial-scale=1.0, user-scalable=no'
		/>
		<link
			rel='alternate'
			type='application/rss+xml'
			title='RSS Feed for brandonmartinez.com'
			href='/rss.xml'
		/>

		{/* Icons */}
		<link rel='shortcut icon' href={favicon} async />

		<link rel='apple-touch-icon' sizes='57x57' href={appleTouchIcon} async />
		<link rel='apple-touch-icon' sizes='72x72' href={appleTouchIcon} async />
		<link rel='apple-touch-icon' sizes='76x76' href={appleTouchIcon} async />
		<link rel='apple-touch-icon' sizes='114x114' href={appleTouchIcon} async />
		<link rel='apple-touch-icon' sizes='120x120' href={appleTouchIcon} async />
		<link rel='apple-touch-icon' sizes='152x152' href={appleTouchIcon} async />
		<link rel='apple-touch-icon' href={appleTouchIcon} async />

		{/* Styles */}
		<link
			href='//fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,400italic,600italic,700italic'
			rel='stylesheet'
			type='text/css'
			async
		/>
		<link
			href='//fonts.googleapis.com/css?family=Oswald:400,300,700'
			rel='stylesheet'
			type='text/css'
			async
		/>
		<link
			rel='stylesheet'
			href='https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'
			integrity='sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh'
			crossOrigin='anonymous'
		/>

		{/* Site/Page Title */}
		<title>Martinez Media | Web, Social, and Design Consulting</title>
	</Head>
);

export default CustomHead;
