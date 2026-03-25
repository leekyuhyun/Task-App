import { useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import { FiCheck } from 'react-icons/fi';
import { sideForm, input, icon } from './SideForm.css';
import { useTypedDispatch } from '../../../hooks/redux';
import { addBoard } from '../../../store/slices/boardsSlice';
import { addLog } from '../../../store/slices/loggerSlice';
import { v4 } from 'uuid';

type TSideFormProps = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export const SideForm: FC<TSideFormProps> = ({ setIsFormOpen, inputRef }) => {
  const [inputText, setInputText] = useState('');
  const dispatch = useTypedDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const handleOnBlur = () => {
    setIsFormOpen(false);
  };
  const handleClick = () => {
    if (inputText) {
      dispatch(addBoard({ board: { boardId: v4(), boardName: inputText, lists: [] } }));
      dispatch(
        addLog({
          logId: v4(),
          logMessage: `게시판 "${inputText}"이(가) 생성되었습니다.`,
          logAuthor: '시스템',
          logTimestamp: String(Date.now()),
        }),
      );
    }
  };

  return (
    <div className={sideForm}>
      {/* inputRef는 autoFocus 옵션으로 대체 가능 */}
      <input
        className={input}
        type="text"
        placeholder="새로운 게시판 등록하기"
        value={inputText}
        onChange={handleChange}
        onBlur={handleOnBlur}
        ref={inputRef}
      />
      <FiCheck className={icon} onMouseDown={handleClick} />
    </div>
  );
};
