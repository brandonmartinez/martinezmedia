import React from 'react';

import {
	CommentCount,
	DiscussionEmbed
} from 'disqus-react';
import { DateTime } from 'luxon';
import Link from 'next/link';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { style } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styled from 'styled-components';

const PostDate = ({ date, className }) => {
	const dt = DateTime.fromISO(date);
	const month = dt.toFormat('LLL');
	const day = dt.toFormat('dd');
	const year = dt.toFormat('yyyy');

	return (
		<div className={className}>
			<span className='month'>{month}</span>
			<span className='day'>{day}</span>
			<span className='year'>{year}</span>
		</div>
	);
};

const StyledPostDate = styled(PostDate)`
	text-align: center;
	border-right: ${(props) => props.theme.borderLight};

	span {
		display: block;
		line-height: 1.3rem;
		font-weight: bold;
		padding: 0.1rem 0;
		color: ${(props) => props.theme.gray};
	}

	.month {
		text-transform: uppercase;
	}

	.month,
	.ear {
		font-size: 1rem;
	}

	.day {
		font-size: 2rem;
	}
`;

const CodeBlock = ({ value, language }) => (
	<SyntaxHighlighter language={language} style={style}>
		{value}
	</SyntaxHighlighter>
);

const StyledPreviewCoverImage = styled.div`
	background-image: url('${(props) => props.backgroundImageUri}');
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
	margin-bottom: ${(props) => props.theme.gutter};
	width: 100%;
	height: 15rem;
`;

const PostMetadata = ({ post, disqusShortname, disqusConfig }) => (
	<Row className='metadata'>
		<Col md='4'>
			{DateTime.fromISO(post.publishedAt).toFormat('LLL dd, yyyy')}
		</Col>
		<Col md='4'>
			<CommentCount shortname={disqusShortname} config={disqusConfig}>
				Comments
			</CommentCount>
		</Col>
		<Col md='4'>{post.categories.join(', ')}</Col>
	</Row>
);

const Post = ({ post, isPreview, className, showMetadata }) => {
	const disqusShortname = 'brandonmartinez';
	const disqusConfig = {
		url: post.absoluteUriWithSlash,
		identifier: post.absoluteUriWithSlash,
		title: post.title
	};

	return (
		<Row className={className}>
			<Col md='2' className='d-none d-md-block'>
				<StyledPostDate date={post.publishedAt} />
			</Col>
			<Col md='10' sm='12' className='content'>
				{isPreview && !!post.coverImageUri && (
					<StyledPreviewCoverImage backgroundImageUri={post.coverImageUri} />
				)}
				<h2>
					<Link href={post.relativeUri} prefetch={false}>
						<a>{post.title}</a>
					</Link>
				</h2>
				{!isPreview && showMetadata && (
					<PostMetadata
						post={post}
						disqusShortname={disqusShortname}
						disqusConfig={disqusConfig}
					/>
				)}

				<ReactMarkdown
					source={isPreview ? post.excerpt : post.content}
					renderers={{ code: CodeBlock }}
					escapeHtml={false}
				/>

				{isPreview && (
					<p className='continue-reading'>
						<Link href={post.relativeUri} prefetch={false}>
							<a>Continue Reading →</a>
						</Link>
					</p>
				)}

				{isPreview && showMetadata && (
					<PostMetadata
						post={post}
						disqusShortname={disqusShortname}
						disqusConfig={disqusConfig}
					/>
				)}

				{!isPreview && (
					<div>
						<DiscussionEmbed
							shortname={disqusShortname}
							config={disqusConfig}
						/>
					</div>
				)}
			</Col>
		</Row>
	);
};

const PostWrapper = ({ dark, isPreview, ...rest }) => (
	<Post isPreview={isPreview} {...rest} />
);
const StyledPost = styled(PostWrapper)`
	margin-bottom: ${(props) => props.theme.gutter};

	h2 a {
		color: ${(props) => (props.dark ? props.theme.white : props.theme.black)};
		font-weight: normal;
	}

	p {
		text-align: justify;
		font-size: 1rem;
		line-height: 1.8rem;
	}

	img {
		max-width: 100%;
		height: auto;
	}

	blockquote {
		border-left: ${(props) => props.theme.border};
		padding: ${(props) => props.theme.gutterLarge};
		background: ${(props) => props.theme.grayLight};
		color: ${(props) => props.theme.black};
	}

	.content {
		padding-bottom: ${(props) =>
			props.isPreview ? props.theme.gutterLarge : 'inherit'};
		margin-bottom: ${(props) =>
			props.isPreview ? props.theme.gutterLarge : 'inherit'};
		border-bottom: ${(props) =>
			props.isPreview && props.showMetadata
				? props.theme.borderLight
				: 'inherit'};

		.metadata {
			margin-top: ${(props) =>
				props.isPreview ? props.theme.gutterLarge : props.theme.gutter};
			margin-bottom: ${(props) => props.theme.gutter};
			color: ${(props) => props.theme.gray};
			text-transform: uppercase;
			font-size: 0.8em;
			font-weight: bold;

			> div {
				border-left: ${(props) => props.theme.borderLight};
				text-align: center;

				&:first-child {
					border-left: none;
					text-align: left;
				}

				@media only screen and (max-width: ${(props) =>
						props.theme.breakpointMedium}) {
					border-left: none;
					text-align: left;
				}
			}
		}

		iframe {
			max-width: 100%;
		}
	}

	.continue-reading,
	.continue-reading a {
		color: ${(props) =>
			props.dark ? props.theme.grayLight : props.theme.grayDark};
	}
`;

export default StyledPost;
