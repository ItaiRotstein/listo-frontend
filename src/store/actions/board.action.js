import { boardService } from '../../services/board.service'

export function getActionSetBoards(boards) {
    return {
        type: 'SET_BOARDS',
        boards,
    }
}
export function getActionSetBoard(board) {
    return {
        type: 'SET_BOARD',
        board,
    }
}

export function getActionRemoveBoard(boardId) {
    return {
        type: 'REMOVE_BOARD',
        boardId,
    }
}
export function getActionAddBoard(board) {
    return {
        type: 'ADD_BOARD',
        board,
    }
}
export function getActionUpdateBoard(board) {
    return {
        type: 'UPDATE_BOARD',
        board,
    }
}

export function setBoard(boardId) {
    return async (dispatch) => {
        try {
            const board = await boardService.getById(boardId)
            dispatch(getActionSetBoard(board))
        } catch (err) {
            console.log('Cannot set board', err)
        }
    }
}

export function loadBoards() {
    return async (dispatch) => {
        try {
            const boards = await boardService.query()
            dispatch(getActionSetBoards(boards))
        } catch {
            throw new Error('Could not load boards')
        }
    }
}

export function getBoard(boardId) {
    return async (dispatch) => {
        try {
            const board = await boardService.getById(boardId)
            dispatch(getActionSetBoard(board))
        } catch {
            throw new Error('Could not load boards')
        }
    }
}

export function removeBoard(boardId) {
    return async (dispatch) => {
        try {
            await boardService.remove(boardId)
            dispatch(getActionRemoveBoard(boardId))
        } catch {
            throw new Error('Could not remove board')
        }
    }
}

export function saveBoard(board) {
    return async (dispatch) => {
        console.log('test')
        console.log('board:',board)
        
        const actionType = board._id ? 'UPDATE_BOARD' : 'ADD_BOARD'
        try {
            const savedBoard = await boardService.save(board)
            console.log('savedBoard:',savedBoard)
            
            dispatch({ type: actionType, board: savedBoard })
        } catch(err) {
            throw err
        }
    }
}

export function addGroup(groupTitle, boardId) {
    return async (dispatch) => {
        try {
            const board = await boardService.addGroup(groupTitle, boardId)
            dispatch({
                type: 'SAVE_BOARD',
                board: board,
            })
        } catch (err) {
            console.log('Cannot add group', err)
        }
    }
}

export function updateGroup(boardId, groupId, groupTitle) {
    return async (dispatch) => {
        try {
            const board = await boardService.updateGroup(
                boardId,
                groupId,
                groupTitle
            )
            dispatch({
                type: 'SAVE_BOARD',
                board: board,
            })
        } catch (err) {
            console.log('Cannot update group', err)
        }
    }
}

export function addTask(taskTitle, boardId, groupId) {
    return async (dispatch) => {
        try {
            const board = await boardService.addTask(
                taskTitle,
                boardId,
                groupId
            )
            dispatch({
                type: 'SAVE_BOARD',
                board: board,
            })
        } catch (err) {
            console.log('Cannot add group', err)
        }
    }
}

export function updateTask(boardId, groupId, task) {
    return async (dispatch) => {
        try {
            const board = await boardService.updateTask(boardId, groupId, task)
            dispatch({
                type: 'SAVE_BOARD',
                board: board,
            })
        } catch (err) {
            console.log('Cannot add group', err)
        }
    }
}
