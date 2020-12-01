import { FormControlLabel, Switch } from "@material-ui/core";
import React from "react";

const SwitchInput = ({
	input,
	label,
	placeholder,
	meta: { touched, error, dispatch },
	...custom
}) => {
	const handleChange = (e) => {
		dispatch(custom.change("EventForm", input.name, e.target.checked));
	};

	return (
		<FormControlLabel
			control={
				<Switch
					color="primary"
					{...input}
					{...custom}
					onChange={handleChange}
					checked={input.value}
				/>
			}
			label={label}
		/>
	);
};

export default SwitchInput;
