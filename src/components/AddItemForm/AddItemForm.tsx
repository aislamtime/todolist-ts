import { ControlPoint, PlaylistAdd } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { FullButton } from '../FullButton/FullButton';
import { FullInput } from '../FullInput/FullInput';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    inputPlaceholder?: string
    iconType?: string
}
export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string>('');

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
            setError('');
        } else {
            setError('Message is require!');
        }
    };

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError('');
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) =>
        e.key === 'Enter' && addTaskHandler();

    return (
        <div>
            <TextField
                size={'small'}
                variant={'outlined'}
                value={title}
                onChange={onInputChangeHandler}
                onKeyDown={onKeyDownHandler}
                placeholder={props.inputPlaceholder}
                error={!!error}
                helperText={!!error ? 'Text is require!' : ''}
            />
            <IconButton onClick={addTaskHandler} >
                {props.iconType === 'list' ? <PlaylistAdd /> : <ControlPoint />}
            </IconButton>
        </div>
    )
}