import React from "react";
import "./styles/style.messages.css";

const forceTwoDigits = n => (n < 10 ? '0' : '') + n;

export default (props) => {
	return (
		<div className="message received">
			{props.content}
			<smaller className="date left">
				{forceTwoDigits(props.date.getHours())}:
				{forceTwoDigits(props.date.getMinutes())}
			</smaller>
		</div>
	);
}