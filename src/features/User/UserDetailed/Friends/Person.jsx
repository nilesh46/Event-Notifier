import { Avatar, Box, Grid, Link, Typography } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		maxWidth: 800,
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

const Person = ({ user }) => {
	const classes = useStyles();

	return (
		<Box
			mx=".1rem"
			my="1rem"
			display="flex"
			alignItems="center"
			key={user.id}
		>
			<Avatar
				alt={user.displayName}
				src={user.photoURL}
				className={classes.avatar}
			></Avatar>
			<Grid
				container
				direction="row"
				alignItems="center"
				justify="space-between"
				className={classes.marginX}
			>
				<Box>
					<Box mb="0.5rem">
						<Typography component="span" variant="h6">
							<Link href={`/profile/${user.id}`}>
								{user.displayName}
							</Link>
						</Typography>
					</Box>
					<Typography
						variant="body1"
						component="span"
						color="textSecondary"
					>
						{user.city}
					</Typography>
				</Box>
			</Grid>
		</Box>
	);
};

export default Person;
