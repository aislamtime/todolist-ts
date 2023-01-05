import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { tasksReduser } from './redusers/tasks-reduser'
import { todolistReduser } from './redusers/todolist-reduser'

const rootReducer = combineReducers({
	todolists: todolistReduser,
	tasks: tasksReduser,
})

export type RootStateType = ReturnType<typeof rootReducer>

export const store = configureStore({
	reducer: rootReducer,
})

// @ts-ignore
window.store = store
