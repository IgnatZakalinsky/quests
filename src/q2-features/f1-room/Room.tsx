import React, {useEffect, useState} from 'react'
import {RoomType} from '../../q1-main/m2-quest/Quest'
import {v1} from 'uuid'

type RoomPropsType = {
    room: RoomType
    isEditMode: boolean
    isSave: boolean
    setSave: () => void
    setRoom: (r: string) => void
    rooms: RoomType[]
}

const Room: React.FC<RoomPropsType> = (
    {room, setRoom, isEditMode, isSave, setSave, rooms}
) => {
    const {hiddenTitle, text, buttons} = room
    const [newTitle, setTitle] = useState(hiddenTitle)
    const [newText, setText] = useState(text)
    const [newButtons, setButtons] = useState(buttons)

    console.log(rooms)

    useEffect(() => {
        if (isSave) {
            room.text = newText
            room.buttons = newButtons
            room.hiddenTitle = newTitle
            setSave()
        }
    }, [room, setSave, isSave, newText, newButtons, newTitle])

    useEffect(() => {
        if (!isEditMode) {
            if (newText !== text) setText(text)
            if (newTitle !== hiddenTitle) setTitle(hiddenTitle)
            if (newButtons !== buttons) setButtons(buttons)
        } else {
            if (newButtons === buttons) setButtons(buttons.map(b => ({...b})))
        }
    }, [isEditMode, text, newText, setText, setButtons, newButtons, buttons, newTitle, hiddenTitle, setTitle])

    if (!rooms.find(x => x.hiddenTitle === 'new-room')) {
        rooms.push({_id: v1(), hiddenTitle: 'new-room', text: '', buttons: []})
    }

    return (
        <div>
            {isEditMode && <div><textarea value={newTitle} onChange={e => setTitle(e.currentTarget.value)}/></div>}

            text:
            <div>
                {!isEditMode
                    ? text
                    : <textarea value={newText} onChange={e => setText(e.currentTarget.value)}/>
                }
            </div>

            <hr/>
            buttons:
            <div>
                {newButtons.map(b => {
                    return !isEditMode
                        ? <button key={b._id} onClick={() => setRoom(b.next)}>{b.title}</button>
                        : (
                            <div key={b._id}>
                                <textarea
                                    value={b.title}
                                    onChange={e => {
                                        b.title = e.currentTarget.value
                                        setButtons([...newButtons])
                                    }}
                                />
                                <select
                                    value={b.next}
                                    onChange={e => {
                                        b.next = e.currentTarget.value
                                        setButtons([...newButtons])
                                    }}
                                >
                                    {rooms
                                        // .filter(r => r.hiddenTitle !== hiddenTitle)
                                        .map(r => (
                                                <option key={r._id} value={r._id}>{r.hiddenTitle}</option>
                                            )
                                        )}
                                </select>
                                <button
                                    onClick={
                                        () => setButtons(
                                            newButtons.filter(x => x._id !== b._id)
                                        )
                                    }
                                >del
                                </button>
                            </div>
                        )
                })}

                {isEditMode && (
                    <div>
                        <button
                            onClick={() => setButtons([...newButtons, {_id: v1(), next: room._id, title: ''}])}
                        >
                            add
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Room
