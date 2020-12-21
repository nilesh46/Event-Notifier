import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	withStyles,
} from "@material-ui/core";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import FileInput from "./FormInputs/FileInput";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { getFirebase } from "react-redux-firebase";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import history from "../../../history";
import {
	deleteFileInEvent,
	openModal,
	setFilesInEvent,
} from "../../../redux/actions";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";

const styles = (theme) => ({});

class EventFiles extends Component {
	state = {
		files: [],
		previousFiles: [],
		loading: null,
		uploadedFiles: [],
	};

	onFormSubmit = (values) => {
		this.handleUploadFiles(values.files);
	};

	setList = (files) => {
		this.setState({ files: files });
	};

	async componentDidMount() {
		const { eventId } = this.props;
		const firebase = getFirebase();
		const user = firebase.auth().currentUser;
		const storageRef = firebase.storage().ref();

		const folderRef = storageRef.child(
			`${user.uid}/myEvents/${eventId}/Docs`
		);

		const files = await folderRef.listAll();
		this.setState({ previousFiles: files.items });
	}

	componentDidUpdate() {
		const { files, uploadedFiles } = this.state;

		if (files.length === uploadedFiles.length && files.length !== 0) {
			history.push(`/events/${this.props.eventId}`);
			toastr.success("Success!!! ", "Your files have been uploaded");
		}
	}

	handleUploadFiles = (files) => {
		const { eventId, setFilesInEvent } = this.props;

		files.forEach((file) => {
			const uploadFileTask = this.uploadFileToFirebaseStorage(
				file,
				file.name
			);
			this.setState({ loading: true });
			let task = uploadFileTask.on(
				"state_changed",
				(snapshot) => {
					// const progress =
					// 	(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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

						await setFilesInEvent(
							downloadURL,
							eventId,
							file.name,
							file.size
						);

						this.setState({
							uploadedFiles: [
								...this.state.uploadedFiles,
								file.name,
							],
						});
						task();
					} catch (error) {
						toastr.error(
							"Oops",
							"Something went wrong. Please retry / Check your internet connection"
						);
					}
				}
			);
		});
	};

	uploadFileToFirebaseStorage(file, fileName) {
		const { eventId } = this.props;
		const firebase = getFirebase();
		const user = firebase.auth().currentUser;
		const storageRef = firebase.storage().ref();

		return storageRef
			.child(`${user.uid}/myEvents/${eventId}/Docs/${fileName}`)
			.put(file);
	}

	handleDeleteFile = (file) => {
		const { openModal, eventId, deleteFileInEvent } = this.props;
		openModal("AlertModal", {
			title: `Delete ${file.name} ?`,
			description:
				"Deleting this file will remove it completely from your account",
			agreeBtnText: "Delete",
			disagreeBtnText: "Cancel",
			actionName: "Deleting File",
			action: () => {
				deleteFileInEvent(file, eventId);
				this.setState({
					previousFiles: this.state.previousFiles.filter(
						(item) => item.name !== file.name
					),
				});
			},
		});
	};

	render() {
		const { classes, eventId } = this.props;
		const { files, loading, previousFiles, uploadedFiles } = this.state;

		return (
			<Box textAlign="center" my="2rem">
				<form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
					<Box
						display="flex"
						justifyContent="center"
						flexDirection="column"
					>
						<Field
							name="files"
							component={FileInput}
							label="Select Files"
							fileTypes=".pdf"
							setList={this.setList}
						/>

						<Box
							my="1rem"
							display="flex"
							alignItems="center"
							justifyContent="center"
						>
							<Box mx="0.5rem">
								<Button
									variant="contained"
									type="submit"
									color="primary"
									disabled={this.state.files.length === 0}
								>
									Submit
								</Button>
							</Box>
							<Box mx="0.5rem">
								<Button
									variant="contained"
									type="button"
									color="secondary"
									onClick={() => {
										history.push(`/events/${eventId}`);
									}}
								>
									Cancel
								</Button>
							</Box>
						</Box>
					</Box>
				</form>

				<Box>
					{previousFiles.length > 0 && (
						<>
							<Typography variant="body1" color="textPrimary">
								Previous Files
							</Typography>
							<List className={classes.root}>
								{previousFiles.map((file) => (
									<ListItem key={file.name}>
										<ListItemAvatar>
											<Avatar>
												<InsertDriveFileIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={
												file.name.length > 20
													? file.name.substr(0, 20) +
													  "..."
													: file.name
											}
										/>
										<IconButton
											onClick={() => {
												this.handleDeleteFile(file);
											}}
										>
											<ClearIcon />
										</IconButton>
									</ListItem>
								))}
							</List>
						</>
					)}
					<Box my="1rem">
						<Divider />
					</Box>

					<Typography variant="body1" color="textPrimary">
						Current Files
					</Typography>
					<List className={classes.root}>
						{files.map((file) => (
							<ListItem key={file.name}>
								<ListItemAvatar>
									<Avatar>
										<InsertDriveFileIcon />
									</Avatar>
								</ListItemAvatar>

								<ListItemText
									primary={
										file.name.length > 20
											? file.name.substr(0, 20) + "..."
											: file.name
									}
									secondary={`${parseInt(
										Math.round(file.size / 1024)
									)} KB`}
								/>

								{loading &&
									uploadedFiles.indexOf(file.name) === -1 && (
										<CircularProgress />
									)}
								{uploadedFiles.indexOf(file.name) !== -1 && (
									<DoneIcon />
								)}
							</ListItem>
						))}
					</List>
				</Box>
			</Box>
		);
	}
}

const EventFilesForm = reduxForm({ form: "EventFiles" })(EventFiles);

const actions = {
	setFilesInEvent,
	deleteFileInEvent,
	openModal,
};

const mapStateToProps = (state, ownProps) => ({
	eventId: ownProps.match && ownProps.match.params.id,
});

export default connect(
	mapStateToProps,
	actions
)(withStyles(styles)(EventFilesForm));
