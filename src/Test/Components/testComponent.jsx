import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { testAction } from "../../redux/actions";

class testComponent extends Component {
	handleTestAction = () => {
		this.props.testAction();
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
			</div>
		);
	}
}

const actions = { testAction };
const mapStateToProps = (state) => {
	return { data: state.test.data };
};

export default connect(mapStateToProps, actions)(testComponent);
