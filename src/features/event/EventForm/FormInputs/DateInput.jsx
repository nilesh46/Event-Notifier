import React from "react";
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const today = new Date();

const TextInput = ({
	input,
	width,
	type,
	label,
	placeholder,
	meta: { touched, error },
	...custom
}) => {
	console.log(today);
	const [selectedDate, setSelectedDate] = React.useState(
		new Date("2020-12-05T14:22:00.000Z")
	);

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				disableToolbar
				minDate={today || undefined}
				inputVariant="outlined"
				variant="inline"
				format="MM/dd/yyyy"
				margin="normal"
				label={label}
				KeyboardButtonProps={{
					"aria-label": "change date",
				}}
				value={selectedDate}
				onChange={handleDateChange}
			/>
		</MuiPickersUtilsProvider>
	);
};

export default TextInput;
