import React, { useState } from 'react'
import styles from './TodoList.module.css'
import TodoItem from './TodoItem/TodoItem'
import { useDispatch } from 'react-redux'
import PropTypes from "prop-types";
import { todosChangeOrderAction } from '../../store/todos/actions';

const TodoList = ({todos}) => {

    const [currentTodo, setCurrentTodo] = useState(null)
    const dispatch = useDispatch()

    const dragStartHandler = (e, todo) => {
        setCurrentTodo(todo)
    }
    const dragEndHandler = (e) => {
        e.target.style.background = 'white'
    }
    const dragOverHandler = (e) => {
        e.preventDefault()
        e.target.style.background = 'grey'
    }
    const dropHandler = (e, todo) => {
        e.preventDefault()
        dispatch(todosChangeOrderAction(todo, currentTodo))
        e.target.style.background = 'white'
    }
    const sortTodos = (a, b) => {
        if (a.order > b.order) {
          return 1
        }
        return -1
    }
   
    return (
        <div className={styles.TodoList}>
            <p className={styles.TodoListTitle}>
                <span className={styles.TodoListText}>drag-and-drop*</span>
                <span>
                    {todos.length}
                    &nbsp;
                     todo in list
                </span>
            </p>
            <ul className={styles.TodoListItems}>
                {todos.sort(sortTodos).map((todo, index) => {
                    return (
                        <TodoItem
                            dragStart={dragStartHandler}
                            dragEnd={dragEndHandler}
                            dragOver={dragOverHandler}
                            drop={dropHandler}
                            index={index}
                            key={todo.id}
                            todo={todo}
                        />
                    )
                })}
            </ul>
        </div>
    )
}

TodoList.propTypes = {
    todos: PropTypes.array
}

export default TodoList