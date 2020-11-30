import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { closeModal } from "../../redux/actions";
import { Slide } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class AlertModal extends Component {
    handleClose = () => {
        this.props.closeModal();
    };

    handleAgree = () => {
        const { action, closeModal } = this.props;
        action();
        closeModal();
    };

    render() {
        const {
            title,
            description,
            agreeBtnText,
            disagreeBtnText,
        } = this.props;

        return (
            <div>
                <Dialog
                    open={true}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {description}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
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
                </Dialog>
            </div>
        );
    }
}

const actions = { closeModal };

export default connect(null, actions)(AlertModal);
