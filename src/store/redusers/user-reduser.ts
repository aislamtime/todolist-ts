type UserType = {
	age: number
	childrenCount: number
	name: string
}
type UserActionType = {
	type: 'INCREMENT-AGE' | 'INCREMENT-CHILDREN-COUNT' | 'CHANGE-NAME'
	[key: string]: any
}

export const userReduser = (state: UserType, action: UserActionType): UserType => {
	switch (action.type) {
		case 'INCREMENT-AGE':
			return {
				...state,
				age: state.age + 1,
			}
		case 'INCREMENT-CHILDREN-COUNT':
			return {
				...state,
				childrenCount: state.childrenCount + 1,
			}
		case 'CHANGE-NAME':
			return {
				...state,
				name: action.name,
			}
		default:
			throw new Error('Bad action type')
	}
}
