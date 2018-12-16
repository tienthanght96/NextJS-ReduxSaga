import React from 'react'
import { Row, Col, Icon } from 'antd'
import Link from 'next/link'
import { asserts } from '../../utils/config'
import ButtonBookmark from '../ButtonBookmark';
import TotalCommentArticle from '../TotalComment';

const ArticleCard = ({ article, type, onHandleBookmarkSuccess }) => {
	
	if(!article || !article.id) return null;

	if (type === 'horizontal') {
		return (
			<article className="post-item post-tran horizontal">
				<Row className="row">
					<Col
						className="col-md-4"
						span={8}
						style={{ padding: '1rem 1rem 1rem 0' }}
					>
						<div className="article-image">
							<span className="bg-rgb horizontal" />
							<div
								className="post-image-lazy horizontal"
								style={{
									backgroundImage: `url(${article.picture || asserts.noImage})`,
									backgroundSize: article.picture ? 'cover' : 'contain' 
								}}
							>
								<a />
							</div>
							<a style={{ display: 'block', position: 'relative' }} />
						</div>
					</Col>
					<Col className="col-md-8" span={16} style={{ padding: '1rem' }}>
						<div className="article-content-horizontal">
							{	(article.category && article.category.name) &&
								<span className="post-cat horizontal">
									<a href="" title="">
										{article.category.name}
									</a>
								</span>
							}
							<div className="entry-header">
								<h3 className="entry-title">
									<Link href={`/article?id=${article.id}`}>
										<a>
											{article.title}
										</a>
									</Link>
								</h3>
							</div>
							<div className="article-meta">
								<Row justify="space-between" type="flex">
									<div>
										{	(article.author) &&
											<span className="left-article-meta" style={{ marginRight: 10 }}>
												{/* <FontIonic.IoAndroidPerson /> */}
												<span className="author vcard">
													{article.author}
												</span>
											</span>
										}
										<span
											className="has-text-danger right-article-meta"
										>
											<Icon
												type="clock-circle"
												theme="outlined"
												style={{ marginRight: 5 }}
											/>
											{/* <FontIonic.IoClock /> */}
											<span className="has-text-danger">
												{article.date}
											</span>
										</span>
									</div>
									<div style={{ paddingRight: 20 }}>
										<TotalCommentArticle article_id={article.id} />
										{/* <LikeArticleContainer status={article.status} article_id={article.id}  /> */}
										<ButtonBookmark
											article_id={article.id}
											checkBookmark={article.checkBookmark}
											onHandleBookmarkSuccess={onHandleBookmarkSuccess}
										/>
									</div>
								</Row>
							</div>
							<div className="entry-content">
								<p>
									{article.sapo}
								</p>
							</div>
						</div>
					</Col>
				</Row>
			</article>
		)
	}

	if (type === 'vertical') {
		return (
			<Col sm={6} md={6} lg={6} style={{ padding: '1rem 1rem 1rem 0' }}>
				<article className="post-item post-tran-short-vertical col-md-4 col-sm-4 col-sm-6">
					<div className="top-article-vertical">
						{	(article.category) &&
							<span className="post-cat vertical">
								<a href="" title="">
									{article.category.name}
								</a>
							</span>
						}
						<div className="article-image-short-vertical">
							<span className="bg-rgb horizontal" />
							<div
								className="post-image-lazy"
								style={{
									backgroundImage: `url(${article.picture || asserts.noImage})`,
									backgroundSize: article.picture ? 'cover' : 'contain' 
								}}
							>
								<a />
							</div>
							<a style={{ display: 'block', position: 'relative' }} />
						</div>
					</div>
					<div className="bottom-article-vertical">
						<div className="article-content-vertical">
							<div className="entry-header">
								<h3 className="entry-title-vertical">
									<Link href={`/article?id=${article.id}`}>
										<a>{article.title || '...'}</a>
									</Link>
								</h3>
							</div>
							<div className="article-meta vertical">
								<div>
									<Row type="flex" justify="space-between" style={{ alignItems: 'center' }}>
										<div>
											<span className="right-article-meta vertical">
												<Icon
													type="clock-circle"
													theme="outlined"
													style={{ marginRight: 5 }}
												/>
												<span>{article.date}</span>
											</span>
										</div>
										<div>
											<TotalCommentArticle article_id={article.id} />
											{/* <LikeArticleContainer status={article.status} article_id={article.id}  /> */}
											<ButtonBookmark
												article_id={article.id}
												checkBookmark={article.checkBookmark}
												onHandleBookmarkSuccess={onHandleBookmarkSuccess}
											/>
										</div>
									</Row>
								</div>
							</div>
						</div>
					</div>
				</article>
			</Col>
		)
	}
}

export default ArticleCard
