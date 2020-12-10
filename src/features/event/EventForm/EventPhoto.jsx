import React, { useState, useEffect, Fragment } from "react";
import {
	Box,
	Button,
	ButtonGroup,
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
import { useFirebase } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";
import { updateEventPhoto, openModal } from "../../../redux/actions";
import history from "../../../history";

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

	const firebase = useFirebase();

	useEffect(() => {
		return () => {
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		};
	}, [files]);

	const handleCancelCrop = () => {
		setFiles([]);
		setImage(null);
	};

	const handleUploadImage = () => {
		const name = cuid();
		const fileName = name;
		const uploadedFile = uploadFileToFirebaseStorage(
			{ firebase },
			image,
			fileName
		);
		uploadedFile.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
			},
			(error) => {
				console.log(error);
			},
			() => {
				uploadedFile.snapshot.ref
					.getDownloadURL()
					.then((downloadURL) => {
						updateEventPhoto({ firebase }, downloadURL, eventId)
							.then(() => {
								toastr.success(
									"Success",
									"Photo has been uploaded"
								);
								handleCancelCrop();
								history.push(`/events/${eventId}`);
							})
							.catch((error) => {
								console.log(error);
							});
					});
			}
		);
	};

	const uploadFileToFirebaseStorage = ({ firebase }, file, fileName) => {
		const user = firebase.auth().currentUser;
		const storageRef = firebase.storage().ref();
		if (storageRef.child(`${user.uid}/myEvents/${eventId}/Image`)) {
			storageRef.child(`${user.uid}/myEvents/${eventId}/Image`).delete();
		}
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
			action: () => {
				handleUploadImage();
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
									{files.length > 0 && (
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
										</Fragment>
									)}
								</Paper>
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
