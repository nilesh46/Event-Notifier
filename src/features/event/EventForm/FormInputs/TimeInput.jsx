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
			label={label}
			type="time"
			variant="outlined"
			InputLabelProps={{
				shrink: true,
			}}
			inputProps={{
				step: 300, // 5 min
			}}
			{...input}
		/>
	);
};

export default TextInput;
