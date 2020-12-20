import React from "react";
import icon from "../../../Assets/Logo.svg";
import "./LoadingIcon.css";

export default function LoadingIcon() {
	return (
		<div>
			<img src={icon} alt="loadingIcon" className="rotate"></img>
		</div>
	);
}
