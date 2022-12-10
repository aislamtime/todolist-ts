import React, { useState } from 'react';
import ts from 'typescript';
import { v1 } from 'uuid';
import './App.css';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import { TodoList } from './components/TodoList/TodoList';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TaskType = {
    id: string;
    name: string;
    isDone: boolean;
};

type TodoListType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

type AllTasksType = {
    [key: string]: Array<TaskType>;
};

function App() {

    const removeTask = (taskId: string, todoListId: string) => {
        let tasks = allTasks[todoListId].filter((task) => task.id !== taskId);
        allTasks[todoListId] = tasks;
        setAllTasks({ ...allTasks });
    };

    const addTask = (title: string, todoListId: string) => {
        let newTask = { id: v1(), name: title, isDone: false };
        let tasks = allTasks[todoListId];
        let newTasks = [newTask, ...tasks];
        allTasks[todoListId] = newTasks;
        setAllTasks({ ...allTasks });
    };

    const changeStatus = (id: string, isDone: boolean, todoListId: string) => {
        let tasks = allTasks[todoListId];
        let task = tasks.find((t) => t.id === id);
        if (task) {
            task.isDone = isDone;
            setAllTasks({ ...allTasks });
        }
    };
    const changeTitle = (id: string, title: string, todoListId: string) => {
        let tasks = allTasks[todoListId];
        let task = tasks.find((t) => t.id === id);
        if (task) {
            task.name = title;
            setAllTasks({ ...allTasks });
        }
    };

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        let todoList = todoLists.find((tl) => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    };

    const changeTodoListTitle = (title: string, id: string) => {
        todoLists.map((tl) => {
            if (tl.id === id) {
                tl.title = title
            }
        })
        setTodoLists([...todoLists])
    }

    const todoListId1 = v1();
    const todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        { id: todoListId1, title: 'What to learn', filter: 'all' },
        { id: todoListId2, title: 'What to buy', filter: 'all' },
    ]);

    let [allTasks, setAllTasks] = useState<AllTasksType>({
        [todoListId1]: [
            { id: v1(), name: 'CSS', isDone: true },
            { id: v1(), name: 'JS', isDone: true },
            { id: v1(), name: 'React', isDone: false },
            { id: v1(), name: 'Redux', isDone: false },
            { id: v1(), name: 'Node', isDone: false },
        ],
        [todoListId2]: [
            { id: v1(), name: 'Book', isDone: false },
            { id: v1(), name: 'Milk', isDone: true },
        ],
    });

    const addTodoList = (title: string) => {
        const todoList: TodoListType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setAllTasks({
            ...allTasks,
            [todoList.id]: []
        })
        setTodoLists([todoList, ...todoLists])
    }
    const removeTodoList = (id: string) => {
        const allTodoLists = todoLists.filter(tl => tl.id !== id)
        delete allTasks[id]

        setAllTasks({ ...allTasks })
        setTodoLists([...allTodoLists])
    }

    return (
        <div className='App'>
            <div>
                <h3>Add new TodoList</h3>
                <AddItemForm addItem={addTodoList} />
            </div>

            {todoLists.map((tl) => {
                let filteredTasks: Array<TaskType> = [...allTasks[tl.id]];

                if (tl.filter === 'completed') {
                    filteredTasks = allTasks[tl.id].filter(
                        (task) => task.isDone === true
                    );
                    //tasks = tasks.filter((task) => task.isDone === true);
                }
                if (tl.filter === 'active') {
                    filteredTasks = allTasks[tl.id].filter(
                        (task) => task.isDone === false
                    );
                }

                return (
                    <TodoList
                        key={tl.id}
                        todoListId={tl.id}
                        title={tl.title}
                        tasks={filteredTasks}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeStatus}
                        changeTaskTitle={changeTitle}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                );
            })}
        </div>
    );
}

export default App;
