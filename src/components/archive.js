import React from "react"
import PropTypes from "prop-types"

import Article from "../components/article"

const CategoryArchive = ({ list }) => {
	return list.map(({ node }) => {
		// Convert category data to match post data for component
		node.title = node.name
		node.content = "<p>" + node.description + "</p>"

		return (
			<Article
				key={node.id}
				data={node}
				isSingle={false}
				displayMeta={false}
				displayContent={true}
				displayContentFull={false}
			/>
		)
	})
}

CategoryArchive.propTypes = {
	list: PropTypes.array.isRequired,
}

const ArticleArchive = ({
	list,
	displayAuthor,
	displayMeta,
	displayContent,
	displayContentFull,
}) => {
	return <div className="wpc-articles">
		{list.map(({ node }) => (
			<Article
				key={node.id}
				data={node}
				isSingle={false}
				displayAuthor={displayAuthor}
				displayMeta={displayMeta}
				displayContent={displayContent}
				displayContentFull={displayContentFull}
			/>
		))}</div>
}

ArticleArchive.propTypes = {
	list: PropTypes.array.isRequired,
	displayAuthor: PropTypes.bool,
	displayMeta: PropTypes.bool,
	displayContent: PropTypes.bool,
	displayContentFull: PropTypes.bool,
}

ArticleArchive.defaultProps = {
	displayAuthor: false,
	displayMeta: true,
	displayContent: true,
	displayContentFull: false,
}

export { ArticleArchive, CategoryArchive }
