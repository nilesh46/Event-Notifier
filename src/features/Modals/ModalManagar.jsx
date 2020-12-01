import React from "react";
import { connect } from "react-redux";
import AlertModal from "./AlertModal";

const modalLookup = {
    AlertModal,
};

const ModalManagar = ({ currentModal }) => {
    let renderedModal;

    if (currentModal) {
        const { modalType, modalProps } = currentModal;
        const ModalComponent = modalLookup[modalType];
        renderedModal = <ModalComponent {...modalProps} />;
        return <div>{renderedModal}</div>;
    }
    return <div></div>;
};

const mapStateToProps = (state) => {
    return { currentModal: state.modals };
};

export default connect(mapStateToProps)(ModalManagar);
