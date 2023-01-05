import { Menu } from '@mui/icons-material'
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { AddItemForm } from './components/AddItemForm/AddItemForm'
import { TodoList } from './components/TodoList/TodoList'
import {
	addTaskAC,
	AllTasksType,
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC,
	TaskType,
} from './store/redusers/tasks-reduser'
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	FilterValuesType,
	removeTodolistAC,
	TodoListType,
} from './store/redusers/todolist-reduser'
import { RootStateType } from './store/store'

function AppWithRedux() {
	const dispatch = useDispatch()
	const todolists = useSelector<RootStateType, TodoListType[]>((state: RootStateType) => state.todolists)
	const tasks = useSelector<RootStateType, AllTasksType>((state: RootStateType) => state.tasks)

	const removeTask = (taskId: string, todoListId: string) => dispatch(removeTaskAC(todoListId, taskId))

	const addTask = (title: string, todoListId: string) => dispatch(addTaskAC(todoListId, title))

	const changeStatus = (id: string, isDone: boolean, todoListId: string) =>
		dispatch(changeTaskStatusAC(todoListId, id, isDone))

	const changeTitle = (id: string, title: string, todoListId: string) =>
		dispatch(changeTaskTitleAC(todoListId, id, title))

	const changeFilter = (value: FilterValuesType, todoListId: string) =>
		dispatch(changeTodolistFilterAC(todoListId, value))

	const changeTodoListTitle = (title: string, id: string) => dispatch(changeTodolistTitleAC(id, title))

	const addTodoList = (title: string) => {
		const action = addTodolistAC(title)
		dispatch(action)
	}

	const removeTodoList = (id: string) => {
		const action = removeTodolistAC(id)
		dispatch(action)
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

					{todolists.map((tl) => {
						let filteredTasks: Array<TaskType> = [...tasks[tl.id]]

						if (tl.filter === 'completed') {
							filteredTasks = tasks[tl.id].filter((task) => task.isDone === true)
							//tasks = tasks.filter((task) => task.isDone === true);
						}
						if (tl.filter === 'active') {
							filteredTasks = tasks[tl.id].filter((task) => task.isDone === false)
						}

						return (
							<Grid item xs={12} sm={6} md={4} key={tl.id}>
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

export default AppWithRedux
