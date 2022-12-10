import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

type AddItemFormPropsType = {
    addItem: (title: string) => void
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

    return (
        <div>
            <Input
                title={title}
                setTitle={setTitle}
                callBack={addTaskHandler}
                setError={setError}
                className={error && 'error'}
            />
            <Button name='+' click={addTaskHandler} />
            {error && <div className='errorMessage'>{error}</div>}
        </div>
    )
}