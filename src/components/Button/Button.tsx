import React from 'react';
import './../../App.css';

export type ButtonPropsType = {
	name: string;
	click: () => void;
	className?: string;
};

export function Button(props: ButtonPropsType) {
	const onClickHandler = () => {
		props.click();
	};

	return (
		<>
			<button className={props.className} onClick={onClickHandler}>
				{props.name}
			</button>
		</>
	);
}
