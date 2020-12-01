import { Button, CircularProgress } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { testActionAsync, openModal } from "../../redux/actions";

class testComponent extends Component {
	handleTestAction = () => {
		this.props.testActionAsync();
	};

	handleOpenModal = () => {
		console.log("test");
		this.props.openModal("AlertModal", { data: "test data" });
	};

	render() {
		const { data, loading } = this.props;
		return (
			<div>
				This is for testing
				<div>Test Value: {data}</div>
				<Button
					variant="contained"
					color="primary"
					onClick={this.handleTestAction}
				>
					{loading && <CircularProgress size={20} />}
					{!loading && "Test Action"}
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

const actions = { testActionAsync, openModal };
const mapStateToProps = (state) => {
	return {
		data: state.test.data,
		loading: state.async.loading,
	};
};

export default connect(mapStateToProps, actions)(testComponent);
