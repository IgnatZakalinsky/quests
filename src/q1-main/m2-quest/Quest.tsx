import React, {useState} from 'react'
import s from './Quest.module.css'
import Room from '../../q2-features/f1-room/Room'
import {defRooms} from './RoomType'
import GetRooms from './GetRooms'
import {v1} from 'uuid'

const Quest = () => {
    const [rooms, setRooms] = useState(defRooms)
    const [fileName, setFileName] = useState('defRooms.json')
    const [checkedRoom, setRoom] = useState(rooms[0]._id)
    const [isEditMode, setEditMode] = useState(false)
    const [isSave, setSave] = useState(false)

    const r = rooms.find(x => x._id === checkedRoom) || rooms[0]

    const newQuest = () => {
        const _id = v1()
        setRooms([{_id, hiddenTitle: 'new-room', text: '', buttons: []}])
        setRoom(_id)
        setFileName('new-quest.json')
    }

    const save = () => {
        setSave(true)
        setEditMode(false)

        const link = document.createElement('a')
        link.href = 'data:text/plain;content-disposition=attachment;filename=file,' + JSON.stringify(rooms)
        link.download = fileName
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className={s.quest}>
            {!isEditMode
                ? (
                    <div>
                        <button
                            onClick={newQuest}
                        >new quest
                        </button>
                        <button onClick={() => setEditMode(true)}>edit</button>

                        <GetRooms setRooms={setRooms} setRoom={setRoom} setFileName={setFileName}/>
                    </div>
                ) : (
                    <div>
                        <input value={fileName} onChange={e => setFileName(e.currentTarget.value)}/>
                        <button onClick={save}>save</button>
                        <button onClick={() => setEditMode(false)}>cancel</button>
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
