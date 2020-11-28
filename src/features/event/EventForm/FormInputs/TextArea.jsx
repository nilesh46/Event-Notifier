import React from "react";
import { TextField } from "@material-ui/core";

const TextInput = ({
	input,
	width,
	rows,
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
			size="small"
			multiline
			label={label}
			rows={rows}
			fullWidth
			{...input}
			{...custom}
			helperText={touched && error && error}
		/>
	);
};

export default TextInput;
