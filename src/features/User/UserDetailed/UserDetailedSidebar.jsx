import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { Grid } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Paper } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import Person from "./Friends/Person";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

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
				<Box p={3}>
					<Typography>{children}</Typography>
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

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		maxWidth: 800,
		overFlow: "scrollY",
	},
	avatar: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
		height: "5rem",
		width: "5rem",
	},
	marginX: {
		marginLeft: "1rem",
		marginRight: "1rem",
	},
}));

const UserDetailedSidebar = ({ followers, followings }) => {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	return (
		<Box my="1rem" style={{ maxWidth: 800 }}>
			<Paper elevation={2}>
				<Typography component="h1" variant="h5">
					Friends
				</Typography>
				<Box my="1rem">
					<div className={classes.root}>
						<AppBar position="static" color="default">
							<Tabs
								value={value}
								onChange={handleChange}
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
							axis={theme.direction === "rtl" ? "x-reverse" : "x"}
							index={value}
							onChangeIndex={handleChangeIndex}
						>
							<TabPanel
								value={value}
								index={0}
								dir={theme.direction}
							>
								<Grid
									container
									direction="row"
									alignItems="center"
									justify="space-between"
								>
									{followings &&
										followings.map((following) => (
											<Person
												user={following}
												key={following.id}
											/>
										))}
								</Grid>
							</TabPanel>
							<TabPanel
								value={value}
								index={1}
								dir={theme.direction}
							>
								<Grid
									container
									direction="row"
									alignItems="center"
									justify="space-between"
								>
									{followers &&
										followers.map((following) => (
											<Person
												user={following}
												key={following.id}
											/>
										))}
								</Grid>
							</TabPanel>
						</SwipeableViews>
					</div>
				</Box>
			</Paper>
		</Box>
	);
};

const query = ({ auth }) => {
	return [
		{
			collection: "users",
			doc: auth.uid,
			subcollections: [{ collection: "following" }],
			storeAs: "following",
		},
		{
			collection: "users",
			doc: auth.uid,
			subcollections: [{ collection: "followers" }],
			storeAs: "followers",
		},
	];
};

const mapStateToProps = (state) => ({
	followings: state.firestore.ordered.following,
	followers: state.firestore.ordered.followers,
	auth: state.firebase.auth,
});

export default compose(
	connect(mapStateToProps),
	firestoreConnect((props) => query(props))
)(UserDetailedSidebar);
