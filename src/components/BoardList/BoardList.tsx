// src/components/BoardList/BoardList.tsx
import type { FC } from 'react';
import { useState, useRef } from 'react';
import { useTypedSelector } from '../../hooks/redux';
import { FiLogIn, FiPlusCircle } from 'react-icons/fi';
import { SideForm } from './SideForm/SideForm';
import {
  container,
  title,
  addSection,
  addButton,
  smallTitle,
  boardItemActive,
  boardItem,
  authSection, // 💡 새로 추가된 스타일
  greeting, // 💡 새로 추가된 스타일
  authButton, // 💡 새로 추가된 스타일
} from './BoardList.css';
import clsx from 'clsx';
import { GoSignOut } from 'react-icons/go';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../../firebase';
import { useTypedDispatch } from '../../hooks/redux';
import { setUser, removeUser } from '../../store/slices/userSlice.ts';
import { useAuth } from '../../store/reducer/useAuth';

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

export const BoardList: FC<TBoardListProps> = ({ activeBoardId, setActiveBoardId }) => {
  const dispatch = useTypedDispatch();
  const { boardArray } = useTypedSelector((state) => state.boards);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // 💡 email도 함께 가져옵니다.
  const { isAuth, email } = useAuth();

  // 💡 이메일에서 @ 앞부분만 추출하여 이름처럼 사용 (email이 없으면 '사용자')
  const userName = email ? email.split('@')[0] : '사용자';

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        dispatch(
          setUser({
            email: userCredential.user.email || '',
            id: userCredential.user.uid,
          }),
        );
      })
      .catch((error: unknown) => {
        console.error(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  };

  const handleClick = () => {
    setIsFormOpen(!isFormOpen);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <div className={container}>
      <div className={title}>게시판</div>
      {boardArray.map((board, index) => (
        <div
          key={board.boardId}
          onClick={() => setActiveBoardId(boardArray[index].boardId)}
          className={clsx(
            {
              [boardItemActive]: boardArray.findIndex((b) => b.boardId === activeBoardId) === index,
            },
            { [boardItem]: boardArray.findIndex((b) => b.boardId === activeBoardId) !== index },
          )}
        >
          <div className={smallTitle}>{board.boardName}</div>
        </div>
      ))}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm setIsFormOpen={setIsFormOpen} inputRef={inputRef} />
        ) : (
          <FiPlusCircle className={addButton} onClick={handleClick} />
        )}

        {/* 💡 로그인/로그아웃 버튼 및 환영 메시지 영역 */}
        <div className={authSection}>
          {isAuth ? (
            <>
              <span className={greeting}>{userName}님 환영합니다</span>
              <button className={authButton} onClick={handleSignOut}>
                <GoSignOut /> 로그아웃
              </button>
            </>
          ) : (
            <button className={authButton} onClick={handleLogin}>
              <FiLogIn /> 로그인
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
