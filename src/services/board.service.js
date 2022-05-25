import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import {
    getActionRemoveBoard,
    getActionAddBoard,
    getActionUpdateBoard,
} from '../store/actions/board.action'

const STORAGE_KEY = 'board'
const boardChannel = new BroadcastChannel('boardChannel')
// const listeners = []

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    subscribe,
    unsubscribe,
}
window.cs = boardService

function query() {
    return storageService.query(STORAGE_KEY)
}
function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
    // return axios.get(`/api/board/${boardId}`)
}
async function remove(boardId) {
    // return new Promise((resolve, reject) => {
    //     setTimeout(reject, 2000)
    // })
    // return Promise.reject('Not now!');
    await storageService.remove(STORAGE_KEY, boardId)
    boardChannel.postMessage(getActionRemoveBoard(boardId))
}
async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
        boardChannel.postMessage(getActionUpdateBoard(savedBoard))
    } else {
        // Later, owner is set by the backend
        // board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
        boardChannel.postMessage(getActionAddBoard(savedBoard))
    }
    return savedBoard
}

function getEmptyBoard() {
    const newBoard =  {
        title: 'New Board',
        archivedAt: null,
        createdAt: Date.now(),
        createdBy: {
            _id: 'u100',
            fullname: 'Guest',
            imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guest_he90su.jpg',
        },
        style: {
            background: '#091e420a',
        },
        labels: [],
        members: [
            {
                _id: 'u100',
                fullname: 'Guest',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guest_he90su.jpg',
            },
        ],
        groups: [
            {
                id: utilService.makeId(),
                title: '',
                archivedAt: Date.now(),
                tasks: [
                    {
                        id: 't101',
                        title: 'Replace logo',
                    },
                ],
                style: {},
            },
        ],
        activities: [
            {
                id: utilService.makeId(),
                txt: 'Guest created a board',
                createdAt: Date.now(),
                byMember: {
                    _id: 'u100',
                    fullname: 'Guest',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                },
                // task: {
                //     id: 't107',
                //     title: 'Replace Logo',
                // },
            },
        ],
    }
    return newBoard
}

function subscribe(listener) {
    boardChannel.addEventListener('message', listener)
}
function unsubscribe(listener) {
    boardChannel.removeEventListener('message', listener)
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
