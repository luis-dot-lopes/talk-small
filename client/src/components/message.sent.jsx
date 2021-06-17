import React from "react";
import "./styles/style.messages.css";

export default (props) => {
	return (
		<div className="message sent">
			{props.content}
		</div>
	);
}