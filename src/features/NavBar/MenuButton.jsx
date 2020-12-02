import React from "react";
import { Box, Hidden, Menu, MenuItem, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";

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
			<Typography variant="body2" color="textSecondary">
				{text}
			</Typography>
		);
	};

	render() {
		const { anchorEl } = this.state;
		const open = Boolean(anchorEl);
		const Wrapper = this.props.iconType;
		const listItems = this.props.items.map((link) => (
			<Box key={link.name}>
				<MenuItem
					onClick={this.handleClose}
					component={Link}
					to={link.link}
				>
					{link.name}
				</MenuItem>
				<Divider light />
			</Box>
		));

		const { menuName } = this.props;
		return (
			<Box>
				<IconButton
					aria-owns={open ? "menu-appbar" : null}
					aria-haspopup="true"
					onClick={this.handleMenu}
					color="inherit"
				>
					{<Wrapper />}
					<Hidden mdUp>{this.BtnText(menuName)}</Hidden>
				</IconButton>
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
