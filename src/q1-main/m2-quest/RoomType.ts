export type NextButtonType = {
    _id: string
    title: string
    next: string
}

export type RoomType = {
    _id: string
    hiddenTitle: string
    text: string
    buttons: NextButtonType[]
}

export const defRooms: RoomType[] = [
    {
        buttons: [
            {
                _id: 'b8c38d00-c859-11eb-ac91-3933f47cd1ad',
                next: '1131f2b0-c85a-11eb-ac91-3933f47cd1ad',
                title: 'start game'
            },
            {
                _id: 'feea8900-c859-11eb-ac91-3933f47cd1ad',
                next: '5b62de30-c85a-11eb-ac91-3933f47cd1ad',
                title: 'all rooms for dev'
            },
        ],
        hiddenTitle: 'pre-start-room',
        text: 'example quest: pre-start room for better dev (check all rooms) and text about quest',
        _id: 'a7c19ba0-c859-11eb-ac91-3933f47cd1ad'
    },
    {
        buttons: [
            {_id: '47bd1d00-c85a-11eb-ac91-3933f47cd1ad', next: '4fb1c1f0-c85f-11eb-96dd-3d06ece4f7a0', title: 'next'},
            {_id: '4d799e80-c85a-11eb-ac91-3933f47cd1ad', next: 'a7c19ba0-c859-11eb-ac91-3933f47cd1ad', title: 'exit'},
        ],
        hiddenTitle: 'start-room',
        text: 'quest started...',
        _id: '1131f2b0-c85a-11eb-ac91-3933f47cd1ad'
    },
    {
        buttons: [
            {
                _id: '39c12660-c85f-11eb-96dd-3d06ece4f7a0',
                next: 'a7c19ba0-c859-11eb-ac91-3933f47cd1ad',
                title: 'pre-start-room'
            },
            {
                _id: '4386fb20-c85f-11eb-96dd-3d06ece4f7a0',
                next: '1131f2b0-c85a-11eb-ac91-3933f47cd1ad',
                title: 'start-room'
            },
            {
                _id: '4b175240-c85f-11eb-96dd-3d06ece4f7a0',
                next: '4fb1c1f0-c85f-11eb-96dd-3d06ece4f7a0',
                title: 'new-room'
            },
        ],
        hiddenTitle: 'all-rooms',
        text: 'buttons in all rooms for dev',
        _id: '5b62de30-c85a-11eb-ac91-3933f47cd1ad',
    },
    {
        buttons: [
            {_id: '609b2240-c85f-11eb-96dd-3d06ece4f7a0', next: 'a7c19ba0-c859-11eb-ac91-3933f47cd1ad', title: 'exit'},
        ],
        hiddenTitle: 'new-room',
        text: '',
        _id: '4fb1c1f0-c85f-11eb-96dd-3d06ece4f7a0'
    },

]