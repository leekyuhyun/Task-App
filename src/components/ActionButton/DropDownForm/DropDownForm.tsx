import type { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useTypedDispatch } from '../../../hooks/redux';
import { v4 } from 'uuid';
import { addList, addTask } from '../../../store/slices/boardsSlice';
import { addLog } from '../../../store/slices/loggerSlice';
import {
  taskForm,
  listForm,
  input,
  button,
  buttons,
  close,
} from '../DropDownForm/DropDownForm.css';

type TDropDownFormProps = {
  listId: string;
  boardId: string;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  list?: boolean;
};

export const DropDownForm: FC<TDropDownFormProps> = ({ listId, boardId, setIsFormOpen, list }) => {
  const dispatch = useTypedDispatch();
  const [text, setText] = useState('');
  const formPlaceholder = list ? '리스트의 제목을 입력하세요.' : '할 일을 입력하세요.';

  const buttonTitle = list ? '리스트 추가하기' : '할 일 추가하기';

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleButtonClick = () => {
    if (text) {
      if (list) {
        dispatch(
          addList({
            boardId,
            list: { listId: v4(), listName: text, tasks: [] },
          }),
        );

        dispatch(
          addLog({
            logId: v4(),
            logMessage: `리스트 생성하기: ${text}`,
            logAuthor: 'User',
            logTimestamp: String(Date.now()),
          }),
        );
      } else {
        dispatch(
          addTask({
            boardId,
            listId,
            task: {
              taskId: v4(),
              taskName: text,
              taskDescription: '',
              taskOwner: 'User',
            },
          }),
        );

        dispatch(
          addLog({
            logId: v4(),
            logMessage: `일 생성하기 ${text}`,
            logAuthor: 'User',
            logTimestamp: String(Date.now()),
          }),
        );
      }
    }
  };

  return (
    <div className={list ? listForm : taskForm}>
      <textarea
        className={input}
        value={text}
        onChange={handleTextChange}
        autoFocus
        placeholder={formPlaceholder}
        onBlur={() => setIsFormOpen(false)}
      />

      <div className={buttons}>
        <button onMouseDown={handleButtonClick} className={button}>
          {buttonTitle}
        </button>
      </div>
      <FiX className={close} />
    </div>
  );
};
