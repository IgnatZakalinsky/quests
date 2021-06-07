import React, {useEffect, useState} from 'react'

type RoomPropsType = {
    room: {
        hiddenTitle: string
        text: string
        buttons: {
            title: string
            next: string
        }[]
    }
    isEditMode: boolean
    isSave: boolean
    setSave: () => void
    setRoom: (r: string) => void
}

const Room: React.FC<RoomPropsType> = (
    {room, setRoom, isEditMode, isSave, setSave}
) => {
    const {hiddenTitle, text, buttons} = room
    const [newText, setText] = useState(text)

    useEffect(() => {
        if (newText !== text && !isEditMode) setText(text)
    }, [isEditMode, text, newText, setText])

    useEffect(() => {
        if (isSave) {
            room.text = newText
            setSave()
        }
    }, [room, setSave, isSave, newText])

    return (
        <div>
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
                {buttons.map(b => {
                    return !isEditMode
                        ? <button key={b.next} onClick={() => setRoom(b.next)}>{b.title}</button>
                        : 1
                })}
            </div>
        </div>
    )
}

export default Room
