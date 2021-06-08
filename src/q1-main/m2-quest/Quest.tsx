import React, {useState} from 'react'
import s from './Quest.module.css'
import Room from '../../q2-features/f1-room/Room'
import {defRooms} from './RoomType'
import GetRooms from './GetRooms'
import {v1} from 'uuid'

const Quest = () => {
    const [rooms, setRooms] = useState(defRooms)
    const [checkedRoom, setRoom] = useState(rooms[0]._id)
    const [isEditMode, setEditMode] = useState(false)
    const [isSave, setSave] = useState(false)

    const r = rooms.find(x => x._id === checkedRoom) || rooms[0]

    return (
        <div className={s.quest}>
            {!isEditMode
                ? (
                    <div>
                        <button
                            onClick={() => {
                                const _id = v1()
                                setRooms([{_id, hiddenTitle: 'new-room', text: '', buttons: []}])
                                setRoom(_id)
                            }}
                        >new quest</button>
                        <button onClick={() => setEditMode(true)}>edit</button>

                        <GetRooms setRooms={setRooms} setRoom={setRoom}/>
                    </div>
                ) : (
                    <div onClick={() => setEditMode(false)}>
                        <button onClick={() => setSave(true)}>save</button>
                        <button>cancel</button>
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
