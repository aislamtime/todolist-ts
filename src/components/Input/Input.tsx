import React, { ChangeEvent, KeyboardEvent } from 'react';
import './../../App.css';

type InputPropsType = {
	title: string;
	className: string;
	setTitle: (title: string) => void;
	callBack: () => void;
	setError: (error: string) => void;
};

export function Input(props: InputPropsType) {
	const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		props.setTitle(e.currentTarget.value);
		props.setError('');
	};

	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) =>
		e.key === 'Enter' && props.callBack();

	return (
		<input
			className={props.className}
			value={props.title}
			onChange={onInputChangeHandler}
			onKeyDown={onKeyDownHandler}
		/>
	);
}
