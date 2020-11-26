import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const style = {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 36,
    padding: "0 1rem",
    margin: "0 2rem",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
};

class MainButton extends React.Component {
  render() {
    return (
        <Button
            style={style}
            component={Link}
            to={this.props.link}
            onClick={() => this.props.onClick()}
        >
            {this.props.buttonTitle}
        </Button>
    );
  }
}

export default MainButton;
