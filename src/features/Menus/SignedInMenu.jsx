import React, {Fragment} from "react";
import MainButton from "../../Buttons/MainButton";
import IconButton from "@material-ui/core/IconButton";
import { AccountCircle } from "@material-ui/icons";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import MenuButton from "../NavBar/MenuButton";

class SignedInMenu extends React.Component {
    render() {
        return (
            <Fragment>

                <MainButton buttonTitle="Create Event" link="/createEvent" />
                
                {/* Notification */}
                <IconButton color="inherit" classes={this.props.classes.IconButton}>
                    <NotificationsNoneRoundedIcon fontSize="small" />
                </IconButton>

                {/* First Menu */}
                <MenuButton
                    iconType={AddRoundedIcon}
                    items={
                        [
                            {
                                name: "Create Event",
                                link: "/createEvent"
                            },
                            {
                                name: "Browse Events",
                                link: "/events"
                            },
                            {
                                name: "My Events",
                                link: "/createEvent"
                            }
                        ]
                    }
                />

                {/* Second Menu */}
                <MenuButton
                    iconType={AccountCircle}
                    items={
                        [
                            {
                                name: "Profile",
                                link: "/createEvent"
                            },
                            {
                                name: "Help",
                                link: "/createEvent"
                            },
                            {
                                name: "Settings",
                                link: "/settings"
                            },
                            {
                                name: "Logout",
                                link: "/"
                            },
                        ]
                    }
                /> 
            </Fragment>
        );
    }
    
}

export default SignedInMenu;