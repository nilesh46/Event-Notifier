import { Box, Grid, Paper, Typography } from "@material-ui/core";
import React, { Component } from "react";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

class UserDetailedAbout extends Component {
	render() {
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
								>
									<SentimentVerySatisfiedIcon fontSize="large" />
									<Typography variant="body1">
										<b>About User Displayname</b>
									</Typography>
								</Box>
								<Box mx="1rem">
									<Box mb="0.5rem">
										<Typography variant="body2">
											I am a : <b>Occupation</b>
										</Typography>
									</Box>
									<Box mb="0.5rem">
										<Typography variant="body2">
											Originally from : <b>Hometown</b>
										</Typography>
									</Box>
									<Box mb="0.5rem">
										<Typography variant="body2">
											Member since :{" "}
											<b>Created at date</b>
										</Typography>
									</Box>
									<Box mb="0.5rem">
										<Typography
											variant="body2"
											color="textSecondary"
										>
											About Description Lorem ipsum dolor
											sit amet consectetur adipisicing
											elit. Hic odit commodi debitis
											eligendi aliquid, repellat est
											officiis provident soluta neque!
										</Typography>
									</Box>
								</Box>
							</Grid>
							<Grid item md xs={12}>
								<Box
									my="0.5rem"
									display="flex"
									alignItems="center"
								>
									<FavoriteBorderIcon fontSize="large" />
									<Typography>
										<b>Interests</b>
									</Typography>
								</Box>
								<Box mx="0.5rem">
									<Box
										my="0.5rem"
										display="flex"
										alignItems="center"
									>
										<FavoriteBorderIcon fontSize="small" />
										<Typography>Interest 1</Typography>
									</Box>
									<Box
										my="0.5rem"
										display="flex"
										alignItems="center"
									>
										<FavoriteBorderIcon fontSize="small" />
										<Typography>Interest 2</Typography>
									</Box>
									<Box
										my="0.5rem"
										display="flex"
										alignItems="center"
									>
										<FavoriteBorderIcon fontSize="small" />
										<Typography>Interest 3</Typography>
									</Box>
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
