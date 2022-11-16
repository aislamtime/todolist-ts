import React, { KeyboardEvent, ChangeEvent, useState } from 'react';
import { v1 } from 'uuid';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

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
	setFilter: (filter: FilterValuesType) => void;
	//removeTask: (id: string) => void;
	//filterTasks: Function;
	//addTask: () => void;
};

export function TodoList(props: TodoListPropsType) {
	let [title, setTitle] = useState('');

	const filterTasks = (buttonName: FilterValuesType) => {
		props.setFilter(buttonName);
	};

	const removeTask = (id: string) => {
		let resultRemoveTasks = props.tasks.filter((task) => task.id !== id);
		props.setTasks(resultRemoveTasks);
	};

	const addTask = (title: string) => {
		let newTask = { id: v1(), name: title, isDone: false };
		props.setTasks([newTask, ...props.tasks]);
		setTitle('');
	};

	const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.currentTarget.value);
	};

	const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.code === 'Enter') {
			addTask(title);
		}
	};

	return (
		<div>
			<TodoListTitle title={props.titleValue} />
			<div>
				<input
					value={title}
					onChange={inputChange}
					onKeyPress={onKeyPressHandler}
				/>
				{/*<Input title={title} inputChange={inputChange} />*/}
				<Button name='+' click={() => addTask(title)} />
			</div>
			<ul>
				{props.tasks.map((task) => {
					return (
						<li key={task.id}>
							<input type='checkbox' checked={task.isDone} />{' '}
							<span>{task.name}</span>
							{/*Кнопка которая удаляет таск*/}
							<Button name={'X'} click={() => removeTask(task.id)} />
						</li>
					);
				})}
			</ul>
			<div>
				<Button name={'All'} click={() => filterTasks('all')} />
				<Button
					name={'Active'}
					click={() => filterTasks('active')}
					//clickParameter={'active'}
				/>
				<Button
					name={'Completed'}
					click={() => filterTasks('completed')}
					//clickParameter={'completed'}
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
