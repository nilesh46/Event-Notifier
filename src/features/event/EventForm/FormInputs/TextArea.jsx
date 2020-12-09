import React from "react";
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
	const [openEmojiPicker, setOpenEmojiPicker] = React.useState(false);

	const onChange = (e) => {
		setText(e.target.value);
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

		dispatch(change(form, "comment", text + emoji));
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
