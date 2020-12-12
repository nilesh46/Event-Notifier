import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Box, Divider, Grid, SvgIcon, withStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Skeleton } from "@material-ui/lab";

const styles = {
	root: {
		minWidth: "15rem",
		maxWidth: "50rem",
		padding: 15,
		margin: 20,
	},
	pos: {
		marginBottom: "1.5rem",
		marginLeft: "1rem",
	},
	media: {
		height: 0,
		paddingTop: "56.25%",
		margin: "0.7rem",
		borderRadius: "0.7rem",
		marginBottom: "1rem",
	},
	large: {
		height: "4.5rem",
		width: "4.5rem",
	},
};

class EventListItemSkeleton extends Component {
	render() {
		const { classes } = this.props;

		return (
			<Card className={classes.root} variant="outlined">
				{/* Event Image */}

				<Grid item md xs={12}>
					<Skeleton
						animation="wave"
						variant="rect"
						className={classes.media}
					></Skeleton>
				</Grid>

				<Grid container spacing={1}>
					{/* Event Details */}

					<Grid item md>
						<CardContent>
							<Grid
								container
								direction="column"
								alignItems="flex-start"
							>
								<Grid item>
									<Box display="flex" alignItems="center">
										<Box>
											<Skeleton
												animation="wave"
												variant="circle"
											>
												<Avatar
													className={classes.large}
												/>
											</Skeleton>
										</Box>
										<Box ml="1rem">
											<Skeleton
												animation="wave"
												variant="text"
												width={50}
											></Skeleton>
											<Skeleton
												animation="wave"
												variant="text"
												width={100}
											></Skeleton>
										</Box>
									</Box>
								</Grid>

								<Box>
									{/* Date and Time of the event */}
									<Box
										display="flex"
										alignItems="center"
										my="0.5rem"
									>
										<Skeleton
											animation="wave"
											variant="circle"
										>
											<SvgIcon fontSize="small" />
										</Skeleton>

										<Box mx="0.5rem">
											<Skeleton
												animation="wave"
												variant="text"
												width={100}
											></Skeleton>
											<Skeleton
												animation="wave"
												variant="text"
												width={100}
											></Skeleton>
										</Box>
									</Box>
									<Divider />
									{/* Location of the event */}
									<Box
										display="flex"
										alignItems="center"
										my="0.5rem"
									>
										<Skeleton
											animation="wave"
											variant="circle"
										>
											<SvgIcon fontSize="small" />
										</Skeleton>

										<Box mx="0.5rem">
											<Skeleton
												animation="wave"
												variant="text"
												width={150}
											></Skeleton>
										</Box>
									</Box>
								</Box>
							</Grid>
						</CardContent>
					</Grid>
				</Grid>
				<Skeleton
					animation="wave"
					variant="text"
					width="100%"
				></Skeleton>
				<Skeleton
					animation="wave"
					variant="text"
					width="100%"
				></Skeleton>
				<Skeleton
					animation="wave"
					variant="text"
					width="80%"
				></Skeleton>
			</Card>
		);
	}
}

export default withStyles(styles)(EventListItemSkeleton);
