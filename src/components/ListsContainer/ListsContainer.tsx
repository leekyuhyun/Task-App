import type { IList } from '../../types';
import type { FC } from 'react';
import { List } from '../List/List';
import { ActionButton } from '../ActionButton/ActionButton';
import { listContainerStyles } from './ListsContainer.css';

type TListContainerProps = {
  boardId: string;
  lists: IList[];
};

export const ListsContainer: FC<TListContainerProps> = ({ boardId, lists }) => {
  return (
    <div className={listContainerStyles}>
      {lists.map((list) => (
        <List key={list.listId} list={list} boardId={boardId} />
      ))}
      <ActionButton boardId={boardId} listId={''} list />
    </div>
  );
};
