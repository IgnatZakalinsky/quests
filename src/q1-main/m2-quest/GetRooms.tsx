import React from 'react'
import {RoomType} from './RoomType'
import {v1} from 'uuid'

type GetRoomsPropsType = {
    setRooms: (r: RoomType[]) => void
    setRoom: (id: string) => void
    setFileName: (n: string) => void
}

const GetRooms: React.FC<GetRoomsPropsType> = ({setRoom, setRooms, setFileName}) => {
    return (
        <input
            type={'file'}
            accept={'.json'}
            onChange={e => {
                if (e.currentTarget.files && e.currentTarget.files[0]) {
                    const file = e.currentTarget.files[0]
                    if (file.type === 'application/json') {

                        const reader = new FileReader()
                        reader.onloadend = () => {
                            const newRooms: any = JSON.parse(reader.result + '')
                            console.log(newRooms)

                            if (newRooms instanceof Array && newRooms.every((nr: any) => (
                                typeof nr._id === 'string'
                                && typeof nr.hiddenTitle === 'string'
                                && typeof nr.text === 'string'
                                && nr.buttons instanceof Array
                                && nr.buttons.every((btn: any) => (
                                    typeof btn._id === 'string'
                                    && typeof btn._id === 'string'
                                    && typeof btn.title === 'string'
                                    && typeof btn.next === 'string'
                                ))
                            ))) { // check file data
                                if (!newRooms.find(x => x.hiddenTitle === 'new-room')) {
                                    newRooms.push({_id: v1(), hiddenTitle: 'new-room', text: '', buttons: []})
                                }

                                setRooms(newRooms)
                                setRoom(newRooms[0]._id)
                                setFileName(file.name)
                            } else alert('not rooms!')
                        }
                        reader.readAsText(file)
                    } else alert('not json!')
                }
            }}
        />
    )
}

export default GetRooms