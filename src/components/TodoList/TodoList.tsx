import React, { ChangeEvent } from 'react';
import { v1 } from 'uuid';
import { FilterValuesType, TaskType } from '../../App';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { Button } from '../Button/Button';
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
            <Button name={'X'} click={removeTodoList} />

            <AddItemForm addItem={addTask} />

            <ul>
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
                        <li className={task.isDone ? 'completeTask' : ''} key={task.id}>
                            <input
                                type='checkbox'
                                onChange={onChangeStatusHandler}
                                checked={task.isDone}
                            />
                            <EditableSpan title={task.name} onChange={onChangeTitleHandler} />
                            {/*Кнопка которая удаляет таск*/}
                            <Button name={'X'} click={onRemoveClickHandler} />
                        </li>
                    );
                })}
            </ul>

            <div>
                <Button
                    className={props.filter === 'all' ? 'active' : ''}
                    name={'All'}
                    click={() => props.changeFilter('all', props.todoListId)}
                />
                <Button
                    className={props.filter === 'active' ? 'active' : ''}
                    name={'Active'}
                    click={() => props.changeFilter('active', props.todoListId)}
                />
                <Button
                    className={props.filter === 'completed' ? 'active' : ''}
                    name={'Completed'}
                    click={() => props.changeFilter('completed', props.todoListId)}
                />
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

