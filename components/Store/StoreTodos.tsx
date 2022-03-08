import create from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";

export type TodoType = {
  id: string;
  title: string;
};

interface Store {
  todos: TodoType[];
  addTodo: (todo: TodoType) => void;
  removeAllTodos: (todo?: TodoType) => void;
  updateTodo: (todo: TodoType) => void;
}

const InitialState: Store = {
  todos: [],
  addTodo: () => {},
  removeAllTodos: () => {},
  updateTodo: () => {},
};

export const useStore = create<Store>(
  persist(
    (set) => ({
      ...InitialState,
      addTodo: (todo: TodoType) => {
        set((state) => ({
          todos: [
            ...state.todos,
            {
              ...todo,
              id: uuid(),
            },
          ],
        }));
      },
      removeAllTodos: (todo) => {
        if (todo) {
          return set((state) => ({
            todos: state.todos.filter((todo2) => todo2.id !== todo.id),
          }));
        }
        set((state) => ({
          todos: [],
        }));
      },
      updateTodo: (todo) => {
        set((state) => ({
          todos: state.todos.map((element) => {
            if (todo.id === element.id) {
              return {
                ...element,
                title: todo.title,
              };
            }
            return element;
          }),
        }));
      },
    }),
    { name: "todos" }
  )
);
