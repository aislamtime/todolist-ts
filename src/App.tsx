import React, { useState } from 'react';
import ts from 'typescript';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, TodoList } from './components/TodoList/TodoList';

export type FilterValuesType = 'all' | 'completed' | 'active';

type TodoListType = {
	id: string;
	title: string;
	filter: FilterValuesType;
};

type AllTasksType = {
	[key: string]: Array<TaskType>;
};

function App() {
	//let [filter, setFilter] = useState<FilterValuesType>('all');

	const removeTask = (taskId: string, todoListId: string) => {
		let tasks = allTasks[todoListId].filter((task) => task.id !== taskId);
		allTasks[todoListId] = tasks;
		setAllTasks({ ...allTasks });
	};

	const addTask = (title: string, todoListId: string) => {
		let newTask = { id: v1(), name: title, isDone: false };
		let tasks = allTasks[todoListId];
		let newTasks = [newTask, ...tasks];
		allTasks[todoListId] = newTasks;
		setAllTasks({ ...allTasks });
	};

	const changeStatus = (id: string, isDone: boolean, todoListId: string) => {
		let tasks = allTasks[todoListId];
		let task = tasks.find((t) => t.id === id);
		if (task) {
			task.isDone = isDone;
			setAllTasks({ ...allTasks });
		}
	};

	const changeFilter = (value: FilterValuesType, todoListId: string) => {
		let todoList = todoLists.find((tl) => tl.id === todoListId);
		if (todoList) {
			todoList.filter = value;
			setTodoLists([...todoLists]);
		}
	};

	const todoListId1 = v1();
	const todoListId2 = v1();

	let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
		{ id: todoListId1, title: 'What to learn', filter: 'all' },
		{ id: todoListId2, title: 'What to buy', filter: 'completed' },
	]);

	let [allTasks, setAllTasks] = useState<AllTasksType>({
		[todoListId1]: [
			{ id: v1(), name: 'CSS', isDone: true },
			{ id: v1(), name: 'JS', isDone: true },
			{ id: v1(), name: 'React', isDone: false },
			{ id: v1(), name: 'Redux', isDone: false },
			{ id: v1(), name: 'Node', isDone: false },
		],
		[todoListId2]: [
			{ id: v1(), name: 'Book', isDone: false },
			{ id: v1(), name: 'Milk', isDone: true },
		],
	});

	return (
		<div className='App'>
			{todoLists.map((tl) => {
				let filteredTasks: Array<TaskType> = [...allTasks[tl.id]];

				if (tl.filter === 'completed') {
					filteredTasks = allTasks[tl.id].filter(
						(task) => task.isDone === true
					);
					//tasks = tasks.filter((task) => task.isDone === true);
				}
				if (tl.filter === 'active') {
					filteredTasks = allTasks[tl.id].filter(
						(task) => task.isDone === false
					);
				}

				return (
					<TodoList
						key={tl.id}
						id={tl.id}
						title={tl.title}
						tasks={filteredTasks}
						addTask={addTask}
						removeTask={removeTask}
						changeFilter={changeFilter}
						changeTaskStatus={changeStatus}
						filter={tl.filter}
					/>
				);
			})}
		</div>
	);
}

export default App;
