import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { closeModal } from "../../redux/actions";
import { Box, CircularProgress, Slide } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

class AlertModal extends Component {
	state = { initialLoad: true };
	handleClose = () => {
		this.props.closeModal();
	};

	handleAgree = () => {
		const { action } = this.props;
		action();
		this.setState({ initialLoad: false });
	};

	render() {
		const {
			title,
			description,
			agreeBtnText,
			disagreeBtnText,
			loading,
			actionName,
		} = this.props;

		const { initialLoad } = this.state;

		if (!initialLoad && !loading) {
			this.handleClose();
		}

		return (
			<div>
				<Dialog
					open={true}
					onClose={this.handleClose}
					TransitionComponent={Transition}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					{loading && (
						<>
							<DialogTitle id="alert-dialog-title">
								{actionName}
							</DialogTitle>
							<DialogContent>
								<Box
									display="flex"
									alignItems="center"
									justifyContent="center"
								>
									<CircularProgress />
								</Box>
							</DialogContent>
						</>
					)}
					{!loading && (
						<>
							<DialogTitle id="alert-dialog-title">
								{title}
							</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-description">
									{description}
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button
									onClick={this.handleClose}
									color="primary"
								>
									{disagreeBtnText}
								</Button>
								<Button
									onClick={this.handleAgree}
									color="primary"
									autoFocus
								>
									{agreeBtnText}
								</Button>
							</DialogActions>
						</>
					)}
				</Dialog>
			</div>
		);
	}
}

const actions = { closeModal };

const mapStateToProps = (state) => {
	return { loading: state.async.loading };
};

export default connect(mapStateToProps, actions)(AlertModal);
