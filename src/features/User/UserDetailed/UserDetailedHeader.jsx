import {
	Avatar,
	Box,
	Grid,
	Paper,
	Typography,
	withStyles,
} from "@material-ui/core";
import React, { Component } from "react";
import { deepOrange } from "@material-ui/core/colors";

const styles = (theme) => ({
	avatar: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
		height: "5rem",
		width: "5rem",
	},
});

class UserDetailedHeader extends Component {
	render() {
		const { classes } = this.props;
		return (
			<Box my="1rem">
				<Paper elevation={3}>
					<Box display="flex" p="1rem" alignItems="center">
						<Avatar
							alt="User Name"
							src={"https://source.unsplash.com/random"}
							className={classes.avatar}
						></Avatar>
						<Box mx="1rem">
							<Grid
								container
								direction="row"
								alignItems="flex-end"
							>
								<Box>
									<Box mb="0.5rem">
										<Typography component="h1" variant="h5">
											User Displayname
										</Typography>
									</Box>
									<Typography
										variant="body1"
										color="textSecondary"
									>
										Occupation
									</Typography>
									<Typography
										variant="body1"
										color="textSecondary"
									>
										Age , Hometown
									</Typography>
								</Box>
							</Grid>
						</Box>
					</Box>
				</Paper>
			</Box>
		);
	}
}

export default withStyles(styles)(UserDetailedHeader);
