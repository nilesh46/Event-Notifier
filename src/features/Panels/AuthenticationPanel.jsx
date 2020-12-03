import React, { Component } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import SignUpPanel from "./SignUpPanel";
import SignInPanel from "./SignInPanel";
import OAuthPanel from "./OAuthPanel";

const TabPanel = (props) => {
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
					<div>{children}</div>
				</Box>
			)}
		</div>
	);
};

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
};

const styles = {
	root: {},
	panelsBg: {
		backgroundColor: "#fff",
	},
};

class AuthenticationPanel extends Component {
	state = { value: 0 };

	handleChange = (event, newValue) => {
		this.setState({ value: newValue });
	};

	render() {
		const { classes, theme } = this.props;
		const { value } = this.state;
		return (
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
						<Tab label="Sign Up" {...a11yProps(0)} />
						<Tab label="Log In" {...a11yProps(1)} />
					</Tabs>
				</AppBar>
				<SwipeableViews
					axis={theme.direction === "rtl" ? "x-reverse" : "x"}
					index={value}
				>
					<TabPanel
						value={value}
						index={0}
						dir={theme.direction}
						className={classes.panelsBg}
					>
						<SignUpPanel handleChange={this.handleChange} />
					</TabPanel>
					<TabPanel
						value={value}
						index={1}
						dir={theme.direction}
						className={classes.panelsBg}
					>
						<SignInPanel handleChange={this.handleChange} />
					</TabPanel>
				</SwipeableViews>
				<OAuthPanel />
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(AuthenticationPanel);
