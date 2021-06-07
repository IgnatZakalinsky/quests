import React, {useState} from 'react'
import s from './Quest.module.css'
import Room from "../../q2-features/f1-room/Room";

const rooms = [
    {
        hiddenTitle: 'x1',
        text: 'x1',
        buttons: [
            {title: 'x2', next: 'x2'},
            {title: 'x3', next: 'x3'},
        ],
    },
    {
        hiddenTitle: 'x2',
        text: 'x2',
        buttons: [
            {title: 'x1', next: 'x1'},
            {title: 'x3', next: 'x3'},
        ],
    },
    {
        hiddenTitle: 'x3',
        text: 'x3',
        buttons: [
            {title: 'x2', next: 'x2'},
            {title: 'x1', next: 'x1'},
        ],
    },

]

const Quest = () => {
    const [checkedRoom, setRoom] = useState(rooms[0].hiddenTitle)

    const r = rooms.find(x => x.hiddenTitle === checkedRoom) || rooms[0]

    return (
        <div className={s.quest}>
            <Room
                key={r.hiddenTitle}
                text={r.text}
                buttons={r.buttons}
                hiddenTitle={r.hiddenTitle}
                setRoom={setRoom}
            />
        </div>
    )
}

export default Quest
