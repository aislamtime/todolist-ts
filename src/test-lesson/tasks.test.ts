import { ActionType, div, mult, salaryReduser, StateType, sub, sum } from './tasks'

test('function sum should worked correct', () => {
	const salary: number = 800
	const bonus: number = 200

	const result = sum(salary, bonus)

	expect(result).toBe(1000)
})

test('function sub should worked correct', () => {
	expect(sub(1200, 200)).toBe(1000)
})

test('function div should worked correct', () => {
	expect(div(1200, 200)).toBe(6)
	expect(div(1200, 6)).toBe(200)
})

test('function mult should worked correct', () => {
	expect(mult(1200, 60)).toBe(72000)
	expect(mult(1200, 70)).toBe(84000)
})

test('Testing salaryReduser', () => {
	const salary: StateType = 800
	const actionSum: ActionType = {
		type: 'SUM',
		n: 200,
	}
	const actionSub: ActionType = {
		type: 'SUB',
		n: 100,
	}
	const actionDiv: ActionType = {
		type: 'DIV',
		n: 2,
	}
	const actionMult: ActionType = {
		type: 'MULT',
		n: 1.5,
	}
	const resultSum = salaryReduser(salary, actionSum)
	const resultSub = salaryReduser(salary, actionSub)
	const resultDiv = salaryReduser(salary, actionDiv)
	const resultMult = salaryReduser(salary, actionMult)

	expect(resultSum).toBe(1000)
	expect(resultSub).toBe(700)
	expect(resultDiv).toBe(400)
	expect(resultMult).toBe(1200)
})
