import { Box, Card, Grid, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
	root: {},
	media: {
		height: 0,
		paddingTop: "56.25%",
	},
}));

const UserPhotosSkelton = () => {
	const classes = useStyles();
	return (
		<Fragment>
			<Grid direction="row" container spacing={3}>
				{[...new Array(5)].map((obj, index) => (
					<Grid item key={index} xs={12} md={3}>
						<Card className={classes.root}>
							<Skeleton
								variant="rect"
								animation="wave"
								className={classes.media}
							/>
							<Box height="2rem"></Box>
						</Card>
					</Grid>
				))}
			</Grid>
		</Fragment>
	);
};

export default UserPhotosSkelton;
