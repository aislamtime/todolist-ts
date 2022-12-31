import { v1 } from 'uuid'
import { AllTasksType } from '../../App'

type TasksActionsType =
	| ReturnType<typeof removeTaskAC>
	| ReturnType<typeof addTaskAC>
	| ReturnType<typeof changeTaskStatusAC>
	| ReturnType<typeof changeTaskTitleAC>

export const tasksReduser = (state: AllTasksType, action: TasksActionsType): AllTasksType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			let tasks = state[action.todolistId].filter((task) => task.id !== action.taskId)
			//state[action.todsolistId] = tasks
			return {
				...state,
				[action.todolistId]: tasks,
			}
		}
		case 'ADD-TASK': {
			let newTask = { id: v1(), title: action.title, isDone: false }
			let tasks = state[action.todolistId]
			let newTasks = [newTask, ...tasks]
			//state[action.todolistId] = newTasks
			return {
				...state,
				[action.todolistId]: newTasks,
			}
		}
		case 'CHANGE-TASK-STATUS': {
			let tasks = state[action.todolistId]
			let task = tasks.find((t) => t.id === action.taskId)
			if (task) {
				task.isDone = action.status
				return { ...state }
			} else return state
		}
		case 'CHANGE-TASK-TITLE': {
			let tasks = state[action.todolistId]
			let task = tasks.find((t) => t.id === action.taskId)
			if (task) {
				task.title = action.newTitle
				return { ...state }
			} else return state
		}
		default:
			throw new Error('BAD ACTION TYPE')
	}
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
	return {
		type: 'REMOVE-TASK',
		todolistId: todolistId,
		taskId: taskId,
	} as const
}
export const addTaskAC = (todolistId: string, title: string) => {
	return {
		type: 'ADD-TASK',
		todolistId: todolistId,
		title: title,
	} as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, newStatus: boolean) => {
	return {
		type: 'CHANGE-TASK-STATUS',
		todolistId: todolistId,
		taskId: taskId,
		status: newStatus,
	} as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
	return {
		type: 'CHANGE-TASK-TITLE',
		todolistId: todolistId,
		taskId: taskId,
		newTitle: newTitle,
	} as const
}
