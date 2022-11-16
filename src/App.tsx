import React, { useState } from 'react';
import './App.css';
import { TasksType, TodoList } from './components/TodoList/TodoList';

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {
	let [initTasks, setTasks] = useState<Array<TasksType>>([
		{ id: 1, name: 'CSS', isDone: true },
		{ id: 2, name: 'JS', isDone: true },
		{ id: 3, name: 'React', isDone: false },
		{ id: 4, name: 'Redux', isDone: false },
		{ id: 5, name: 'Node', isDone: false },
	]);
	let [filter, setFilter] = useState<FilterValuesType>('all');

	const removeTask = (id: number) => {
		let resultRemoveTasks = tasks.filter((task) => task.id !== id);
		setTasks(resultRemoveTasks);
	};

	let tasks = initTasks;
	if (filter === 'completed') {
		tasks = tasks.filter((task) => task.isDone === true);
	}
	if (filter === 'active') {
		tasks = tasks.filter((task) => task.isDone === false);
	}

	const filterTasks = (buttonName: FilterValuesType) => {
		setFilter(buttonName);
	};

	return (
		<div className='App'>
			<TodoList
				titleValue='Who is know'
				tasks={tasks}
				removeTask={removeTask}
				filterTasks={filterTasks}
			/>
		</div>
	);
}

export default App;
