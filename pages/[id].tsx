import { Button, Input } from "antd";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { FormEventHandler, useEffect, useState } from "react";
import { TodoType, useStore } from "../components/Store/StoreTodos";
import { motion } from "framer-motion";

function EditTodo({}) {
  // const singleTodo = useStore((state) => state.getSingleTodo);
  const todos = useStore((state) => state.todos);
  const updateTodo = useStore((state) => state.updateTodo);
  const { query, push } = useRouter();
  const id = query.id;
  const singleTodo = todos.find((todo) => todo.id === query.id);
  const [useEditTodo, setUseEditTodo] = useState("");

  return (
    <div>
      {singleTodo && (
        <form
          onSubmit={(e) => {
            let praznoTodo: TodoType = {
              ...singleTodo,
              title: useEditTodo,
            };

            updateTodo(praznoTodo);
            push("/");
          }}
        >
          <Input
            defaultValue={singleTodo.title}
            onChange={(e) => setUseEditTodo(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
}

export default EditTodo;
