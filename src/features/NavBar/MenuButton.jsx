import React from "react";
import {
	Box,
	Button,
	Hidden,
	Menu,
	MenuItem,
	Typography,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import { Grid } from "@material-ui/core";
import history from "../../history";

class MenuButton extends React.Component {
	state = {
		anchorEl: null,
	};

	handleMenu = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	BtnText = (text) => {
		return (
			<Typography variant="body2" color="inherit">
				{text}
			</Typography>
		);
	};

	handleClick = (item) => {
		switch (item.type) {
			case "Link":
				history.push(item.link);
				break;
			case "Button":
				item.action();
				break;
			default:
				break;
		}
		this.handleClose();
	};

	render() {
		const { anchorEl } = this.state;
		const { iconType, items, menuName, name } = this.props;
		const open = Boolean(anchorEl);
		const Wrapper = iconType;
		const listItems = items.map((item) => (
			<Box key={item.name} width="100%">
				<MenuItem
					onClick={() => {
						this.handleClick(item);
					}}
					component={Button}
					style={{ width: "100%" }}
				>
					{item.name}
				</MenuItem>
				<Divider light />
			</Box>
		));

		return (
			<Box>
				<Grid container direction="row" alignItems="center">
					<IconButton
						aria-owns={open ? "menu-appbar" : null}
						aria-haspopup="true"
						onClick={this.handleMenu}
						color="inherit"
					>
						{<Wrapper />}

						<Hidden mdUp>
							<Box ml="1.1rem">{this.BtnText(menuName)}</Box>
						</Hidden>

						{name && this.BtnText(name)}
					</IconButton>
				</Grid>
				<Menu
					id="menu-appbar"
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
					transformOrigin={{
						horizontal: "center",
						vertical: "top",
					}}
					open={open}
					keepMounted
					getContentAnchorEl={null}
					onClose={this.handleClose}
				>
					{listItems}
				</Menu>
			</Box>
		);
	}
}

export default MenuButton;
