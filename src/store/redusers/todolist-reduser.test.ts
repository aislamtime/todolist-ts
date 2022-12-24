import { v1 } from 'uuid'
import { FilterValuesType, TodoListType } from '../../App'
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	todolistReduser,
} from './todolist-reduser'

test('correct todolist should be remove', () => {
	const todolistId1 = v1()
	const todolistId2 = v1()

	const startState: Array<TodoListType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	const endState = todolistReduser(startState, removeTodolistAC(todolistId1))

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
	const todolistId1 = v1()
	const todolistId2 = v1()

	const newTodolistTitle = 'New Todolist'

	const startState: Array<TodoListType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	const endState = todolistReduser(startState, addTodolistAC(newTodolistTitle))

	expect(endState.length).toBe(3)
	expect(endState[2].title).toBe(newTodolistTitle)
	expect(endState[2].filter).toBe('all')
})

test('correct todolist should change its title', () => {
	const todolistId1 = v1()
	const todolistId2 = v1()

	const newTodolistTitle = 'New Todolist title'

	const startState: Array<TodoListType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	const endState = todolistReduser(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))

	expect(endState.length).toBe(2)
	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist  should changed', () => {
	const todolistId1 = v1()
	const todolistId2 = v1()

	const newTodolistFilter: FilterValuesType = 'completed'

	const startState: Array<TodoListType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	const endState = todolistReduser(startState, changeTodolistFilterAC(todolistId2, 'completed'))

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe(newTodolistFilter)
})
