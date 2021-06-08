import React from 'react'
import {RoomType} from './RoomType'
import {v1} from 'uuid'

type GetRoomsPropsType = {
    setRooms: (r: RoomType[]) => void
    setRoom: (id: string) => void
}

const GetRooms:React.FC<GetRoomsPropsType> = ({setRoom, setRooms}) => {
    return (
        <input
            type={'file'}
            accept={'.json'}
            onChange={e => {
                if (e.currentTarget.files && e.currentTarget.files[0]) {
                    const file = e.currentTarget.files[0]
                    // console.log(file.type) // application/json
                    if (file.type === 'application/json') {

                        const reader = new FileReader()
                        reader.onloadend = () => {
                            const newRooms: RoomType[] = JSON.parse(reader.result + '')
                            console.log(newRooms)

                            if (newRooms.every(nr => nr instanceof RoomType)) { // check file data
                                if (!newRooms.find(x => x.hiddenTitle === 'new-room')) {
                                    newRooms.push({_id: v1(), hiddenTitle: 'new-room', text: '', buttons: []})
                                }

                                setRooms(newRooms)
                                setRoom(newRooms[0]._id)
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