import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import { Divider, List, ListItem, withStyles } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Paper } from "@material-ui/core";
import Person from "./Friends/Person";
import { Link } from "react-router-dom";
import { Component } from "react";
import { getFirebase } from "react-redux-firebase";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={1}>
					<div>{children}</div>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

const styles = (theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
	},

	linksSimple: {
		textDecoration: "none",
		color: "#000",
	},
});

class UserDetailedSidebar extends Component {
	state = {
		value: 0,
		followers: [],
		followings: [],
		unsubscribeFollowers: null,
		unsubscribeFollowing: null,
	};

	componentDidMount = () => {
		const firestore = getFirebase().firestore();
		const userId = window.location.pathname.split("/")[2];
		const unsubscribeFollowers = firestore
			.collection("users")
			.doc(userId)
			.collection("followers")
			.onSnapshot((querySnap) => {
				let arr = [];
				querySnap.forEach(function (doc) {
					arr.push({ id: doc.id, ...doc.data() });
				});
				this.setState({ followers: arr });
			});
		const unsubscribeFollowing = firestore
			.collection("users")
			.doc(userId)
			.collection("following")
			.onSnapshot((querySnap) => {
				let arr = [];
				querySnap.forEach(function (doc) {
					arr.push({ id: doc.id, ...doc.data() });
				});
				this.setState({ followings: arr });
			});

		this.setState({ unsubscribeFollowers, unsubscribeFollowing });
	};

	componentWillUnmount() {
		this.state.unsubscribeFollowers();
		this.state.unsubscribeFollowing();
	}

	handleChange = (event, newValue) => {
		this.setState({ value: newValue });
	};

	handleChangeIndex = (index) => {
		this.setState({ value: index });
	};

	render() {
		const { classes, theme } = this.props;
		const { value, followers, followings } = this.state;

		return (
			<Box my="1rem">
				<Paper elevation={2}>
					<Box textAlign="center" p="1rem">
						<Typography component="h1" variant="h5" color="primary">
							<b>FRIENDS</b>
						</Typography>
					</Box>
					<Box>
						<div className={classes.root}>
							<AppBar position="static" color="default">
								<Tabs
									value={value}
									onChange={this.handleChange}
									indicatorColor="primary"
									textColor="primary"
									variant="fullWidth"
									aria-label="full width tabs example"
								>
									<Tab label="Following" {...a11yProps(0)} />
									<Tab label="Followers" {...a11yProps(1)} />
								</Tabs>
							</AppBar>
							<SwipeableViews
								axis={
									theme.direction === "rtl"
										? "x-reverse"
										: "x"
								}
								index={value}
								onChangeIndex={this.handleChangeIndex}
							>
								<TabPanel
									value={value}
									index={0}
									dir={theme.direction}
								>
									<Box
										style={{
											maxHeight: "40vh",
											overflowY: "auto",
										}}
									>
										<List component="div" disablePadding>
											{followings &&
												followings.map((following) => (
													<div key={following.id}>
														<Link
															to={`/profile/${following.id}`}
															className={
																classes.linksSimple
															}
														>
															<ListItem button>
																<Person
																	user={
																		following
																	}
																/>
															</ListItem>
														</Link>
														<Divider />
													</div>
												))}
										</List>
									</Box>
								</TabPanel>
								<TabPanel
									value={value}
									index={1}
									dir={theme.direction}
								>
									<Box
										style={{
											maxHeight: "40vh",
											overflowY: "auto",
										}}
									>
										<List component="div" disablePadding>
											{followers &&
												followers.map((follower) => (
													<div key={follower.id}>
														<Link
															to={`/profile/${follower.id}`}
															className={
																classes.linksSimple
															}
														>
															<ListItem button>
																<Person
																	user={
																		follower
																	}
																/>
															</ListItem>
														</Link>
														<Divider />
													</div>
												))}
										</List>
									</Box>
								</TabPanel>
							</SwipeableViews>
						</div>
					</Box>
				</Paper>
			</Box>
		);
	}
}

export default withStyles(styles, { withTheme: true })(UserDetailedSidebar);
