import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { change } from "redux-form";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
	chips: {
		display: "flex",
		flexWrap: "wrap",
	},
	chip: {
		margin: 2,
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

export default function MultipleSelectInput({
	input,
	label,
	interest,
	meta: { form, dispatch },
}) {
	const classes = useStyles();
	
	const [interestName, setInterestName] = React.useState([]);
	const [firstTime, setFirstTime] = React.useState(true);

	useEffect(() => {
		if (firstTime && interestName.length === 0 && input.value !== "") {
			setInterestName(input.value);
		}
	}, [firstTime, interestName, input.value]);

	const handleChange = (event) => {
		setInterestName(event.target.value);
		setFirstTime(false);
		dispatch(change(form, input.name, event.target.value));
	};

	return (
		<FormControl className={classes.formControl}>
			<InputLabel id="demo-mutiple-chip-label">{label}</InputLabel>
			<Select
				labelId="demo-mutiple-chip-label"
				id="demo-mutiple-chip"
				multiple
				value={interestName}
				onChange={handleChange}
				variant="outlined"
				input={<Input id="select-multiple-chip" />}
				renderValue={(selected) => (
					<div className={classes.chips}>
						{selected.map((value) => (
							<Chip
								key={value}
								label={value}
								className={classes.chip}
							/>
						))}
					</div>
				)}
				MenuProps={MenuProps}
			>
				{interest.map((item) => (
					<MenuItem key={item.key} value={item.value}>
						{item.text}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
