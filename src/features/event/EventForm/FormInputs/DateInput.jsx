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
			variant="outlined"
			type="date"
			defaultValue="2017-05-24"
			InputLabelProps={{
				shrink: true,
			}}
			{...input}
		/>
	);
};

export default TextInput;
