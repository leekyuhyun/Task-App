import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IBoard, IList, ITask } from '../../types';

type TBoardsState = {
  modalActive: boolean;
  boardArray: IBoard[];
};

type TAddBoardAction = {
  board: IBoard;
};

type TDeleteBoardAction = {
  boardId: string;
};

type TAddListAction = {
  boardId: string;
  list: IList;
};

type TAddTaskAction = {
  boardId: string;
  listId: string;
  task: ITask;
};

type TDeleteListAction = {
  boardId: string;
  listId: string;
};

type TDeleteTaskAction = {
  boardId: string;
  listId: string;
  taskId: string;
};

type TSortAction = {
  boardIndex: number;
  droppableIdStart: string;
  droppableIdEnd: string;
  droppableIndexStart: number;
  droppableIndexEnd: number;
  draggableId: string;
};

const initialState: TBoardsState = {
  modalActive: false,
  boardArray: [
    {
      boardId: 'board-0',
      boardName: '첫 번째 게시물',
      lists: [
        {
          listId: 'list-0',
          listName: '첫 번째 리스트',
          tasks: [
            {
              taskId: 'task-0',
              taskName: '첫번째 태스크',
              taskDescription: 'description 1',
              taskOwner: 'Kyulee',
            },
          ],
        },
      ],
    },
  ],
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
      state.boardArray.push(payload.board);
    },

    deleteBoard: (state, { payload }: PayloadAction<TDeleteBoardAction>) => {
      state.boardArray = state.boardArray.filter((board) => board.boardId !== payload.boardId);
    },

    addList: (state, { payload }: PayloadAction<TAddListAction>) => {
      const board = state.boardArray.find((b) => b.boardId === payload.boardId);
      if (board) board.lists.push(payload.list);
    },

    addTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      const board = state.boardArray.find((b) => b.boardId === payload.boardId);
      const list = board?.lists.find((l) => l.listId === payload.listId);
      if (list) list.tasks.push(payload.task);
    },

    updateTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      const board = state.boardArray.find((b) => b.boardId === payload.boardId);
      const list = board?.lists.find((l) => l.listId === payload.listId);
      if (list) {
        const taskIndex = list.tasks.findIndex((t) => t.taskId === payload.task.taskId);
        if (taskIndex !== -1) list.tasks[taskIndex] = payload.task;
      }
    },

    deleteTask: (state, { payload }: PayloadAction<TDeleteTaskAction>) => {
      const board = state.boardArray.find((b) => b.boardId === payload.boardId);
      const list = board?.lists.find((l) => l.listId === payload.listId);
      if (list) {
        list.tasks = list.tasks.filter((t) => t.taskId !== payload.taskId);
      }
    },

    deleteList: (state, { payload }: PayloadAction<TDeleteListAction>) => {
      const board = state.boardArray.find((b) => b.boardId === payload.boardId);
      if (board) {
        board.lists = board.lists.filter((l) => l.listId !== payload.listId);
      }
    },

    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload;
    },

    sort: (state, { payload }: PayloadAction<TSortAction>) => {
      if (payload.droppableIdStart === payload.droppableIdEnd) {
        const list = state.boardArray[payload.boardIndex].lists.find(
          (list) => list.listId === payload.droppableIdStart,
        );
        const card = list?.tasks.splice(payload.droppableIndexStart, 1);
        list?.tasks.splice(payload.droppableIndexEnd, 0, ...card!);
      } else {
        if (payload.droppableIdStart && payload.droppableIdEnd) {
          const listStart = state.boardArray[payload.boardIndex].lists.find(
            (list) => list.listId === payload.droppableIdStart,
          );
          const card = listStart?.tasks.splice(payload.droppableIndexStart, 1);
          const listEnd = state.boardArray[payload.boardIndex].lists.find(
            (list) => list.listId === payload.droppableIdEnd,
          );
          listEnd?.tasks.splice(payload.droppableIndexEnd, 0, ...card!);
        }
      }
    },
  },
});

export const boardsReducer = boardsSlice.reducer;
export const {
  addBoard,
  deleteBoard,
  addList,
  addTask,
  updateTask,
  deleteTask,
  deleteList,
  setModalActive,
  sort,
} = boardsSlice.actions;
