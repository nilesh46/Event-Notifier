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
		minHeight: "100vh",
		// width: "100vw",
		background: `url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif) no-repeat center center /cover`,
	},
	textStyle: {
		color: "rgba(0,0,0,0.7)",
		position: "absolute",
		top: "8rem",
	},
};

class NotFound extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.Bg}>
				<Container maxWidth="xl">
					{/* Content */}
					<Grid container spacing={2}>
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							m="auto"
						>
							<Typography
								component="h1"
								variant="h4"
								className={classes.textStyle}
							>
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
