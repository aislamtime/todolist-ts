import React from 'react'
import { v1 } from 'uuid'
import { FilterValuesType, TodoListType } from '../../App'

type TodoListActionsType =
	| ReturnType<typeof removeTodolistAC>
	| ReturnType<typeof addTodolistAC>
	| ReturnType<typeof changeTodolistTitleAC>
	| ReturnType<typeof changeTodolistFilterAC>

export const todolistReduser = (state: Array<TodoListType>, action: TodoListActionsType): Array<TodoListType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return [...state.filter((tl) => tl.id !== action.id)]
		}
		case 'ADD-TODOLIST': {
			return [
				{
					id: action.newTodolistId,
					title: action.title,
					filter: 'all',
				},
				...state,
			]
		}
		case 'CHANGE-TODOLIST-TITLE': {
			const todolist = state.find((tl) => tl.id === action.id)
			if (todolist) todolist.title = action.title
			return [...state]
		}
		case 'CHANGE-TODOLIST-FILTER': {
			const todolist = state.find((tl) => tl.id === action.id)
			if (todolist) todolist.filter = action.filter
			return [...state]
		}
		default:
			throw new Error('BAD ACTION TYPE')
	}
}

export const removeTodolistAC = (id: string) => {
	return { type: 'REMOVE-TODOLIST', id: id } as const
}
export const addTodolistAC = (title: string) => {
	return { type: 'ADD-TODOLIST', title, newTodolistId: v1() } as const
}
export const changeTodolistTitleAC = (id: string, newTitle: string) => {
	return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: newTitle } as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
	return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter } as const
}
