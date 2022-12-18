import React from 'react';
import { Button } from '@mui/material';
import './../../App.css';

export type ButtonPropsType = {
    name: string;
    click: () => void;
    className?: string;
};

export function FullButton(props: ButtonPropsType) {
    const onClickHandler = () => {
        props.click();
    };

    return (
        <>
            <Button size='small' variant='outlined' onClick={onClickHandler}>
                {props.name}
            </Button>
        </>
    );
}
