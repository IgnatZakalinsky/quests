import React, {useEffect, useState} from 'react'
import {v1} from 'uuid'
import {RoomType} from '../../q1-main/m2-quest/RoomType'
import EditButton from './EditButton'

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

    // console.log(rooms)
    // @ts-ignore
    window.rooms = rooms

    useEffect(() => {
        if (!isEditMode) {
            if (isSave) {
                room.text = newText
                room.buttons = newButtons
                room.hiddenTitle = newTitle
                setSave()
            }

            if (newText !== text) setText(text)
            if (newTitle !== hiddenTitle) setTitle(hiddenTitle)
            if (newButtons !== buttons) setButtons(buttons)
        } else {
            if (newButtons === buttons) setButtons(buttons.map(b => ({...b})))
        }
    }, [
        isEditMode, text, newText, setText, setButtons, newButtons, buttons, newTitle, hiddenTitle, setTitle, room,
        setSave, isSave
    ])

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
                        : <EditButton rooms={rooms} newButtons={newButtons} setButtons={setButtons} b={b}/>
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
