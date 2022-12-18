import { TextField } from "@mui/material";
import React, { KeyboardEvent, ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}
export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            activateViewMode()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)


    return editMode
        ? <TextField
            variant={'standard'}
            value={title}
            onBlur={activateViewMode}
            onChange={onChangeHandler}
            onKeyDown={onEnterHandler}
            autoFocus />
        : <span onDoubleClick={activateEditMode} >{props.title}</span>
}
