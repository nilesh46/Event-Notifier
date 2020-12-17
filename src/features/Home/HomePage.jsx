import { Box, Container, Grid, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import NavBar from "../NavBar/navbarComponent";
import AuthenticationPanel from "../Panels/AuthenticationPanel";
import HomePageBg from "../../Assets/HomePage/BGImage.png";

const styles = {
	"@global": {
		html: {
			fontSize: ".8rem",
		},
	},
	root: {},
	Bg: {
		height: "100%",
		background: `url(${HomePageBg}) no-repeat center center /cover`,
	},
	darkOverlay: {
		backgroundColor: "rgba(0,0,0,0.2)",
		height: "inherit",
	},
	authPanel: {
		margin: "2rem",
	},
};

class HomePage extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.Bg}>
				<div className={classes.darkOverlay}>
					<NavBar />
					<Container maxWidth="lg" style={{ paddingTop: "6rem" }}>
						{/* Content */}
						<Grid container spacing={2}>
							<Grid item md xs={12}>
								<Box
									display="flex"
									justifyContent="center"
									alignItems="center"
									style={{ height: "100%" }}
								>
									Left Col
								</Box>
							</Grid>

							<Grid item md xs={12}>
								<Box
									display="flex"
									justifyContent="center"
									alignItems="center"
									style={{ minHeight: "100vh" }}
									m="auto"
								>
									<AuthenticationPanel
										className={classes.authPanel}
									/>
								</Box>
							</Grid>
						</Grid>
					</Container>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(HomePage);
