import type { FC } from 'react';
import { container, title, description } from './Task.css';
import { Draggable } from '@hello-pangea/dnd';

type TTaskProps = {
  index: number;
  id: string;
  taskName: string;
  taskDescription: string;
};

export const Task: FC<TTaskProps> = ({ index, id, taskName, taskDescription }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={container}
        >
          <div className={title}>{taskName}</div>
          <div className={description}>{taskDescription}</div>
        </div>
      )}
    </Draggable>
  );
};
