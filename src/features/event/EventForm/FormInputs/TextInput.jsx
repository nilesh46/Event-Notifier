import React from "react";
import { TextField } from "@material-ui/core";

const TextInput = ({
	input,
	width,
	type,
	label,
	placeholder,
	meta: { touched, error },
	...custom
}) => {
	return (
		<TextField
			error={touched && !!error}
			placeholder={placeholder}
			variant="outlined"
			// size="small"
			label={label}
			fullWidth
			{...input}
			{...custom}
			helperText={touched && error && error}
		/>
	);
};

export default TextInput;
