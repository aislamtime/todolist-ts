import React from 'react';
import { Button } from '../Button/Button';

export type TasksType = {
	id: number;
	name: string;
	isDone: boolean;
};

type PropsType = {
	titleValue: string;
	tasks: Array<TasksType>;
	removeTask: Function;
	filterTasks: Function;
};

export function TodoList(props: PropsType) {
	return (
		<div>
			<TodoListTitle title={props.titleValue} />
			<div>
				<input />
				<button>+</button>
			</div>
			<ul>
				{props.tasks.map((task, index) => {
					return (
						<li key={index}>
							<input type='checkbox' checked={task.isDone} />{' '}
							<span>{task.name}</span>
							{/*<button onClick={() => props.removeTask(task.id)}>X</button>*/}
							{/*Кнопка которая удаляет таск*/}
							<Button
								name={'X'}
								click={props.removeTask}
								clickParameter={task.id}
							/>
						</li>
					);
				})}
			</ul>
			<div>
				<Button name={'All'} click={props.filterTasks} clickParameter={'all'} />
				<Button
					name={'Active'}
					click={props.filterTasks}
					clickParameter={'active'}
				/>
				<Button
					name={'Completed'}
					click={props.filterTasks}
					clickParameter={'completed'}
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
