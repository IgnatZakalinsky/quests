import {v1} from 'uuid'

export type NextButtonType = {
    _id: string
    title: string
    next: string
}

export class RoomType {
    constructor(
        public _id: string,
        public hiddenTitle: string,
        public text: string,
        public buttons: NextButtonType[]) {
    }
}

const v = [v1(), v1(), v1(), v1()] // for tests

export const defRooms: RoomType[] = [
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