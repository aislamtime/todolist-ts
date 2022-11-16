import React from 'react';

export type ButtonPropsType = {
	name: string;
	click: Function;
	clickParameter?: number | string;
};

export function Button(props: ButtonPropsType) {
	return (
		<>
			<button onClick={() => props.click(props.clickParameter)}>
				{props.name}
			</button>
		</>
	);
}
