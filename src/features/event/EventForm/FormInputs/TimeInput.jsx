import React, { useEffect, useState } from "react";
import { change } from "redux-form";
import {
	KeyboardTimePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ScheduleIcon from "@material-ui/icons/Schedule";

const TimeInput = ({
	input,
	width,
	type,
	label,
	placeholder,
	meta: { touched, error, dispatch, form },
	...custom
}) => {
	const [selectedTime, setSelectedTime] = useState(new Date());

	useEffect(() => {
		if (input && typeof input.value.toDate === "function")
			setSelectedTime(input.value.toDate());
	}, [input]);

	const handleTimeChange = (time) => {
		setSelectedTime(time);
		dispatch(change(form, input.name, time));
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardTimePicker
				inputVariant="outlined"
				variant="inline"
				format="hh:mm a"
				label={label}
				margin="normal"
				KeyboardButtonProps={{
					"aria-label": "change time",
				}}
				value={selectedTime}
				onChange={handleTimeChange}
				keyboardIcon={<ScheduleIcon />}
			/>
		</MuiPickersUtilsProvider>
	);
};

export default TimeInput;
