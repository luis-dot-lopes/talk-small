import React from "react";
import "./styles/style.messages.css";

const forceTwoDigits = n => (n < 10 ? '0' : '') + n;

export default (props) => {
	return (
		<div className="message sent">
			{props.content}
			<smaller className="date right">
				{forceTwoDigits(props.date.getHours())}:
				{forceTwoDigits(props.date.getMinutes())}
			</smaller>
		</div>
	);
}