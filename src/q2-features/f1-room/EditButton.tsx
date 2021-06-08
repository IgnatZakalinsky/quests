import React from 'react'
import {NextButtonType, RoomType} from '../../q1-main/m2-quest/RoomType'
import s from './Room.module.css'

type EditButtonPropsType = {
    b: NextButtonType
    setButtons: (bs: NextButtonType[]) => void
    newButtons: NextButtonType[]
    rooms: RoomType[]
}

const EditButton: React.FC<EditButtonPropsType> = (
    {b, newButtons, setButtons, rooms}
) => {
    return (
        <div key={b._id} className={s.row}>
            <textarea
                value={b.title}
                className={s.w50}
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
}

export default EditButton