import { Avatar, Box, Grid, Paper, withStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

const style = {
	"@global": {
		html: {
			fontSize: ".8rem",
		},
	},
};

const UserDetailedPageSkeleton = () => {
	return (
		<Grid container spacing={3}>
			<Grid item md={8} xs={12}>
				<Box my="1rem">
					<Paper elevation={3}>
						<Box display="flex" p="1rem">
							<Skeleton animation="wave" variant="circle">
								<Avatar></Avatar>
							</Skeleton>
							<Box mx="1rem" width="100%">
								<Grid
									container
									direction="row"
									alignItems="flex-end"
								>
									<Box mb="0.5rem" width="100%">
										<Skeleton
											animation="wave"
											variant="text"
											width="50%"
										/>
									</Box>
									<Box
										display="flex"
										flexDirection="column"
										width="100%"
									>
										<Skeleton
											animation="wave"
											variant="text"
											width="30%"
										/>
										<Skeleton
											animation="wave"
											variant="text"
											width="20%"
										/>
									</Box>
								</Grid>
							</Box>
						</Box>
					</Paper>
				</Box>
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
										<Skeleton
											animation="wave"
											variant="text"
											width="30%"
										/>
									</Box>
									<Box mx="1rem">
										{[...new Array(4)].map((obj, index) => (
											<Box mb="0.5rem" key={index}>
												<Skeleton
													animation="wave"
													variant="text"
													width="20%"
												/>
											</Box>
										))}
									</Box>
								</Grid>
								<Grid item md xs={12}>
									<Box
										my="0.5rem"
										display="flex"
										alignItems="center"
									>
										<Skeleton
											animation="wave"
											variant="text"
											width="30%"
										/>
									</Box>
									<Box mx="0.5rem" width="100%">
										{[...new Array(3)].map((obj, index) => (
											<Box
												ml="0.5rem"
												key={index}
												width="100%"
											>
												<Skeleton
													animation="wave"
													variant="text"
													width="20%"
												/>
											</Box>
										))}
									</Box>
								</Grid>
							</Grid>
						</Box>
					</Paper>
				</Box>
			</Grid>
			<Grid item md xs={12}>
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
				<Skeleton
					variant="rect"
					animation="wave"
					width="100%"
					height={400}
				></Skeleton>
			</Grid>
			<Grid item md={8} xs={12}>
				<Skeleton
					variant="rect"
					animation="wave"
					width="100%"
					height={150}
				></Skeleton>
			</Grid>
		</Grid>
	);
};

export default withStyles(style)(UserDetailedPageSkeleton);
