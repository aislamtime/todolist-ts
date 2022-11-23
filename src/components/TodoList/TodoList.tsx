import React, { KeyboardEvent, ChangeEvent, useState } from 'react';
import { v1 } from 'uuid';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import './../../App.css';

export type TasksType = {
	id: string;
	name: string;
	isDone: boolean;
};

export type FilterValuesType = 'all' | 'completed' | 'active';

type TodoListPropsType = {
	titleValue: string;
	tasks: Array<TasksType>;
	setTasks: (tasks: Array<TasksType>) => void;
	filter: string;
	setFilter: (filter: FilterValuesType) => void;
	changeTaskStatus: (id: string, isDone: boolean) => void;
};

export function TodoList(props: TodoListPropsType) {
	let [title, setTitle] = useState('');
	let [error, setError] = useState<string>('');

	const filterTasks = (buttonName: FilterValuesType) => {
		props.setFilter(buttonName);
	};

	const removeTask = (id: string) => {
		let resultRemoveTasks = props.tasks.filter((task) => task.id !== id);
		props.setTasks(resultRemoveTasks);
	};

	const addTask = (title: string) => {
		if (title.trim() !== '') {
			let newTask = { id: v1(), name: title, isDone: false };
			props.setTasks([newTask, ...props.tasks]);
			setTitle('');
			setError('');
		} else {
			setError('Message is require!');
		}
	};

	const addTaskHandler = () => {
		addTask(title);
	};

	return (
		<div>
			<TodoListTitle title={props.titleValue} />
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
						props.changeTaskStatus(task.id, newIsDone);
					};

					const onRemoveClickHandler = () => {
						removeTask(task.id);
					};

					return (
						<li className={task.isDone ? 'completeTask' : ''} key={task.id}>
							<input
								type='checkbox'
								onChange={onChangeStatusHandler}
								checked={task.isDone}
							/>{' '}
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
					click={() => filterTasks('all')}
				/>
				<Button
					className={props.filter === 'active' ? 'active' : ''}
					name={'Active'}
					click={() => filterTasks('active')}
				/>
				<Button
					className={props.filter === 'completed' ? 'active' : ''}
					name={'Completed'}
					click={() => filterTasks('completed')}
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
