import React, { useEffect } from "react";
import {
	Collapse,
	IconButton,
	InputAdornment,
	TextField,
} from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { change } from "redux-form";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import yellow from "@material-ui/core/colors/yellow";

const TextInput = ({
	input,
	width,
	rows,
	type,
	label,
	placeholder,
	meta: { touched, error, form, dispatch },
	...custom
}) => {
	const [text, setText] = React.useState("");
	const [firstTime, setFirstTime] = React.useState(true);
	const [openEmojiPicker, setOpenEmojiPicker] = React.useState(false);

	useEffect(() => {
		if (firstTime && text === "") {
			setText(input.value);
		}
	}, [firstTime, text, input.value]);

	const onChange = (e) => {
		setText(e.target.value);
		setFirstTime(false);
	};

	const onClickIcon = () => {
		setOpenEmojiPicker(!openEmojiPicker);
	};

	const addEmoji = (e) => {
		let sym = e.unified.split("-");
		let codesArray = [];
		sym.forEach((el) => codesArray.push("0x" + el));
		let emoji = String.fromCodePoint(...codesArray);
		setText(text + emoji);

		dispatch(change(form, input.name, text + emoji));
	};

	return (
		<>
			<TextField
				error={touched && !!error}
				placeholder={placeholder}
				variant="outlined"
				size="small"
				multiline
				label={label}
				rows={rows}
				fullWidth
				{...input}
				{...custom}
				helperText={touched && error && error}
				onChange={onChange}
				value={text}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								onClick={onClickIcon}
								style={{ color: yellow[800] }}
							>
								<InsertEmoticonIcon />
							</IconButton>
						</InputAdornment>
					),
				}}
			/>

			<Collapse in={openEmojiPicker} timeout="auto">
				<Picker onSelect={addEmoji} style={{ maxWidth: "80vw" }} />
			</Collapse>
		</>
	);
};

export default TextInput;
