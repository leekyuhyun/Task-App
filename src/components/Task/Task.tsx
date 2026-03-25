import type { FC } from 'react';
import { container, title, description } from './Task.css';

type TTaskProps = {
  index: number;
  id: string;
  boardId: string;
  taskName: string;
  taskDescription: string;
};

export const Task: FC<TTaskProps> = ({ taskName, taskDescription }) => {
  return (
    <div className={container}>
      <div className={title}>{taskName}</div>
      <div className={description}>{taskDescription}</div>
    </div>
  );
};
