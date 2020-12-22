import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { Box, Grid, IconButton } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary">
			{"Copyright © "}
			<Link color="inherit" href="Future Website Link">
				Ev-Net
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	footer: {
		padding: theme.spacing(3, 2),
		marginTop: "auto",
		width: "100%",
		// bottom: 0,
		// position: "fixed",
		zIndex: 200,
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[500]
				: "#333333",
	},
}));

export default function StickyFooter() {
	const classes = useStyles();

	return (
		<footer className={classes.footer}>
			<Container maxWidth="md">
				<Grid container direction="row" justify="space-between">
					<Box>
						<Typography variant="body1">
							This is official Ev-Net Website
						</Typography>
						<Copyright />
					</Box>
					<Box>
						<Typography variant="body1">Contact Us :</Typography>
						<Link href="mailto:guptanilesh2300@gmail.com">
							project.id@gmail.com
						</Link>
					</Box>
					<Box>
						<IconButton>
							<GitHubIcon fontSize="large" />
						</IconButton>
					</Box>
				</Grid>
			</Container>
		</footer>
	);
}
