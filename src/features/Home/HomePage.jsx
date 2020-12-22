import { Box, Container, Typography, withStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import NavBar from "../NavBar/navbarComponent";
import AuthenticationPanel from "../Panels/AuthenticationPanel";
import HomePageBg from "../../Assets/HomePage/BGImage.png";
import MainText from "../../Assets/HomePage/Welcome.svg";

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
		backgroundColor: "rgba(0,0,0,0.4)",
		height: "inherit",
	},
	authPanel: {
		margin: "2rem",
	},
	mainText: {
		// background: `url(${MainText}) no-repeat center center /cover`,
		// width: "40rem",
		// height: "15rem",

		// backgroundColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 50%)",
		// opacity: 0.8,
		// borderRadius: 3,
		// border: 0,
		// margin: "0 1rem",
		color: "#F3F3F3",
		// // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
		// "@media (max-width:960px)": {
		// 	fontSize: "0.6rem",
		// },
		// "@media (max-width:355px)": {
		// 	fontSize: "0.5rem",
		// },
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
							<Box
								display="flex"
								justifyContent="center"
								mt="10rem"
							>
								<Grid item md xs={10}>
									<Box
										textAlign="center"
										width="100%"
										m="auto"
									>
										<Box
											className={classes.mainText}
											p="1rem"
										>
											<Typography
												component="h1"
												variant="h2"
											>
												<strong>Ev-Net</strong>
											</Typography>
											<br />
											<Typography
												component="h1"
												variant="h4"
											>
												Don't Miss Anything, Remember
												Everything.
											</Typography>
										</Box>
									</Box>
								</Grid>
							</Box>

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
