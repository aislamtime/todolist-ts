export const sum = (salary: number, bonus: number) => salary + bonus
export const sub = (salary: number, minus: number) => salary - minus
export const div = (salary: number, div: number) => salary / div
export const mult = (salary: number, mult: number) => salary * mult

export type StateType = number
export type ActionType = {
	type: 'SUM' | 'SUB' | 'DIV' | 'MULT'
	n: number
}

export const salaryReduser = (state: StateType, action: ActionType): StateType => {
	switch (action.type) {
		case 'SUM':
			return state + action.n
		case 'SUB':
			return state - action.n
		case 'DIV':
			return state / action.n
		case 'MULT':
			return state * action.n
		default:
			throw new Error('Bad action.type')
	}
}
