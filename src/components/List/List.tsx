import { GrSubtract } from 'react-icons/gr';
import { Task } from '../Task/Task';
import { ActionButton } from '../ActionButton/ActionButton';
import { v4 } from 'uuid';
import type { FC } from 'react';
import type { IList, ITask } from '../../types';
import { useTypedDispatch } from '../../hooks/redux';
import { deleteList, setModalActive } from '../../store/slices/boardsSlice';
import { addLog } from '../../store/slices/loggerSlice';
import { setModalData } from '../../store/slices/modalSlice';
import { listWrapper, header, name, deleteButton } from './List.css';
import { Droppable } from '@hello-pangea/dnd';

const getTimestamp = () => String(Date.now());

type TListProps = {
  boardId: string;
  list: IList;
};

export const List: FC<TListProps> = ({ list, boardId }) => {
  const dispatch = useTypedDispatch();

  const handleListDelete = (listId: string) => {
    dispatch(deleteList({ boardId, listId }));
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `List ${list.listName} deleted`,
        logAuthor: 'User',
        logTimestamp: getTimestamp(),
      }),
    );
  };

  const handleTaskChange = (boardId: string, listId: string, task: ITask) => {
    dispatch(setModalData({ boardId, listId, task }));
    dispatch(setModalActive(true));
  };

  return (
    <Droppable droppableId={list.listId}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className={listWrapper}>
          <div className={header}>
            <div className={name}>{list.listName}</div>
            <GrSubtract onClick={() => handleListDelete(list.listId)} className={deleteButton} />
          </div>

          <div>
            {list.tasks.map((task, taskIndex) => (
              <div onClick={() => handleTaskChange(boardId, list.listId, task)} key={task.taskId}>
                <Task
                  taskName={task.taskName}
                  taskDescription={task.taskDescription}
                  id={task.taskId}
                  index={taskIndex}
                />
              </div>
            ))}
            {provided.placeholder}
          </div>
          <ActionButton boardId={boardId} listId={list.listId} />
        </div>
      )}
    </Droppable>
  );
};
