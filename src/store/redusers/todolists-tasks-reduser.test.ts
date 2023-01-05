import { AllTasksType, TodoListType } from '../../App'
import { tasksReduser } from './tasks-reduser'
import { addTodolistAC, todolistReduser } from './todolist-reduser'

test("id's should be equals", () => {
	const startTasksState: AllTasksType = {}
	const startTodolistsState: Array<TodoListType> = []

	const action = addTodolistAC('new todolist')

	const endTasksState: AllTasksType = tasksReduser(startTasksState, action)
	const endTodolistsState: Array<TodoListType> = todolistReduser(startTodolistsState, action)

	const keys = Object.keys(endTasksState)
	const idFromTask = keys[0]
	const idFromTodolist = endTodolistsState[0].id

	expect(idFromTask).toBe(action.newTodolistId)
	expect(idFromTodolist).toBe(action.newTodolistId)
})
