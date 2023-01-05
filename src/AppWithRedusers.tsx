import { Menu } from '@mui/icons-material'
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import React, { useReducer, useState } from 'react'
import { v1 } from 'uuid'
import './App.css'
import { AddItemForm } from './components/AddItemForm/AddItemForm'
import { TodoList } from './components/TodoList/TodoList'
import {
	addTaskAC,
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC,
	tasksReduser,
} from './store/redusers/tasks-reduser'
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	todolistReduser,
} from './store/redusers/todolist-reduser'

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
export type TodoListType = {
	id: string
	title: string
	filter: FilterValuesType
}
export type AllTasksType = {
	[key: string]: Array<TaskType>
}

function AppWithRedusers() {
	const todoListId1 = v1()
	const todoListId2 = v1()
	const [todoLists, dispatchToTodolistReducer] = useReducer(todolistReduser, [
		{ id: todoListId1, title: 'What to learn', filter: 'all' },
		{ id: todoListId2, title: 'What to buy', filter: 'all' },
	])
	const [allTasks, dispatchToTasksReducer] = useReducer(tasksReduser, {
		[todoListId1]: [
			{ id: v1(), title: 'CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'React', isDone: false },
			{ id: v1(), title: 'Redux', isDone: false },
			{ id: v1(), title: 'Node', isDone: false },
		],
		[todoListId2]: [
			{ id: v1(), title: 'Book', isDone: false },
			{ id: v1(), title: 'Milk', isDone: true },
		],
	})

	const removeTask = (taskId: string, todoListId: string) => dispatchToTasksReducer(removeTaskAC(todoListId, taskId))

	const addTask = (title: string, todoListId: string) => dispatchToTasksReducer(addTaskAC(todoListId, title))

	const changeStatus = (id: string, isDone: boolean, todoListId: string) =>
		dispatchToTasksReducer(changeTaskStatusAC(todoListId, id, isDone))

	const changeTitle = (id: string, title: string, todoListId: string) =>
		dispatchToTasksReducer(changeTaskTitleAC(todoListId, id, title))

	const changeFilter = (value: FilterValuesType, todoListId: string) =>
		dispatchToTodolistReducer(changeTodolistFilterAC(todoListId, value))

	const changeTodoListTitle = (title: string, id: string) => dispatchToTodolistReducer(changeTodolistTitleAC(id, title))

	const addTodoList = (title: string) => {
		const action = addTodolistAC(title)
		dispatchToTasksReducer(action)
		dispatchToTodolistReducer(action)
	}

	const removeTodoList = (id: string) => {
		const action = removeTodolistAC(id)
		dispatchToTasksReducer(action)
		dispatchToTodolistReducer(action)
	}

	return (
		<div className='App'>
			<AppBar position='sticky'>
				<Toolbar>
					<IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
						<Menu />
					</IconButton>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						TODOS
					</Typography>
					<Button color='inherit'>Login</Button>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<div>
							<h3>Add new TodoList</h3>
							<AddItemForm inputPlaceholder={'Add list..'} iconType={'list'} addItem={addTodoList} />
						</div>
					</Grid>

					{todoLists.map((tl) => {
						let filteredTasks: Array<TaskType> = [...allTasks[tl.id]]

						if (tl.filter === 'completed') {
							filteredTasks = allTasks[tl.id].filter((task) => task.isDone === true)
							//tasks = tasks.filter((task) => task.isDone === true);
						}
						if (tl.filter === 'active') {
							filteredTasks = allTasks[tl.id].filter((task) => task.isDone === false)
						}

						return (
							<Grid item xs={12} sm={6} md={4}>
								<Paper style={{ padding: '15px' }} elevation={3}>
									<TodoList
										key={tl.id}
										todoListId={tl.id}
										title={tl.title}
										tasks={filteredTasks}
										addTask={addTask}
										removeTask={removeTask}
										changeFilter={changeFilter}
										changeTaskStatus={changeStatus}
										changeTaskTitle={changeTitle}
										filter={tl.filter}
										removeTodoList={removeTodoList}
										changeTodoListTitle={changeTodoListTitle}
									/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</div>
	)
}

export default AppWithRedusers
