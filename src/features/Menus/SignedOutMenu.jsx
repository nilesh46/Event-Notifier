import React from "react";
import MainButton from "../../Buttons/MainButton";

const SignedOutMenu = (props) => {
    return (
        <MainButton
            buttonTitle="Login"
            link="/events"
            onClick={props.onClick}
        />
    );
};

export default SignedOutMenu;
