import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { closeModal } from "../../redux/actions";
import { Box, Slide, withStyles } from "@material-ui/core";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { TwitterShareButton, TwitterIcon } from "react-share";
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import { EmailShareButton, EmailIcon } from "react-share";
import HelmetMetaData from "../../App/Util/HelmetMetaData";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const style = (theme) => ({
	socialMediaButton: {
		margin: "0.8rem",
	},
});

class SocialShareModal extends Component {
	handleClose = () => {
		this.props.closeModal();
	};

	render() {
		const { event, url, classes } = this.props;
		return (
			<div>
				<HelmetMetaData
					title={event.title}
					quote={event.title}
					description={event.description}
					image={"https://source.unsplash.com/random"}
					hashtag={event.category}
				/>
				<Dialog
					open={true}
					onClose={this.handleClose}
					TransitionComponent={Transition}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						{event.title}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Share event on your favourite social media and help
							your freinds to get in touch with this special
							event.
						</DialogContentText>
					</DialogContent>

					<DialogActions>
						<Box
							display="flex"
							justifyContent="center"
							width="100%"
						>
							<FacebookShareButton
								url={url}
								quote={event.title}
								hashtag="#EvNet"
								className={classes.socialMediaButton}
							>
								<FacebookIcon size={36} />
							</FacebookShareButton>
							<TwitterShareButton
								url={url}
								title={event.title}
								hashtag="#EvNet"
								className={classes.socialMediaButton}
							>
								<TwitterIcon size={36} />
							</TwitterShareButton>
							<WhatsappShareButton
								url={url}
								title={event.title}
								separator=":: "
								className={classes.socialMediaButton}
							>
								<WhatsappIcon size={36} />
							</WhatsappShareButton>
							<EmailShareButton
								url={url}
								title={event.title}
								separator=":: "
								className={classes.socialMediaButton}
							>
								<EmailIcon size={36} />
							</EmailShareButton>
						</Box>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

const actions = { closeModal };

export default connect(null, actions)(withStyles(style)(SocialShareModal));
