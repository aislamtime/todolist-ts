import React, { ChangeEvent, KeyboardEvent } from 'react';

type InputPropsType = {
	title: string;
	setTitle: (title: string) => void;
	callBack: () => void;
};

export function Input(props: InputPropsType) {
	const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		props.setTitle(e.currentTarget.value);
	};

	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) =>
		e.key === 'Enter' && props.callBack();

	return (
		<input
			value={props.title}
			onChange={onInputChangeHandler}
			onKeyDown={onKeyDownHandler}
		/>
	);
}
