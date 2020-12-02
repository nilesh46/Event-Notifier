import { FormControlLabel, Switch } from "@material-ui/core";
import React from "react";
import { change } from "redux-form";

const SwitchInput = ({
	input,
	label,
	placeholder,
	meta: { touched, error, dispatch, form },

	...custom
}) => {
	const handleChange = (e) => {
		if (form === "EventForm")
			dispatch(change("EventForm", input.name, e.target.checked));
	};

	return (
		<FormControlLabel
			control={
				<Switch
					color="primary"
					{...input}
					{...custom}
					onChange={handleChange}
					checked={input.value === true}
				/>
			}
			label={label}
		/>
	);
};

export default SwitchInput;
