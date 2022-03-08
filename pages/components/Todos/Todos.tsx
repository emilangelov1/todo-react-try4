import { Button, Card, Col, Input, Row } from "antd";
import Text from "antd/lib/typography/Text";
import Link from "next/link";
import { FormEventHandler, useState } from "react";
import { TodoType, useStore } from "../Store/StoreTodos";
import { useSpring, animated, useTransition } from "react-spring";
import styles from "./Todos.module.css";

export const Todos = () => {
  const { todos, addTodo } = useStore();
  const removeAllTodos = useStore((state) => state.removeAllTodos);

  const transition = useTransition(todos, {
    keys: ({ id }) => id,
    from: { transform: "translate(-1000px, 0px)" },
    enter: { transform: "translate( 0%, 0%)" },
    leave: { transform: "translate(-1000px, 0px)" },
  });

  // const cardStyle = useSpring({
  //   from: { opacity: 0, marginLeft: -10000 },
  //   to: { opacity: 1, marginLeft: 0 },
  //   config: { duration: 1500 },
  // });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    var object: any = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    console.log(object.todo);
    addTodo({
      id: "",
      title: object.todo,
    });
  };

  const handleClearTodos = (id?: TodoType) => {
    if (id) {
      return removeAllTodos(id);
    }
    return removeAllTodos();
  };

  // const handleDeleteSingleTodo = () => {};

  return (
    <div className={styles.todoContainer}>
      <Text className={styles.todoText}>Todo App</Text>
      <form onSubmit={handleSubmit}>
        <Input
          maxLength={100}
          allowClear
          type="text"
          name="todo"
          placeholder="Please enter your Todo"
        />
      </form>
      <ul>
        {transition((style, todo) => {
          return (
            <animated.div style={style} key={todo.id}>
              <Row gutter={[16][2]}>
                <Col span={20}>
                  <Card hoverable className={styles.todoCard}>
                    <Text>{todo.title}</Text>
                  </Card>
                  <div className={styles.flexColumnButton}>
                    <Link href={"/[id]"} as={`/${todo.id}`}>
                      <Button className={styles.editButton}>
                        <Text className={styles.edit}>Edit</Text>
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleClearTodos(todo)}
                      className={styles.editButton}
                    >
                      Remove
                    </Button>
                  </div>
                </Col>
              </Row>
            </animated.div>
          );
        })}
      </ul>
      <Button onClick={() => handleClearTodos()} className={styles.editButton}>
        Delete All Todos
      </Button>
    </div>
  );
};
