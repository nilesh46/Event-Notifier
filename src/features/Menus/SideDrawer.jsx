import { Drawer, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";
import * as React from "react";
import { useState } from "react";

const useStyles = makeStyles({
	paper: {
		background: "#2E3B55",
		color: "white",
		padding: "1rem",
	},
});

const SideDrawer = ({ drawerList }) => {
	const styles = useStyles();
	const [state, setState] = useState({ right: false });

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ [anchor]: open });
	};

	return (
		<React.Fragment>
			<IconButton
				edge="start"
				aria-label="menu"
				onClick={toggleDrawer("right", true)}
			>
				<Menu fontSize="large" style={{ color: `white` }} />
			</IconButton>

			<Drawer
				anchor="right"
				open={state.right}
				onClose={toggleDrawer("right", false)}
				classes={{ paper: styles.paper }}
			>
				{drawerList()}
			</Drawer>
		</React.Fragment>
	);
};

export default SideDrawer;
