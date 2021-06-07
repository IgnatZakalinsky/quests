import React from 'react'

type RoomPropsType = {
    hiddenTitle: string
    text: string
    buttons: {
        title: string
        next: string
    }[]
    setRoom: (r: string) => void
}

const Room: React.FC<RoomPropsType> = ({hiddenTitle, text, buttons, setRoom}) => (
    <div>
        text:
        <div>
            {text}
        </div>

        <hr/>
        buttons:
        <div>
            {buttons.map(b => <button key={b.next} onClick={() => setRoom(b.next)}>{b.title}</button> )}
        </div>
    </div>
)

export default Room
