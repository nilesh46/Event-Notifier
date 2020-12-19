import {
	Avatar,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@material-ui/core";
import React from "react";

const Person = ({ user }) => {
	return (
		<>
			<ListItemIcon>
				<Avatar alt={user.displayName} src={user.photoURL} />
			</ListItemIcon>
			<ListItemText>
				<Typography variant="body2" color="textSecondary">
					<strong>{user.displayName}</strong>
				</Typography>
			</ListItemText>
		</>
	);
};

export default Person;
