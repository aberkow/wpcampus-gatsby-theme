import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import Layout from "../components/layout"
import { SearchLayout, sanitizeSearchTerm } from "../components/search"

const SearchTemplate = (props) => {

	// Pull wildcard from search URL as default search term.
	let defaultSearchQuery = props["*"]
	if (defaultSearchQuery) {
		defaultSearchQuery = sanitizeSearchTerm(defaultSearchQuery)
	}

	// Don't index or follow if there's a search term.
	const metaRobots = []
	if (defaultSearchQuery != "") {
		metaRobots.push("nofollow")
		metaRobots.push("noindex")
	}

	const crumbs = {
		crumb: {
			path: "/search/",
			isCurrent: true,
			text: "Search"
		}
	}

	// @TODO add meta description?

	return (
		<Layout heading="Search" crumbs={crumbs} path={props.path} metaRobots={metaRobots}>
			<p>If you can&lsquo;t find what you&lsquo;re looking for, please <Link to="/about/contact" aria-label="Contact us and let us know">let us know</Link>.</p>
			<SearchLayout searchQuery={defaultSearchQuery} />
		</Layout>
	)
}

SearchTemplate.propTypes = {
	//"*": PropTypes.string,
	path: PropTypes.string.isRequired
}

export default SearchTemplate