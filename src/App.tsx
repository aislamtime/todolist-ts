import React, { useState } from 'react';
import './App.css';
import { TasksType, TodoList } from './TodoList';

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {
	let [tasks, setTasks] = useState<Array<TasksType>>([
		{ id: 1, name: 'CSS', isDone: true },
		{ id: 2, name: 'JS', isDone: true },
		{ id: 3, name: 'React', isDone: false },
		{ id: 4, name: 'Redux', isDone: false },
		{ id: 5, name: 'Node', isDone: false },
	]);
	let [filter, setFilter] = useState<FilterValuesType>('all');

	const removeTask = (id: number) => {
		let resultRemoveTasks = tasks.filter(
			(filteredTask) => filteredTask.id !== id
		);
		setTasks(resultRemoveTasks);
	};

	let filteredTasks = tasks;
	if (filter === 'completed') {
		filteredTasks = tasks.filter((task) => task.isDone === true);
	}
	if (filter === 'active') {
		filteredTasks = tasks.filter((task) => task.isDone === false);
	}

	const filterTasks = (buttonName: FilterValuesType) => {
		setFilter(buttonName);
	};

	return (
		<div className='App'>
			<TodoList
				titleValue='Who is know'
				tasks={filteredTasks}
				removeTask={removeTask}
				filterTasks={filterTasks}
			/>
		</div>
	);
}

export default App;
