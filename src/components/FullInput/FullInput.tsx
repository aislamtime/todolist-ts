import { TextField } from '@mui/material';
import React, { ChangeEvent, KeyboardEvent } from 'react';
import './../../App.css';

type InputPropsType = {
    title: string;
    className?: string;
    setTitle: (title: string) => void;
    callBack: () => void;
    setError: (error: string) => void;
    placeholder?: string
    error: string
};

export function FullInput(props: InputPropsType) {
    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value);
        props.setError('');
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) =>
        e.key === 'Enter' && props.callBack();

    return (
        <TextField
            placeholder={props.placeholder ? props.placeholder : ''}
            size={'small'}
            variant={'outlined'}
            value={props.title}
            onChange={onInputChangeHandler}
            onKeyDown={onKeyDownHandler}
            error={!!props.error}
            helperText={!!props.error ? 'Text is require!' : ''}
        />
    );
}
