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
    const [newButtons, setButtons] = useState(buttons)

    useEffect(() => {
        if (isSave) {
            room.text = newText
            room.buttons = newButtons
            setSave()
        }
    }, [room, setSave, isSave, newText, newButtons])

    useEffect(() => {
        if (!isEditMode) {
            if (newText !== text) setText(text)
            if (newButtons !== buttons) setButtons(buttons)
        } else {
            if (newButtons === buttons) setButtons(buttons.map(b => ({...b})))
        }
    }, [isEditMode, text, newText, setText, setButtons, newButtons, buttons])

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
                {newButtons.map((b, i) => {
                    return !isEditMode
                        ? <button key={b.next} onClick={() => setRoom(b.next)}>{b.title}</button>
                        : (
                            <div>
                                <input
                                    value={b.title}
                                    onChange={e => {
                                        b.title = e.currentTarget.value
                                        setButtons([...newButtons])
                                    }}
                                />
                                <input
                                    value={b.next}
                                    onChange={e => {
                                        b.next = e.currentTarget.value
                                        setButtons([...newButtons])
                                    }}
                                />
                                <button
                                    onClick={
                                        () => setButtons(
                                            newButtons.filter((x, ii) => i !== ii)
                                        )
                                    }
                                >del
                                </button>
                            </div>
                        )
                })}

                {isEditMode && (
                    <div>
                        <button onClick={() => setButtons([...newButtons, {next: '', title: ''}])}>add</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Room
