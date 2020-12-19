import {
	Avatar,
	Box,
	Button,
	Grid,
	Paper,
	Typography,
	withStyles,
} from "@material-ui/core";
import React, { Component } from "react";
import { deepOrange } from "@material-ui/core/colors";
import { connect } from "react-redux";
import { followUser, unfollowUser } from "../../../redux/actions";
import { Link } from "react-router-dom";

const styles = (theme) => ({
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
});

class UserDetailedHeader extends Component {
	render() {
		const {
			classes,
			user,
			followUser,
			unfollowUser,
			isCurrentUser,
			isFollowing,
		} = this.props;
		return (
			<Box my="1rem" style={{ maxWidth: 800 }}>
				<Paper elevation={3}>
					<Box display="flex" p="1rem" alignItems="center">
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
									<Typography component="h1" variant="h5">
										{user.displayName}
									</Typography>
								</Box>
								<Typography
									variant="body1"
									color="textSecondary"
								>
									{user.occupation}
								</Typography>
								<Typography
									variant="body1"
									color="textSecondary"
								>
									{user.homeTown}
								</Typography>
							</Box>
							<Box>
								{isCurrentUser && (
									<Button
										variant="outlined"
										color="secondary"
										component={Link}
										to={`/settings/basic`}
									>
										Edit Profile
									</Button>
								)}
								{!isCurrentUser && !isFollowing && (
									<Button
										variant="outlined"
										color="secondary"
										onClick={() => followUser(user)}
									>
										Follow User
									</Button>
								)}
								{!isCurrentUser && isFollowing && (
									<Button
										variant="outlined"
										color="secondary"
										onClick={() => unfollowUser(user)}
									>
										Unfollow User
									</Button>
								)}
							</Box>
						</Grid>
					</Box>
				</Paper>
			</Box>
		);
	}
}

const actions = {
	followUser,
	unfollowUser,
};

export default connect(null, actions)(withStyles(styles)(UserDetailedHeader));
// uVrhM23A75SmLikNM4zl6VQeQbw1;
