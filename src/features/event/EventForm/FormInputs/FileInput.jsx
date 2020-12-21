import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { change } from "redux-form";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	input: {
		display: "none",
	},
}));

const FileInput = ({
	input,
	width,
	type,
	label,
	placeholder,
	meta: { touched, error, dispatch, form },
	...custom
}) => {
	const classes = useStyles();

	const handleOnChange = (e) => {
		const files = document.querySelector("#contained-button-file").files;
		const filesArr = Object.values(files);
		custom.setList(filesArr);
		dispatch(change(form, input.name, filesArr));
	};

	const clearInput = () => {
		document.querySelector("#contained-button-file").value = "";
		custom.setList([]);
		dispatch(change(form, input.name, []));
	};

	return (
		<div className={classes.root}>
			<input
				accept={custom.fileTypes}
				className={classes.input}
				id="contained-button-file"
				multiple
				type="file"
				onChange={handleOnChange}
			/>
			<label htmlFor="contained-button-file">
				<Button variant="contained" color="primary" component="span">
					{label}
				</Button>
			</label>
			<Button
				variant="contained"
				type="button"
				color="inherit"
				onClick={clearInput}
			>
				Clear
			</Button>
		</div>
	);
};

export default FileInput;
