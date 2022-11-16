import React from 'react';

export type ButtonPropsType = {
	name: string;
	click: () => void;
};

export function Button(props: ButtonPropsType) {
	const onClickHandler = () => {
		props.click();
	};

	return (
		<>
			<button onClick={onClickHandler}>{props.name}</button>
		</>
	);
}
