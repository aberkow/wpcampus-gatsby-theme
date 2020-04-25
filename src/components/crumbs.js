import React from "react"
import PropTypes from "prop-types"

import { Nav } from "../components/nav"

const Crumbs = ({ classes, crumbs }) => {

	const breadcrumbs = []

	let node = crumbs
	while (node && node.crumb) {

		breadcrumbs.push(node.crumb)

		if (node.parent_element) {
			node = node.parent_element
		} else {
			node = false
			break
		}
	}

	if (!breadcrumbs.length) {
		return null
	}

	// Always add home crumb.
	breadcrumbs.push({ path: "/", text: "Home" })

	breadcrumbs.reverse()

	const navAttr = {
		classes: "wpc-crumbs",
		aria_label: "Breadcrumbs",
		list: breadcrumbs
	}

	if (classes) {
		navAttr.classes += ` ${classes}`
	}

	return (
		<Nav {...navAttr} />
	)
}

Crumbs.propTypes = {
	classes: PropTypes.string,
	crumbs: PropTypes.object
}

export default Crumbs
