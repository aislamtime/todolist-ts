import React from 'react';

type InputPropsType = {
	title: string;
	inputChange: Function;
};

export function Input(props: InputPropsType) {
	const onInputChangeHandler = () => {
		props.inputChange();
	};

	return <input value={props.title} onChange={onInputChangeHandler} />;
}
