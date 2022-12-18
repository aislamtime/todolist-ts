import { Delete } from '@mui/icons-material';
import { Button, Checkbox, IconButton } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { FilterValuesType, TaskType } from '../../App';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { EditableSpan } from '../EditableSpan/EditableSpan';

type TodoListPropsType = {
    todoListId: string;
    title: string;
    tasks: Array<TaskType>;
    addTask: (title: string, todoListId: string) => void;
    removeTask: (taskId: string, todoListId: string) => void;
    changeFilter: (filter: FilterValuesType, todoListId: string) => void;
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void;
    changeTaskTitle: (id: string, title: string, todoListId: string) => void;
    filter: FilterValuesType;
    removeTodoList: (id: string) => void
    changeTodoListTitle: (title: string, id: string) => void
};

export function TodoList(props: TodoListPropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }

    const removeTodoList = () => {
        props.removeTodoList(props.todoListId)
    }
    const changeTodoListTitleHandler = (title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }
    return (
        <div>
            <TodoListTitle title={props.title} changeTitle={changeTodoListTitleHandler} />
            <IconButton onClick={removeTodoList} >
                <Delete />
            </IconButton>

            <AddItemForm
                inputPlaceholder={'Add task..'}
                iconType={'task'}
                addItem={addTask} />

            <div>
                {props.tasks.map((task) => {

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newIsDone = e.currentTarget.checked;
                        props.changeTaskStatus(task.id, newIsDone, props.todoListId);
                    };
                    const onChangeTitleHandler = (title: string) => {
                        props.changeTaskTitle(task.id, title, props.todoListId);
                    };

                    const onRemoveClickHandler = () => {
                        props.removeTask(task.id, props.todoListId);
                    };

                    return (
                        <div className={task.isDone ? 'completeTask' : ''} key={task.id}>
                            <Checkbox
                                onChange={onChangeStatusHandler}
                                checked={task.isDone}
                                color="success"
                            />
                            <EditableSpan title={task.name} onChange={onChangeTitleHandler} />
                            {/*Кнопка которая удаляет таск*/}
                            <IconButton onClick={onRemoveClickHandler} >
                                <Delete />
                            </IconButton>
                        </div>
                    );
                })}
            </div>

            <div>
                <Button
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={() => props.changeFilter('all', props.todoListId)} >All
                </Button>
                <Button
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    color={'error'}
                    onClick={() => props.changeFilter('active', props.todoListId)} >Active
                </Button>
                <Button
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    color={'success'}
                    onClick={() => props.changeFilter('completed', props.todoListId)} >Completed
                </Button>
            </div>
        </div>
    );
}

type TitlePropsType = {
    title: string;
    changeTitle: (title: string) => void
};
function TodoListTitle(props: TitlePropsType) {
    const onchangeHandler = (title: string) => props.changeTitle(title)
    return <EditableSpan title={props.title} onChange={onchangeHandler} />;
}

