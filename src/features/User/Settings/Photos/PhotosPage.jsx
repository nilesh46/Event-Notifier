import React, { useState, useEffect, Fragment } from "react";
import {
	Box,
	Button,
	ButtonGroup,
	CircularProgress,
	Container,
	Grid,
	Paper,
	Typography,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import blueGrey from "@material-ui/core/colors/blueGrey";
import DropzoneInput from "./DropzoneInput";
import CropperInput from "./CropperInput";
import { connect } from "react-redux";
import { getFirebase } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";
import CancelIcon from "@material-ui/icons/Cancel";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import {
	updateUserProfilePhoto,
	deletePhoto,
	setMainPhoto,
} from "../../../../redux/actions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import UserPhotos from "./UserPhotos";
import cuid from "cuid";

const useStyles = makeStyles((theme) => ({
	"@global": {
		html: {
			fontSize: ".8rem",
		},
	},
	mainBg: {
		backgroundColor: grey["50"],
		marginTop: "2rem",
		marginBottom: "2rem",
		padding: "2rem",
	},
	root: {
		width: 150,
		borderRadius: 150,
		height: 150,
	},
	marg: {
		margin: ".5rem",
	},
	media: {
		height: 240,
	},
	backgr: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		backgroundColor: blueGrey["800"],
	},
	secBg: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		overflow: "auto",
	},
	inRatio: {
		position: "relative",
		height: 0,
		paddingTop: "56.25%",
	},
}));

const PhotosPage = ({
	updateUserProfilePhoto,
	profile,
	photos,
	deletePhoto,
	setMainPhoto,
}) => {
	const classes = useStyles();
	const [files, setFiles] = useState([]);
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(null);

	useEffect(() => {
		return () => {
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		};
	}, [files]);

	const handleDeletePhoto = async (id, name) => {
		const firebase = getFirebase();
		await deletePhoto({ firebase }, name, id)
			.then(() => {
				toastr.success("Success", "Photo deleted successfully");
			})
			.catch((error) => {
				toastr.error(error);
			});
	};

	const handleSetMainPhoto = async (url) => {
		const firebase = getFirebase();
		await setMainPhoto({ firebase }, url).catch((error) => {
			toastr.error(error);
		});
	};

	const handleUploadImage = () => {
		const name = cuid();
		const filename = name;
		const firebase = getFirebase();
		const uploadedFile = uploadToFirebaseStorage(
			{ firebase },
			image,
			filename
		);
		uploadedFile.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setLoading(progress);
			},
			(error) => {
				console.log(error);
			},
			() => {
				uploadedFile.snapshot.ref
					.getDownloadURL()
					.then((downloadURL) => {
						updateUserProfilePhoto(
							{ firebase },
							downloadURL,
							filename
						)
							.then(() => {
								setLoading(null);
								toastr.success(
									"Success",
									"Photo has been uploaded"
								);
								handleCancelCrop();
							})
							.catch((error) => {
								console.log(error);
							});
					});
			}
		);
	};

	const uploadToFirebaseStorage = ({ firebase }, file, fileName) => {
		const user = firebase.auth().currentUser;
		const storageRef = firebase.storage().ref();
		return storageRef
			.child(`${user.uid}/user_images/${fileName}`)
			.put(file);
	};

	const handleCancelCrop = () => {
		setFiles([]);
		setImage(null);
	};

	return (
		<Container maxWidth="lg">
			<Paper className={classes.mainBg} elevation={1}>
				<Typography component="h2" variant="h3">
					Your Photos
				</Typography>

				<br />
				<Grid container direction="row" spacing={8}>
					<Grid item xs={12} md>
						<Typography
							component="h5"
							variant="h6"
							style={{ marginBottom: "1rem" }}
						>
							Step 1: Add photo
						</Typography>

						<Box className={classes.inRatio}>
							<Paper elevation={3} className={classes.backgr}>
								<Box
									height="100%"
									width="100%"
									display="flex"
									alignItems="center"
									justifyContent="center"
								>
									<DropzoneInput setFiles={setFiles} />
								</Box>
							</Paper>
						</Box>
					</Grid>
					<Grid item xs={12} md>
						<Typography
							component="h5"
							variant="h6"
							style={{ marginBottom: "1rem" }}
						>
							Step 2: Resize image
						</Typography>
						<Box className={classes.inRatio}>
							<Paper elevation={3} className={classes.secBg}>
								{files.length > 0 && (
									<CropperInput
										setImage={setImage}
										imagePreview={files[0].preview}
									/>
								)}
							</Paper>
						</Box>
					</Grid>
					<Grid item xs={12} md>
						<Typography
							component="h5"
							variant="h6"
							style={{ marginBottom: "1rem" }}
						>
							Step 3: Review
						</Typography>
						<Box className={classes.inRatio}>
							<Paper elevation={3} className={classes.secBg}>
								{loading !== null && (
									<Box
										display="flex"
										alignItems="center"
										justifyContent="center"
										height="100%"
									>
										<Box
											position="relative"
											display="inline-flex"
										>
											<CircularProgress
												variant="determinate"
												value={loading}
											/>
											<Box
												top={0}
												left={0}
												bottom={0}
												right={0}
												position="absolute"
												display="flex"
												alignItems="center"
												justifyContent="center"
											>
												<Typography
													variant="caption"
													component="div"
													color="textSecondary"
												>{`${Math.round(
													loading
												)}%`}</Typography>
											</Box>
										</Box>
									</Box>
								)}
								{loading === null && files.length > 0 && (
									<Fragment>
										<Box className={classes.inRatio}>
											<div
												className="img-preview"
												style={{
													position: "absolute",
													top: 0,
													left: 0,
													width: "100%",
													height: "100%",
													overflow: "hidden",
												}}
												alt="Image Preview"
											/>
										</Box>
									</Fragment>
								)}
							</Paper>
							{loading === null && files.length > 0 && (
								<ButtonGroup
									variant="contained"
									aria-label="contained secondary button group"
									fullWidth
									style={{ margin: "1rem 0" }}
								>
									<Button
										color="primary"
										onClick={handleUploadImage}
									>
										<DoneAllIcon />
									</Button>
									<Button
										color="secondary"
										onClick={handleCancelCrop}
									>
										<CancelIcon />
									</Button>
								</ButtonGroup>
							)}
						</Box>
					</Grid>
				</Grid>

				<br />
				<br />
				<Typography
					component="h5"
					variant="h6"
					style={{ marginBottom: "1rem" }}
				>
					All Photos
				</Typography>
				<UserPhotos
					photos={photos}
					profile={profile}
					handleDeletePhoto={handleDeletePhoto}
					handleSetMainPhoto={handleSetMainPhoto}
				/>
			</Paper>
		</Container>
	);
};

const actions = {
	updateUserProfilePhoto,
	deletePhoto,
	setMainPhoto,
};

const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
	profile: state.firebase.profile,
	photos: state.firestore.ordered.photos,
});

const query = ({ auth }) => {
	return [
		{
			collection: "users",
			doc: auth.uid,
			subcollections: [{ collection: "photos" }],
			storeAs: "photos",
		},
	];
};

export default compose(
	connect(mapStateToProps, actions),
	firestoreConnect((auth) => query(auth))
)(PhotosPage);
