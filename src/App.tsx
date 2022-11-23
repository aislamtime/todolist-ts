import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import {
	FilterValuesType,
	TasksType,
	TodoList,
} from './components/TodoList/TodoList';

function App() {
	let [initTasks, setTasks] = useState<Array<TasksType>>([
		{ id: v1(), name: 'CSS', isDone: true },
		{ id: v1(), name: 'JS', isDone: true },
		{ id: v1(), name: 'React', isDone: false },
		{ id: v1(), name: 'Redux', isDone: false },
		{ id: v1(), name: 'Node', isDone: false },
	]);
	let [filter, setFilter] = useState<FilterValuesType>('all');

	let tasks = initTasks;
	if (filter === 'completed') {
		tasks = tasks.filter((task) => task.isDone === true);
	}
	if (filter === 'active') {
		tasks = tasks.filter((task) => task.isDone === false);
	}

	return (
		<div className='App'>
			<TodoList
				titleValue='Who is know'
				tasks={tasks}
				setTasks={setTasks}
				setFilter={setFilter}
			/>
		</div>
	);
}

export default App;
