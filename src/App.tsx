import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TasksType, TodoList } from './TodoList';

function App() {
	let tasks_1: Array<TasksType> = [
		{ id: 1, name: 'CSS', isDone: true },
		{ id: 2, name: 'JS', isDone: true },
		{ id: 3, name: 'React', isDone: false },
	];

	let tasks_2: Array<TasksType> = [
		{ id: 1, name: 'Terminator', isDone: true },
		{ id: 2, name: 'XXX', isDone: false },
		{ id: 3, name: 'War Angel', isDone: true },
	];

	return (
		<div className='App'>
			<TodoList titleValue='Who is know' tasks={tasks_1} />
			<TodoList titleValue='Movies' tasks={tasks_2} />
		</div>
	);
}

export default App;
