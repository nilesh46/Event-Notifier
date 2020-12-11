import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { closeModal } from "../../redux/actions";
import { Box, IconButton, Slide, withStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const style = (theme) => ({
	photoStyle: {
		height: "100%",
		width: "100%",
		borderRadius: "10px",
	},
});

class ImageModal extends Component {
	handleClose = () => {
		this.props.closeModal();
	};

	render() {
		const { classes, photo } = this.props;

		return (
			<div style={{ textAlign: "center" }}>
				<Dialog
					open={true}
					onClose={this.handleClose}
					TransitionComponent={Transition}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					fullWidth
				>
					<DialogTitle id="alert-dialog-title">
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							<Box>Image</Box>
							<IconButton onClick={this.handleClose}>
								<CloseIcon />
							</IconButton>
						</Box>
					</DialogTitle>

					<DialogContent>
						<img
							src={photo.url}
							alt={photo.name}
							className={classes.photoStyle}
						/>
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}

const actions = { closeModal };

export default connect(null, actions)(withStyles(style)(ImageModal));
