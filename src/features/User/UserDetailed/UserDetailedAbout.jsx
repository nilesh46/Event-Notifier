import { Box, Grid, Paper, Typography } from "@material-ui/core";
import React, { Component } from "react";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { format } from "date-fns";
import yellow from "@material-ui/core/colors/yellow";
import red from "@material-ui/core/colors/red";

class UserDetailedAbout extends Component {
	render() {
		const { user } = this.props;

		return (
			<Box my="1rem">
				<Paper elevation={2}>
					<Box p="1rem">
						<Grid container spacing={3}>
							<Grid item md={7} xs={12}>
								<Box
									my="0.5rem"
									display="flex"
									alignItems="center"
									style={{ color: yellow[800] }}
								>
									<SentimentVerySatisfiedIcon fontSize="large" />
									<Typography variant="body1">
										<b>About User</b>
									</Typography>
								</Box>
								<Box mx="1rem">
									<Box mb="0.5rem">
										<Typography variant="body2">
											I am a : <b>{user.occupation}</b>
										</Typography>
									</Box>
									<Box mb="0.5rem">
										<Typography variant="body2">
											Originally from :{" "}
											<b>{user.homeTown}</b>
										</Typography>
									</Box>
									<Box mb="0.5rem">
										<Typography variant="body2">
											Member since :{" "}
											<b>
												{user.createdAt &&
													format(
														new Date(
															parseInt(
																user.createdAt
															)
														),
														"EEEE do, LLL yyyy"
													)}
											</b>
										</Typography>
									</Box>
									<Box mb="0.5rem">
										<Typography
											variant="body2"
											color="textSecondary"
										>
											{user.aboutDesc}
										</Typography>
									</Box>
								</Box>
							</Grid>
							<Grid item md xs={12}>
								<Box
									my="0.5rem"
									display="flex"
									alignItems="center"
									style={{ color: red[700] }}
								>
									<FavoriteBorderIcon fontSize="large" />

									<Typography>
										<b>Interests</b>
									</Typography>
								</Box>
								<Box mx="0.5rem">
									{user.interests &&
										user.interests.map(
											(interest, index) => (
												<Box
													my="0.5rem"
													display="flex"
													alignItems="center"
													key={index}
												>
													<FavoriteIcon
														fontSize="small"
														style={{
															color: red[700],
														}}
													/>
													<Box ml="0.5rem">
														<Typography>
															{interest}
														</Typography>
													</Box>
												</Box>
											)
										)}
								</Box>
							</Grid>
						</Grid>
					</Box>
				</Paper>
			</Box>
		);
	}
}

export default UserDetailedAbout;
