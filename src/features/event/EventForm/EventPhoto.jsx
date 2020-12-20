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
import blueGrey from "@material-ui/core/colors/blueGrey";
import CancelIcon from "@material-ui/icons/Cancel";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import CropperInput from "../../User/Settings/Photos/CropperInput";
import DropzoneInput from "../../User/Settings/Photos/DropzoneInput";
import { connect } from "react-redux";
import cuid from "cuid";
import { getFirebase } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";
import { updateEventPhoto, openModal } from "../../../redux/actions";
import history from "../../../history";
import imageCompression from "browser-image-compression";

const useStyles = makeStyles((theme) => ({
	"@global": {
		html: {
			fontSize: ".8rem",
		},
	},
	root: {},
	marg: {
		margin: ".5rem",
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

const EventPhoto = ({ auth, eventId, updateEventPhoto, openModal }) => {
	const classes = useStyles();
	const [files, setFiles] = useState([]);
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(null);
	const [compressing, setCompressing] = useState(null);

	useEffect(() => {
		return () => {
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		};
	}, [files]);

	const handleCancelCrop = () => {
		setFiles([]);
		setImage(null);
	};

	const compressAndUpload = async () => {
		const imageFile = image;
		let finalImage = image;
		const options = {
			maxSizeMB: 1,
			useWebWorker: true,
			onProgress: (compression) => {
				setCompressing(compression);
			},
		};
		try {
			const compressedFile = await imageCompression(imageFile, options);
			setCompressing(null);

			if (compressedFile.size < imageFile.size) {
				finalImage = compressedFile;
			}
			handleUploadImage(finalImage);
		} catch (error) {
			toastr.error(
				"Oops",
				"Something went wrong. Please retry / Check your internet connection"
			);
		}
	};

	const handleUploadImage = (image) => {
		const name = cuid();
		const fileName = name;
		const uploadFileTask = uploadFileToFirebaseStorage(image, fileName);
		uploadFileTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setLoading(progress);
			},
			(error) => {
				toastr.error(
					"Oops",
					"Something went wrong. Please retry / Check your internet connection"
				);
			},
			async () => {
				try {
					const downloadURL = await uploadFileTask.snapshot.ref.getDownloadURL();

					await updateEventPhoto(downloadURL, eventId);

					setLoading(null);
					handleCancelCrop();

					history.push(`/events/${eventId}`);
					toastr.success("Success", "Photo has been uploaded");
				} catch (error) {
					toastr.error(
						"Oops",
						"Something went wrong. Please retry / Check your internet connection"
					);
				}
			}
		);
	};

	const uploadFileToFirebaseStorage = (file, fileName) => {
		const firebase = getFirebase();
		const user = firebase.auth().currentUser;
		const storageRef = firebase.storage().ref();
		const folderRef = storageRef.child(
			`${user.uid}/myEvents/${eventId}/Image`
		);
		folderRef
			.listAll()
			.then((result) => {
				result.items.forEach(function (file) {
					file.delete();
				});
			})
			.catch((error) => {
				console.error(error);
			});
		//}
		return storageRef
			.child(`${user.uid}/myEvents/${eventId}/Image/${fileName}`)
			.put(file);
	};

	const handleClickTick = () => {
		openModal("AlertModal", {
			title: "Set Image to the Event ?",
			description:
				"Setting this image to the event means if you have any previous image attached to the event will be deleted permanently",
			agreeBtnText: "Set Photo",
			disagreeBtnText: "Cancel",
			actionName: "Updating Event Photo",
			action: () => {
				compressAndUpload();
			},
		});
	};
	if (eventId) {
		return (
			<Container style={{ margin: "2rem 0" }}>
				<Grid container spacing={3}>
					<Grid item xs={12} md>
						<Box>
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
						</Box>
					</Grid>
					<Grid item xs={12} md>
						<Box>
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
						</Box>
					</Grid>
					<Grid item xs={12} md>
						<Box>
							<Typography
								component="h5"
								variant="h6"
								style={{ marginBottom: "1rem" }}
							>
								Step 3: Review
							</Typography>

							<Box className={classes.inRatio}>
								<Paper elevation={3} className={classes.secBg}>
									{(loading !== null ||
										compressing !== null) && (
										<Box
											display="flex"
											alignItems="center"
											justifyContent="center"
											height="100%"
										>
											<Box textAlign="center">
												<Box
													position="relative"
													display="inline-flex"
												>
													<CircularProgress
														variant="determinate"
														value={
															loading
																? loading
																: compressing
														}
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
														{compressing !==
															null && (
															<Typography
																variant="caption"
																component="div"
																color="textSecondary"
															>{`${Math.round(
																compressing
															)}%`}</Typography>
														)}
														{loading !== null && (
															<Typography
																variant="caption"
																component="div"
																color="textSecondary"
															>{`${Math.round(
																loading
															)}%`}</Typography>
														)}
													</Box>
												</Box>
												<Box>
													{compressing !== null && (
														<Typography
															variant="body1"
															color="primary"
														>
															Compressing...
														</Typography>
													)}
													{compressing === null && (
														<Typography
															variant="body1"
															color="primary"
														>
															Uploading...
														</Typography>
													)}
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
								{loading === null &&
									compressing === null &&
									files.length > 0 && (
										<ButtonGroup
											variant="contained"
											aria-label="contained secondary button group"
											fullWidth
											style={{ margin: "1rem 0" }}
										>
											<Button
												color="primary"
												onClick={handleClickTick}
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
						</Box>
					</Grid>
				</Grid>
			</Container>
		);
	}

	return <></>;
};

const mapStateToProps = (state, ownProps) => ({
	auth: state.firebase.auth,
	eventId: ownProps.match && ownProps.match.params.id,
});

const actions = {
	updateEventPhoto,
	openModal,
};

export default connect(mapStateToProps, actions)(EventPhoto);
