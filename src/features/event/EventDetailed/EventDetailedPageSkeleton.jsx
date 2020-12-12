import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import {
	Box,
	Divider,
	Grid,
	ListItem,
	ListItemIcon,
	Paper,
	SvgIcon,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const styles = (theme) => ({
	root: {
		marginTop: "1rem",
		marginBottom: "1rem",
		backgroundColor: "#F5F5F5",
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
		cursor: "pointer",
	},
});

class EventDetailedPageSkeleton extends Component {
	render() {
		const { classes } = this.props;

		return (
			<Grid container spacing={3}>
				<Grid item md={8} xs={12}>
					<Card className={classes.root}>
						<CardHeader
							avatar={
								<Skeleton animation="wave" variant="circle">
									<Avatar />
								</Skeleton>
							}
							title={
								<Skeleton
									animation="wave"
									variant="text"
									width="100%"
								/>
							}
							subheader={
								<Skeleton
									animation="wave"
									variant="text"
									width="50%"
								/>
							}
						/>
						<Skeleton
							animation="wave"
							variant="rect"
							className={classes.media}
						></Skeleton>
						<CardContent>
							<Skeleton
								animation="wave"
								variant="text"
								width="30%"
							/>
							<Skeleton
								animation="wave"
								variant="rect"
								width="100%"
							/>
						</CardContent>
					</Card>
					{/* <EventDetailedInfo  /> */}
					{[...new Array(3)].map((obj, index) => {
						return (
							<div key={index}>
								<ListItem>
									<ListItemIcon>
										<Skeleton
											animation="wave"
											variant="circle"
										>
											<SvgIcon />
										</Skeleton>
									</ListItemIcon>

									<Box
										display="flex"
										flexDirection="column"
										width="100%"
									>
										<Skeleton
											animation="wave"
											variant="text"
											width="100%"
										/>

										<Skeleton
											animation="wave"
											variant="text"
											width="50%"
										/>
									</Box>
								</ListItem>
								<Divider />
							</div>
						);
					})}
				</Grid>
				<Grid item md xs={12}>
					{/* <EventDetailedSidebar /> */}
					<Box my="1rem" width="100%">
						<Skeleton
							variant="rect"
							animation="wave"
							width="100%"
							height={50}
						></Skeleton>
					</Box>
				</Grid>
				<Grid item md={8} xs={12}>
					<Paper variant="outlined">
						{/* Heading */}
						<Box textAlign="center" py="1rem">
							<Box
								display="flex"
								alignItems="center"
								justifyContent="center"
							>
								<Skeleton
									animation="wave"
									variant="rect"
									width="30%"
								/>
							</Box>
						</Box>
						<Divider />
						{/* Comment Box */}

						{[...new Array(3)].map((obj, index) => (
							<div key={index}>
								<Box my="1rem" width="100%">
									<Box display="flex" alignItems="center">
										{/* Avatar of the user */}
										<Box m="1rem">
											<Skeleton
												animation="wave"
												variant="circle"
											>
												<Avatar />
											</Skeleton>
										</Box>
										<Box width="100%">
											<Box
												display="flex"
												alignItems="center"
												width="100%"
											>
												<Skeleton
													animation="wave"
													variant="text"
													width="30%"
												/>
												<Box width="100%" ml="0.5rem">
													<Skeleton
														animation="wave"
														variant="text"
														width="10%"
													/>
												</Box>
											</Box>
											{/* Comment */}
											<Box style={{ maxWidth: "50vw" }}>
												<Skeleton
													animation="wave"
													variant="text"
													width="100%"
												/>
											</Box>
										</Box>
									</Box>
								</Box>
								<Box px="3rem">
									<Divider />
								</Box>
							</div>
						))}
					</Paper>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(EventDetailedPageSkeleton);
