import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateTask } from "../store/actions/board.action"
import { TaskEditPreviewNav } from "./task-preview-edit-nav"

export const TaskEdit = ({ task, board, group, setTaskEditExpand, style }) => {

    // let elemRect = ev.target.parentNode.getBoundingClientRect()
    // let top = elemRect.top - window.pageYOffset
    // let left = elemRect.left - window.pageXOffset

    const [title, setTitle] = useState(task.title)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onHandleChange = (ev) => {
        setTitle(ev.target.value)
    }

    const onHandleSubmit = (ev) => {
        ev.stopPropagation()
        ev.preventDefault()
        onUpdateTitle()
    }

    const onEnterPress = (ev) => {
        if (ev.keyCode === 13 && ev.shiftKey === false) {
            ev.preventDefault();
            onUpdateTitle()
        }
    }

    const onUpdateTitle = () => {
        task = { ...task, title: title }
        dispatch(updateTask(task, board._id, group.id))
        setTaskEditExpand(null)
    }

    const goToTaskDetails = () => {
        navigate(`/board/${board._id}/task/${task.id}`)
        setTaskEditExpand(null)
    }

    if (!task) return

    return (
        <section className="task-edit" style={style}>
            <div className="task-title-edit">
                <form onSubmit={onHandleSubmit} >
                    <textarea
                        style={{ width: style.width }}
                        dir="auto"
                        onKeyDown={onEnterPress}
                        onChange={onHandleChange}
                        onFocus={(ev) => ev.target.select()}
                        value={title}
                        spellCheck="false"
                        autoFocus
                    />
                    <button className="btn">Save</button>
                </form>
            </div>
            <TaskEditPreviewNav
                goToTaskDetails={goToTaskDetails}
                task={task}
                board={board}
                group={group}
                style={style}
            />
        </section>
    )
}