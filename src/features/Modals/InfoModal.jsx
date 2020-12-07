import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { closeModal } from "../../redux/actions";
import {
	Box,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Slide,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

class InfoModal extends Component {
	handleClose = () => {
		this.props.closeModal();
	};

	render() {
		const { title, description, list } = this.props;

		return (
			<div style={{ textAlign: "center" }}>
				<Dialog
					open={true}
					onClose={this.handleClose}
					TransitionComponent={Transition}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							<Box>{title}</Box>
							<IconButton onClick={this.handleClose}>
								<CloseIcon />
							</IconButton>
						</Box>
					</DialogTitle>

					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							{description}
						</DialogContentText>
						{list && (
							<List>
								{list.map((item) => {
									return (
										<ListItem>
											<ListItemText>{item}</ListItemText>
										</ListItem>
									);
								})}
							</List>
						)}
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}

const actions = { closeModal };

export default connect(null, actions)(InfoModal);
