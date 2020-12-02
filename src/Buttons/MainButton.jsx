import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";

const style = (theme) => ({
	root: {
		background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
		borderRadius: 3,
		border: 0,
		margin: "0 1rem",
		color: "white",
		boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
		"@media (max-width:960px)": {
			fontSize: "0.6rem",
		},
		"@media (max-width:355px)": {
			fontSize: "0.5rem",
		},
	},
});

class MainButton extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<Button
				className={classes.root}
				component={Link}
				to={this.props.link}
				variant="contained"
			>
				{this.props.buttonTitle}
			</Button>
		);
	}
}

export default withStyles(style)(MainButton);
