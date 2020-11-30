import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { testAction, openModal } from "../../redux/actions";

class testComponent extends Component {
    handleTestAction = () => {
        this.props.testAction();
    };

    handleOpenModal = () => {
        console.log("test");
        this.props.openModal("AlertModal", { data: "test data" });
    };

    render() {
        const { data } = this.props;
        return (
            <div>
                This is for testing
                <div>Test Value: {data}</div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleTestAction}
                >
                    Test Action
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleOpenModal}
                >
                    open modal
                </Button>
            </div>
        );
    }
}

const actions = { testAction, openModal };
const mapStateToProps = (state) => {
    return { data: state.test.data };
};

export default connect(mapStateToProps, actions)(testComponent);
