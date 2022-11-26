import React, { KeyboardEvent, ChangeEvent, useState } from 'react';
import { v1 } from 'uuid';
import { FilterValuesType } from '../../App';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import './../../App.css';

export type TaskType = {
	id: string;
	name: string;
	isDone: boolean;
};

type TodoListPropsType = {
	id: string;
	title: string;
	tasks: Array<TaskType>;
	addTask: (title: string, todoListId: string) => void;
	removeTask: (taskId: string, todoListId: string) => void;
	changeFilter: (filter: FilterValuesType, todoListId: string) => void;
	changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void;
	filter: FilterValuesType;
};

export function TodoList(props: TodoListPropsType) {
	let [title, setTitle] = useState('');
	let [error, setError] = useState<string>('');

	const addTaskHandler = () => {
		if (title.trim() !== '') {
			props.addTask(title, props.id);
			setTitle('');
			setError('');
		} else {
			setError('Message is require!');
		}
	};

	return (
		<div>
			<TodoListTitle title={props.title} />
			<div>
				<Input
					className={error && 'error'}
					title={title}
					setTitle={setTitle}
					callBack={addTaskHandler}
					setError={setError}
				/>
				<Button name='+' click={addTaskHandler} />
				{error && <div className='errorMessage'>{error}</div>}
			</div>

			<ul>
				{props.tasks.map((task) => {
					const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
						const newIsDone = e.currentTarget.checked;
						props.changeTaskStatus(task.id, newIsDone, props.id);
					};
					const onRemoveClickHandler = () => {
						props.removeTask(task.id, props.id);
					};

					return (
						<li className={task.isDone ? 'completeTask' : ''} key={task.id}>
							<input
								type='checkbox'
								onChange={onChangeStatusHandler}
								checked={task.isDone}
							/>
							<span>{task.name}</span>
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
					click={() => props.changeFilter('all', props.id)}
				/>
				<Button
					className={props.filter === 'active' ? 'active' : ''}
					name={'Active'}
					click={() => props.changeFilter('active', props.id)}
				/>
				<Button
					className={props.filter === 'completed' ? 'active' : ''}
					name={'Completed'}
					click={() => props.changeFilter('completed', props.id)}
				/>
			</div>
		</div>
	);
}

type TitlePropsType = {
	title: string;
};

function TodoListTitle(props: TitlePropsType) {
	return <h3>{props.title}</h3>;
}
