import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

// @TODO remove search and pages menu item
const NavPrimaryItems = [
	{
		path: "/about/",
		text: "About",
		children: [
			{ path: "/about/contributors/", text: "Contributors" },
			{ path: "/about/partners/", text: "Partners" },
			{ path: "/about/mascots/", text: "Mascots" },
			{ path: "/about/governance/", text: "Governance" },
			{ path: "/about/guidelines/", text: "Guidelines" },
			{ path: "/about/newsletter/", text: "Our newsletter" },
			{ path: "/about/contact/", text: "Contact us" },
		]
	},
	{
		path: "/blog/",
		text: "Our blog",
		children: [
			{
				path: "/blog/categories/",
				text: "Categories"
			}
		]
	},
	{
		path: "/community/",
		text: "Our community",
		children: [
			{
				path: "/community/membership/",
				text: "Become a member"
			},
			{
				path: "/community/slack/",
				text: "Slack",
				children: [
					{
						path: "/community/slack/channels/",
						text: "Slack channels",
					}
				]
			},
			{
				path: "/community/sme/",
				text: "Subject matter experts"
			},
			{
				path: "/community/calendar/",
				text: "Calendar of events"
			},
			{
				path: "/community/swag/",
				text: "Swag"
			}
		]
	},
	{
		path: "/conferences/",
		text: "Our conferences",
		children: [
			{
				href: "https://2021.wpcampus.org/",
				text: "WPCampus 2021"
			},
			{
				href: "https://2020.wpcampus.org/",
				text: "WPCampus 2020"
			},
			{
				href: "https://2019.wpcampus.org/",
				text: "WPCampus 2019"
			},
			{
				href: "https://2018.wpcampus.org/",
				text: "WPCampus 2018"
			},
			{
				href: "https://2017.wpcampus.org/",
				text: "WPCampus 2017"
			},
			{
				href: "https://2016.wpcampus.org/",
				text: "WPCampus 2016"
			},
			{
				href: "https://online.wpcampus.org/",
				text: "WPCampus Online"
			}
		]
	},
	{ path: "/learning/", text: "Learning" },
	{ path: "/jobs/", text: "Job board" },
	{ path: "/podcast/", text: "Podcast" },
	{ href: "https://shop.wpcampus.org/", text: "Shop" },
	{ path: "/search/", text: "Search" },
	{ path: "/pages/", text: "Pages" }
]

const NavLink = ({ item }) => {
	if (!item.path || !item.text) {
		return ""
	}
	const isActiveParent = ({ isCurrent, isPartiallyCurrent }) => {
		const attrs = {
			className: "nav-link"
		}
		if (isCurrent) {
			attrs.className += " nav-link--current"
		} else if (isPartiallyCurrent) {
			attrs.className += " nav-link--current-parent"
		}
		return attrs
	}
	const linkAttr = {
		getProps: isActiveParent,
		to: item.path
	}
	if (item.aria_label) {
		linkAttr["aria-label"] = item.aria_label
	}
	return (
		<Link {...linkAttr}>
			{item.text}
		</Link>
	)
}

NavLink.propTypes = {
	item: PropTypes.object.isRequired,
}

const NavAnchor = ({ item }) => {
	if (!item.href || !item.text) {
		return ""
	}
	const anchorAttr = {
		href: item.href
	}
	if (item.classes) {
		anchorAttr.classes = item.classes
	}
	if (item.aria_label) {
		anchorAttr["aria-label"] = item.aria_label
	}
	if (item.title) {
		anchorAttr.title = item.title
	}
	if (item.target) {
		anchorAttr.target = item.target
	}
	return (<a {...anchorAttr}>{item.text}</a>)
}

NavAnchor.propTypes = {
	item: PropTypes.object.isRequired,
}

const NavItem = ({ item }) => {
	return (
		<li className="nav-listitem">
			{item.path ? <NavLink item={item} /> : <NavAnchor item={item} />}
			{item.children && item.children.length ? (
				<ul className="wpc-nav__sub">
					{item.children.map((child, i) => (
						<NavItem key={i} item={child} />
					))}
				</ul>
			) : ""}
		</li>
	)
}

NavItem.propTypes = {
	item: PropTypes.object.isRequired,
}

const NavList = ({ list }) => {
	return (
		<ul>
			{list.map((item, i) => (
				<NavItem key={i} item={item} />
			))}
		</ul>
	)
}

NavList.propTypes = {
	list: PropTypes.array.isRequired,
}

const Nav = ({ id, classes, aria_label, list, children }) => {
	const navAttr = {}
	if (id) {
		navAttr.id = id
	}
	if (classes) {
		navAttr.className = classes
	}
	if (aria_label) {
		navAttr["aria-label"] = aria_label
	}
	return (
		<nav {...navAttr}>
			{children}
			<NavList list={list} />
		</nav>
	)
}

Nav.propTypes = {
	id: PropTypes.string,
	classes: PropTypes.string,
	aria_label: PropTypes.string,
	list: PropTypes.array.isRequired,
	children: PropTypes.object,
}

export { Nav, NavAnchor, NavPrimaryItems }
