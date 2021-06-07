import React, {useState} from 'react'
import s from './Quest.module.css'
import Room from '../../q2-features/f1-room/Room'
import {v1} from 'uuid'

export type RoomType = {
    _id: string
    hiddenTitle: string
    text: string
    buttons: {
        _id: string
        title: string
        next: string
    }[]
}

const v = [v1(), v1(), v1(), v1()]

const rooms: RoomType[] = [
    {
        _id: v[0],
        hiddenTitle: 'x1',
        text: 'x1',
        buttons: [
            {_id: v1(), title: 'x2', next: v[1]},
            {_id: v1(), title: 'x3', next: v[2]},
        ],
    },
    {
        _id: v[1],
        hiddenTitle: 'x2',
        text: 'x2',
        buttons: [
            {_id: v1(), title: 'x1', next: v[0]},
            {_id: v1(), title: 'x3', next: v[2]},
        ],
    },
    {
        _id: v[2],
        hiddenTitle: 'x3',
        text: 'x3',
        buttons: [
            {_id: v1(), title: 'x2', next: v[1]},
            {_id: v1(), title: 'x1', next: v[0]},
        ],
    },

]

const Quest = () => {
    const [checkedRoom, setRoom] = useState(rooms[0]._id)
    const [isEditMode, setEditMode] = useState(false)
    const [isSave, setSave] = useState(false)

    const r = rooms.find(x => x._id === checkedRoom) || rooms[0]
    console.log(checkedRoom, r)

    return (
        <div className={s.quest}>
            {!isEditMode
                ? <span onClick={() => setEditMode(true)}>edit</span>
                : (
                    <div onClick={() => setEditMode(false)}>
                        <span onClick={() => setSave(true)}>save</span> cancel
                    </div>
                )
            }
            <hr/>

            <Room
                room={r}
                setRoom={setRoom}
                isEditMode={isEditMode}
                isSave={isSave}
                setSave={() => setSave(false)}
                rooms={rooms}
            />
        </div>
    )
}

export default Quest
