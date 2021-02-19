import { useState } from 'react'

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [date, setDate] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!text) {
            alert('Please add task')
            return
        }
        onAdd({ text, date, reminder })

        setText('')
        setDate('')
        setReminder(false)

    }

    return (
        <form
            className='add-form'
            onSubmit={onSubmit}
        >
            {/* Name */}
            <div className='form-control'>
                <label> Task </label>
                <input
                    type='text'
                    placeholder='Add Task'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            {/* Date */}
            <div className='form-control'>
                <label> Day & Time </label>
                <input
                    type='text'
                    placeholder='Add Day & Time'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            {/* Set Reminder */}
            <div
                className='form-control form-control-check'
            >
                <label> Set Reminder </label>
                <input
                    type='checkbox'
                    checked={reminder}
                    value={reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)}
                />
            </div>
            {/* Save Task */}
            <input
                className='btn btn-block'
                type='submit'
                value='Save Task' />

        </form>
    )
}

export default AddTask
