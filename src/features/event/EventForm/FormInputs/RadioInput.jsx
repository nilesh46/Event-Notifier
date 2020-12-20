import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const RadioInput = ({ label, input, options, default1 }) => {
	const [value, setValue] = React.useState(default1);

	const handleChange = (event) => {
		setValue(event.target.value);
	};
	return (
		<FormControl component="fieldset" style={{ margin: ".7rem 0" }}>
			<FormLabel component="legend">{label}</FormLabel>
			<RadioGroup
				aria-label={label}
				name={label}
				row
				value={value}
				onChange={handleChange}
				{...input}
			>
				{options.map(({ label }, index) => (
					<FormControlLabel
						key={index}
						value={label}
						control={<Radio />}
						label={label}
						name={label}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
};

export default RadioInput;
