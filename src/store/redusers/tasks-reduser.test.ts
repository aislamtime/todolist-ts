import { v1 } from 'uuid'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReduser } from './tasks-reduser'

test('task should be deleted', () => {
	const todolistId1 = v1()
	const todolistId2 = v1()

	const statrtState = {
		[todolistId1]: [
			{ id: '1', title: 'CSS', isDone: true },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
			{ id: '4', title: 'Redux', isDone: false },
			{ id: '5', title: 'Node', isDone: false },
		],
		[todolistId2]: [
			{ id: '1', title: 'Book', isDone: false },
			{ id: '2', title: 'Milk', isDone: true },
		],
	}

	const action = removeTaskAC(todolistId1, '3')

	const endState = tasksReduser(statrtState, action)

	expect(endState[todolistId1].length).toBe(4)
	expect(endState[todolistId2].length).toBe(2)
	expect(endState[todolistId1].every((t) => t.id !== '3')).toBeTruthy()
	expect(endState[todolistId1][2].id).toBe('4')
})

test('task should be added', () => {
	const todolistId1 = v1()
	const todolistId2 = v1()

	const newTaskTitle = 'I dont know'

	const statrtState = {
		[todolistId1]: [
			{ id: '1', title: 'CSS', isDone: true },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
			{ id: '4', title: 'Redux', isDone: false },
			{ id: '5', title: 'Node', isDone: false },
		],
		[todolistId2]: [
			{ id: '1', title: 'Book', isDone: false },
			{ id: '2', title: 'Milk', isDone: true },
		],
	}

	const action = addTaskAC(todolistId1, newTaskTitle)
	const endState = tasksReduser(statrtState, action)

	expect(endState[todolistId2].length).toBe(2)
	expect(endState[todolistId1].length).toBe(6)
	expect(endState[todolistId1][0].id).toBeDefined()
	expect(endState[todolistId1][0].title).toBe('I dont know')
	expect(endState[todolistId1][0].isDone).toBe(false)
})

test('status of task should be changed', () => {
	const todolistId1 = v1()
	const todolistId2 = v1()

	const statrtState = {
		[todolistId1]: [
			{ id: '1', title: 'CSS', isDone: true },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
			{ id: '4', title: 'Redux', isDone: false },
			{ id: '5', title: 'Node', isDone: false },
		],
		[todolistId2]: [
			{ id: '1', title: 'Book', isDone: false },
			{ id: '2', title: 'Milk', isDone: true },
		],
	}

	const action = changeTaskStatusAC(todolistId1, '1', true)

	const endState = tasksReduser(statrtState, action)

	expect(endState[todolistId1].length).toBe(5)
	expect(endState[todolistId1][0].isDone).toBeTruthy()
	expect(endState[todolistId2][0].isDone).toBeFalsy()
})

test('title of task should be changed', () => {
	const todolistId1 = v1()
	const todolistId2 = v1()

	const newTaskTitle = 'ahahahhahah'

	const statrtState = {
		[todolistId1]: [
			{ id: '1', title: 'CSS', isDone: true },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
			{ id: '4', title: 'Redux', isDone: false },
			{ id: '5', title: 'Node', isDone: false },
		],
		[todolistId2]: [
			{ id: '1', title: 'Book', isDone: false },
			{ id: '2', title: 'Milk', isDone: true },
		],
	}

	const action = changeTaskTitleAC(todolistId1, '1', newTaskTitle)

	const endState = tasksReduser(statrtState, action)

	expect(endState[todolistId1].length).toBe(5)
	expect(endState[todolistId1][0].title).toBe(newTaskTitle)
})
