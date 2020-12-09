import React from "react";
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { change } from "redux-form";

const today = new Date();

const TextInput = ({
	input,
	width,
	type,
	label,
	placeholder,
	meta: { touched, error, dispatch, form },
	...custom
}) => {
	const [selectedDate, setSelectedDate] = React.useState(new Date());

	const handleDateChange = (date) => {
		setSelectedDate(date);
		dispatch(change(form, input.name, date));
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				disableToolbar
				minDate={today || undefined}
				inputVariant="outlined"
				variant="inline"
				label={label}
				format="MM/dd/yyyy"
				margin="normal"
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
