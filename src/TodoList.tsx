import React from 'react';

export type TasksType = {
	id: number;
	name: string;
	isDone: boolean;
};

type PropsType = {
	titleValue: string;
	tasks: Array<TasksType>;
};

export function TodoList(props: PropsType) {
	return (
		<div>
			<TodoListTitle title={props.titleValue} />
			<div>
				<input />
				<button>+</button>
			</div>
			<ul>
				{props.tasks.map((task) => {
					return (
						<li>
							<input type='checkbox' checked={task.isDone} />{' '}
							<span>{task.name}</span>
						</li>
					);
				})}
			</ul>
			<div>
				<button>All</button>
				<button>Active</button>
				<button>Completed</button>
			</div>
		</div>
	);
}

type TitlePropsType = {
	title: string;
};

function TodoListTitle(props: TitlePropsType) {
	return <h3>{props.title}</h3>;
}
