import { Drawer, IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import * as React from "react";
import { useState } from "react";

const SideDrawer = ({ drawerList }) => {
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
			>
				{drawerList()}
			</Drawer>
		</React.Fragment>
	);
};

export default SideDrawer;
