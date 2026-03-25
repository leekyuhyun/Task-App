import type { ILogItem } from '../../../types';
import type { FC } from 'react';
import { useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { item, author, date, message } from './LogItem.css';

type TLogItemProps = {
  logItem: ILogItem;
};

export const LogItem: FC<TLogItemProps> = ({ logItem }) => {
  const [timeOffSet] = useState(() => new Date(Date.now() - Number(logItem.logTimestamp)));

  const showOffsetTime = `
    ${timeOffSet.getMinutes() > 0 ? `${timeOffSet.getMinutes()}m` : ''}
    ${timeOffSet.getSeconds() > 0 ? `${timeOffSet.getSeconds()}s ago` : ''}
    ${timeOffSet.getSeconds() === 0 ? `just now` : ''}
  `;

  return (
    <div className={item}>
      <div className={author}>
        <BsFillPersonFill />
        {logItem.logAuthor}
      </div>
      <div className={message}>{logItem.logMessage}</div>
      <div className={date}>{showOffsetTime}</div>
    </div>
  );
};
