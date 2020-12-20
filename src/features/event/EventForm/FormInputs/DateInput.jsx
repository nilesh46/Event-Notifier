import React, { useState } from "react";
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { change } from "redux-form";
import { useEffect } from "react";

const DateInput = ({
	input,
	width,
	type,
	label,
	placeholder,
	meta: { touched, error, dispatch, form },
	...custom
}) => {
	const [selectedDate, setSelectedDate] = useState(new Date());

	useEffect(() => {
		if (input && typeof input.value.toDate === "function")
			setSelectedDate(input.value.toDate());
	}, [input]);

	const handleDateChange = (date) => {
		setSelectedDate(date);
		dispatch(change(form, input.name, date));
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				disableToolbar={!custom.fullView}
				minDate={custom.mindate || undefined}
				maxDate={custom.maxdate || undefined}
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

export default DateInput;
