import React, { Component } from "react"
import { graphql, Link } from "gatsby"
import PropTypes from "prop-types"
import ReactHtmlParser from "react-html-parser"

import Layout from "../components/layout"
import SEO from "../components/seo"

class Post extends Component {
  render() {
    const post = this.props.data.wordpressPost

    return (
      <Layout>
        <SEO title={post.title} />
        <h1>{post.title}</h1>
        <div>{ReactHtmlParser(post.content)}</div>
        <Link to="/">Go home</Link>
      </Layout>
    )
  }
}

Post.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default Post

export const postQuery = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      id
      slug
      date
      title
      subjects
      status
      excerpt
      content
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
