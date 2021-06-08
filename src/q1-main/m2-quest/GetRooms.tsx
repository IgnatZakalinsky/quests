import React, {useEffect, useRef} from 'react'
import {RoomType} from './RoomType'
import {v1} from 'uuid'

type GetRoomsPropsType = {
    setRooms: (r: RoomType[]) => void
    setRoom: (id: string) => void
    setFileName: (n: string) => void
    setFile: (f: FileList | null) => void
    file: FileList | null
}

const GetRooms: React.FC<GetRoomsPropsType> = ({setRoom, setRooms, setFileName, setFile, file}) => {
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (ref?.current?.files && file) {
            // const dt = new DataTransfer()
            // // dt.items.add(new File(['text'], 'primer.txt', {type: 'text/plain'}))
            // dt.items.add(file)
            ref.current.files = file
        }
    }, [ref, file])


    return (
        <input
            type={'file'}
            accept={'.json'}
            ref={ref}
            onChange={e => {
                if (e.currentTarget.files && e.currentTarget.files[0]) {
                    const nFile = e.currentTarget.files
                    if (nFile[0].type === 'application/json') {
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
                                setFileName(nFile[0].name)
                                setFile(nFile)
                            } else alert('not rooms!')
                        }
                        reader.readAsText(nFile[0])
                    } else alert('not json!')
                }
            }}
        />
    )
}

export default GetRooms