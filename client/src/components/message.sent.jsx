import React from "react";
import "./styles/style.messages.css";

export default (props) => {
	return (
		<div className="message sent">
			{props.content}
			<smaller className="date right">12:54</smaller>
		</div>
	);
}