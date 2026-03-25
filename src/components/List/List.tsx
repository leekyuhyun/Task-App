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
        logTimestamp: String(Date.now()),
      }),
    );
  };
  const handleTaskChange = (boardId: string, listId: string, task: ITask) => {
    dispatch(setModalData({ boardId, listId, task }));
    dispatch(setModalActive(true));
  };

  return (
    <div className={listWrapper}>
      <div className={header}>
        <div className={name}>{list.listName}</div>
        <GrSubtract onClick={() => handleListDelete(list.listId)} className={deleteButton} />
      </div>

      <div>
        {list.tasks.map((task, index) => (
          <div onClick={() => handleTaskChange(boardId, list.listId, task)} key={task.taskId}>
            <Task
              taskName={task.taskName}
              taskDescription={task.taskDescription}
              boardId={boardId}
              id={task.taskId}
              index={index}
            />
          </div>
        ))}
      </div>
      <ActionButton boardId={boardId} listId={list.listId} />
    </div>
  );
};
