import {
	Box,
	Container,
	Grid,
	Typography,
	withStyles,
} from "@material-ui/core";
import React from "react";

const styles = {
	"@global": {
		html: {
			fontSize: ".8rem",
		},
	},
	root: {},
	Bg: {
		height: "121vh",
		zIndex: 500,
		width: "100%",
		position: "absolute",
		marginTop: "-12rem",
		left: "0",
		background: `url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif) no-repeat center center /cover`,
	},
};

class NotFound extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.Bg}>
				<Container maxWidth="lg" style={{ paddingTop: "6rem" }}>
					{/* Content */}
					<Grid container spacing={2}>
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							style={{ marginTop: "15rem" }}
							m="auto"
						>
							<Typography component="h1" variant="h2">
								<strong>404 Page Not Found</strong>
							</Typography>
						</Box>
					</Grid>
				</Container>
			</div>
		);
	}
}

export default withStyles(styles)(NotFound);
