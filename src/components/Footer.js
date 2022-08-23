import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { statusChanged, colorChanged } from '../redux/filter/actions'

const numberOfTodos = (number_of_todos) => {
    switch (number_of_todos) {
        case 0:
            return "no task"
        case 1:
            return "1 task"
        default:
            return `${number_of_todos} tasks`

    }
}
const Footer = () => {
    const todos = useSelector((state) => state.todos)
    const filters = useSelector(state => state.filter)

    const dispatch = useDispatch()
    const todosRemaining = todos.filter((todo) => !todo.completed).length
    const { status, colors } = filters

    const handleStatusChange = (status) => {
        dispatch(statusChanged(status))
    }
    const handleColorChange = (color) => {
        if (colors.includes(color)) {
            dispatch(colorChanged(color, "removed"))
        } else {
            dispatch(colorChanged(color, "added"))
        }
    }



    return (
        <div class="mt-4 flex justify-between text-xs text-gray-500">
            <p>{numberOfTodos(todosRemaining)} tasks left</p>
            <ul class="flex space-x-1 items-center text-xs">
                <li class={`cursor-pointer ${status === "All" && "font-bold"} `} onClick={() => handleStatusChange('All')}>All</li>
                <li>|</li>
                <li class={`cursor-pointer ${status === "Incomplete" && "font-bold"} `} onClick={() => handleStatusChange('Incomplete')}>Incomplete</li>
                <li>|</li>
                <li class={`cursor-pointer ${status === "Complete" && "font-bold"} `} onClick={() => handleStatusChange('Complete')}>Complete</li>
                <li> </li>
                <li></li>
                <li
                    className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${colors.includes("green") && "bg-green-500"
                        }`}
                    onClick={() => handleColorChange("green")}
                ></li>
                <li
                    className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${colors.includes("red") && "bg-red-500"
                        }`}
                    onClick={() => handleColorChange("red")}
                ></li>
                <li
                    className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${colors.includes("yellow") && "bg-yellow-500"
                        }`}
                    onClick={() => handleColorChange("yellow")}
                ></li>
            </ul>
        </div>
    )
}

export default Footer