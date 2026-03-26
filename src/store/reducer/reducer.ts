import { loggerReducer } from '../slices/loggerSlice';
import { modalReducer } from '../slices/modalSlice';
import { boardsReducer } from '../slices/boardsSlice';
import { userReducer } from '../slices/userSlice.ts';

const reducer = {
  logger: loggerReducer,
  boards: boardsReducer,
  modal: modalReducer,
  user: userReducer,
};

export default reducer;
