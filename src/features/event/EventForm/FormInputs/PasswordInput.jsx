import {
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	makeStyles,
	OutlinedInput,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "1rem 0",
	},
}));

const PasswordInput = ({ input, meta: { touched, error }, ...custom }) => {
	const classes = useStyles();

	const [values, setValues] = React.useState({
		password: "",
		showPassword: false,
	});

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	// const handleChange = (prop) => (event) => {
	// 	setValues({ ...values, [prop]: event.target.value });
	// };

	return (
		<FormControl className={classes.root} variant="outlined" fullWidth>
			<InputLabel htmlFor="outlined-adornment-password">
				Password*
			</InputLabel>
			<OutlinedInput
				error={touched && !!error}
				id="outlined-adornment-password"
				type={values.showPassword ? "text" : "password"}
				// value={values.password}
				// onChange={handleChange("password")}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{values.showPassword ? (
								<Visibility />
							) : (
								<VisibilityOff />
							)}
						</IconButton>
					</InputAdornment>
				}
				{...input}
				labelWidth={70}
			/>
			{touched && error && (
				<FormHelperText
					children="Please enter your Password"
					variant="outlined"
					error={true}
				/>
			)}
		</FormControl>
	);
};

export default PasswordInput;
