import {
	Box,
	Button,
	Collapse,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
	withStyles,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, FilterList } from "@material-ui/icons";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { getEventsForDashboard } from "../../../redux/actions";
import DateInput from "../EventForm/FormInputs/DateInput";
import RadioInput from "../EventForm/FormInputs/RadioInput";

const styles = (theme) => ({
	root: {
		marginTop: "1rem",
	},
	listItem: {
		color: theme.palette.getContrastText("#FFF"),
		backgroundColor: "#FFF",
		width: "100%",
		"&:hover": {
			backgroundColor: "#F3F3F3",
		},
	},
});

class EventFilterForm extends Component {
	state = { open: false };

	handleClick = () => {
		this.setState({ open: !this.state.open });
	};

	onFormSubmit = (values) => {
		this.props.changeFilter(values.date, values.sort);
	};

	sortingOptions = [{ label: "Soonest" }, { label: "Farthest" }];

	render() {
		const { classes, invalid, pristine, submitting } = this.props;
		return (
			<List className={classes.root}>
				<ListItem
					button
					onClick={this.handleClick}
					className={classes.listItem}
				>
					<ListItemIcon>
						<FilterList fontSize="large" color="primary" />
					</ListItemIcon>
					<ListItemText>
						<Typography component="h1" variant="h6">
							<strong>Filters</strong>
						</Typography>
					</ListItemText>
					{this.state.open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>

				<Collapse in={this.state.open} timeout="auto" unmountOnExit>
					<form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
						<Box textAlign="center">
							<Field
								name="sort"
								component={RadioInput}
								options={this.sortingOptions}
								default1="Farthest"
								label="Sort In"
							/>
							<Field
								name="date"
								component={DateInput}
								label="From Date"
								fullView={false}
							/>

							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								disabled={invalid || submitting || pristine}
							>
								Apply Filters
							</Button>
						</Box>
					</form>
				</Collapse>
			</List>
		);
	}
}

const actions = {
	getEventsForDashboard,
};

const FilterForm = reduxForm({ form: "FilterForm" })(
	withStyles(styles)(EventFilterForm)
);

export default connect(null, actions)(FilterForm);
