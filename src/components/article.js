import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import ReactHtmlParser from "react-html-parser"

const getArticleContent = (data, displayContentFull) => {
  if (!displayContentFull && data.excerpt) {
    return data.excerpt
  }
  if (data.content) {
    return data.content
  }
  return null
}

const ArticleCategories = ({ list }) => (
  <ul>
    {list.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
)

const ArticleTitle = ({ data, isSingle }) => {
  const className = "article__title"
  if (isSingle) {
    return <h1 className={className}>{data.title}</h1>
  }
  return (
    <h2 className={className}>
      <Link to={data.path}>{data.title}</Link>
    </h2>
  )
}

const ArticleMeta = ({ data }) => {
  return (
    <ul className="article__metas">
      <li className="article__meta article__meta--date">
        {data.dateFormatted}
      </li>
      <li className="article__meta article__meta--author">Need to get author name: {data.author}</li>
      {data.categories ? (
        <li className="article__meta article__meta--categories">
          Categories:
          <ArticleCategories list={data.categories} />
        </li>
      ) : null}
    </ul>
  )
}

const ArticleContent = ({ data, displayContentFull }) => {
  let articleContent = getArticleContent(data, displayContentFull)
  let className = `article__content`
  if (displayContentFull) {
    className += ` article__content--full`
  } else {
    className += ` article__content--excerpt`
  }
  return <div className={className}>{ReactHtmlParser(articleContent)}</div>
}

// @TODO Our articles can have multiple authors. Only seems to pull one author.
const Article = ({ data, isSingle, displayMeta, displayContent, displayContentFull }) => {
  return (
    <article>
      <ArticleTitle data={data} isSingle={isSingle} />
      {displayMeta ? <ArticleMeta data={data} /> : null}
      {displayContent ? (
        <ArticleContent data={data} displayContentFull={displayContentFull} />
      ) : null}
    </article>
  )
}

ArticleCategories.propTypes = {
  list: PropTypes.array.isRequired,
}

ArticleTitle.propTypes = {
  data: PropTypes.object.isRequired,
  isSingle: PropTypes.bool,
}

ArticleMeta.propTypes = {
  data: PropTypes.object.isRequired,
}

ArticleContent.propTypes = {
  data: PropTypes.object.isRequired,
  displayContentFull: PropTypes.bool,
}

ArticleContent.defaultProps = {
  displayContentFull: false,
}

Article.propTypes = {
  data: PropTypes.object.isRequired,
  isSingle: PropTypes.bool,
  displayMeta: PropTypes.bool,
  displayContent: PropTypes.bool,
  displayContentFull: PropTypes.bool,
}

Article.defaultProps = {
  displayMeta: true,
  displayContent: true,
  displayContentFull: false,
  isSingle: true,
}

export default Article
