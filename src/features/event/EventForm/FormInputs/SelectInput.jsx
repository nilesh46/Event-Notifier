import React from "react";
import { TextField } from "@material-ui/core";

const SelectInput = ({
	input,
	options,
	type,
	label,
	placeholder,
	meta: { touched, error },
	...custom
}) => {
	return (
		<TextField
			select
			size="small"
			error={touched && !!error}
			label={label}
			onChange={(e, data) => input.onChange}
			SelectProps={{
				native: true,
			}}
			variant="outlined"
			helperText={touched && error && error}
			{...input}
		>
			{options.map((option) => (
				<option key={option.key} value={option.value}>
					{option.text}
				</option>
			))}
		</TextField>
	);
};

export default SelectInput;
