import { userReduser } from './user-reduser'

test('user reduser should increment only age', () => {
	const initialState = {
		name: 'Tim',
		age: 33,
		childrenCount: 0,
	}

	const resultState = userReduser(initialState, { type: 'INCREMENT-AGE' })

	expect(resultState.age).toBe(34)
	expect(resultState.childrenCount).toBe(0)
})

test('user reduser should increment only childrenCount', () => {
	const startState = {
		name: 'Tim',
		age: 33,
		childrenCount: 0,
	}

	const endState = userReduser(startState, { type: 'INCREMENT-CHILDREN-COUNT' })

	expect(endState.childrenCount).toBe(1)
	expect(endState.age).toBe(33)
})

test('user reduser should change name of user', () => {
	const startState = {
		name: 'Tim',
		age: 33,
		childrenCount: 0,
	}

	const endState = userReduser(startState, { type: 'CHANGE-NAME', name: 'Alex' })

	expect(endState.name).toBe('Alex')
	expect(endState.age).toBe(33)
	expect(endState.childrenCount).toBe(0)
})
