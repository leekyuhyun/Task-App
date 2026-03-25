import { useTypedSelector } from '../../hooks/redux';
import type { FC } from 'react';
import { FiX } from 'react-icons/fi';
import { LogItem } from './LogItem/LogItem';
import { wrapper, modalWindow, header, title, body } from './LoggerModal.css';

type TLoggerModalProps = {
  setIsLoggerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoggerModal: FC<TLoggerModalProps> = ({ setIsLoggerOpen }) => {
  const logs = useTypedSelector((state) => state.logger.logArray);

  return (
    <div className={wrapper}>
      <div className={modalWindow}>
        <div className={header}>
          <div className={title}>활동 기록</div>
          <FiX onClick={() => setIsLoggerOpen(false)} />
        </div>
        <div className={body}>
          {logs.map((log) => (
            <LogItem key={log.logId} logItem={log} />
          ))}
        </div>
      </div>
    </div>
  );
};
