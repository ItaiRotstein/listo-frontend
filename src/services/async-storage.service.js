export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany,
}

function query(entityType, delay = 0) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    if (!entities.length) {
        if (entityType === 'board') entities = _createBoards()
        else entities = _createUsers()
        // console.log('entities:', entities)
        _save(entityType, entities)
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject('OOOOPs')
            resolve(entities)
        }, delay)
    })
    // return Promise.resolve(entities)
}

function get(entityType, entityId) {
    return query(entityType).then((entities) =>
        entities.find((entity) => entity._id === entityId)
    )
}

function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType).then((entities) => {
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

function put(entityType, updatedEntity) {
    return query(entityType).then((entities) => {
        const idx = entities.findIndex(
            (entity) => entity._id === updatedEntity._id
        )
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    })
}

function remove(entityType, entityId) {
    return query(entityType).then((entities) => {
        const idx = entities.findIndex((entity) => entity._id === entityId)
        entities.splice(idx, 1)
        _save(entityType, entities)
    })
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function postMany(entityType, newEntities) {
    return query(entityType).then((entities) => {
        newEntities = newEntities.map((entity) => ({
            ...entity,
            _id: _makeId(),
        }))
        entities.push(...newEntities)
        _save(entityType, entities)
        return entities
    })
}

function _createBoards() {
    return [
        {
            _id: 'b101',
            title: 'Fashion designer',
            archivedAt: null,
            createdAt: 1589983468418,
            createdBy: {
                _id: 'u101',
                fullname: 'Barak Braun',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
            },
            style: {
                background: 'https://images.unsplash.com/photo-1519011985187-444d62641929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
            },
            labels: [
                { id: 'l108', title: 'Done', color: '#61bd4f' },
                { id: 'l107', title: 'Progress', color: '#61bd33' },
                { id: 'l101', title: '', color: '#61BD4F' },
                { id: 'l102', title: '', color: '#F2D600' },
                { id: 'l103', title: '', color: '#FF9F1A' },
                { id: 'l104', title: '', color: '#EB5A46' },
                { id: 'l105', title: '', color: '#C377E0' },
                { id: 'l106', title: '', color: '#0079BF' },
            ],
            members: [
                {
                    id: 'u101',
                    fullname: 'Barak Braun',
                    username: 'barak',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                },
                {
                    id: 'u102',
                    fullname: 'Guy Elizarov',
                    username: 'guy',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guy_r35jqz.jpg',
                },
                {
                    id: 'u103',
                    fullname: 'Itai Rotstein',
                    username: 'itai',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/itai_thvoqr.jpg',
                },
                {
                    id: 'u104',
                    fullname: 'Tommy Irmia',
                    username: 'tommy',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653410100/tommy_rnax4n.jpg',
                },
            ],
            groups: [
                {
                    id: 'g101',
                    title: 'In Progress',
                    archivedAt: 1589983468418,
                    tasks: [
                        {
                            id: 't101',
                            title: 'Replace logo',
                            description: 'need to replace logo argently',
                            style: {
                                color: null,
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            dueDate: null,
                            archivedAt: null,
                            checklists:[]
                        },
                        {
                            id: 't102',
                            title: 'Add Samples',
                            description: 'need to replace samples argently',
                            style: {
                                color: null,
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            dueDate: null,
                            archivedAt: null,
                            checklists:[]
                        },
                        {
                            id: 't103',
                            title: 'Make JSON Look Pretty',
                            description:
                                'need to Make JSON Look Pretty argently',
                            style: {
                                color: null,
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            dueDate: null,
                            archivedAt: null,
                            checklists:[]
                        },
                    ],
                    style: {},
                },
                {
                    id: 'g102',
                    title: 'QA',
                    tasks: [
                        {
                            id: 't113',
                            title: 'Test Filter Component',
                            style: {
                                color: null,
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            dueDate: null,
                            memberIds: [],
                            archivedAt: null,
                            checklists:[]
                        },
                        {
                            id: 't104',
                            title: 'Test headers new button',
                            status: 'in-progress',
                            description: 'description',
                            comments: [
                                {
                                    id: 'ZdPnm',
                                    txt: 'I started testing it, will finish by tomorrow noon...',
                                    createdAt: 1590999817436.0,
                                    byMember: {
                                        _id: 'u101',
                                        fullname: 'Barak Braun',
                                        imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                                    },
                                },
                            ],
                            checklists: [
                                {
                                    id: 'YEhaa',
                                    title: 'First checklist',
                                    todos: [
                                        {
                                            id: 'td131',
                                            title: 'take one deep breath',
                                            isDone: false,
                                        },
                                        {
                                            id: 'td132',
                                            title: 'Grab some beersss',
                                            isDone: true,
                                        },
                                    ],
                                },
                                {
                                    id: 'bbhmF',
                                    title: 'Second checklist',
                                    todos: [
                                        {
                                            id: 'td141',
                                            title: 'First of all take a deep breath',
                                            isDone: false,
                                        },
                                        {
                                            id: 'td142',
                                            title: 'Grab only one beer',
                                            isDone: true,
                                        },
                                    ],
                                },
                            ],
                            memberIds: ['u101', 'u102', 'u103', 'u104'],
                            labelIds: ['l101', 'l102'],
                            dueDate: 16156215211,
                            byMember: {
                                _id: 'u102',
                                username: 'guy',
                                fullname: 'Guy Elizarov',
                                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guy_r35jqz.jpg',
                            },
                            style: {
                                color: null,
                                imgUrl: 'https://images.unsplash.com/photo-1644797694478-d12d4eab8cd8?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880',
                                isCoverSizeBig: true,
                            },
                            archivedAt: null
                        },
                    ],
                    style: {},
                },
            ],
            activities: [
                {
                    id: 'a101',
                    txt: 'Changed Color',
                    createdAt: 154514,
                    byMember: {
                        _id: 'u101',
                        fullname: 'Barak Braun',
                        imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                    },
                    task: {
                        id: 't107',
                        title: 'Replace Logo',
                    },
                },
            ],
        },
        {
            _id: 'b102',
            title: 'Ornamental board',
            archivedAt: null,
            createdAt: 1589983468418,
            createdBy: {
                _id: 'u101',
                fullname: 'Barak Braun',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
            },
            style: {
                background: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            },
            labels: [
                { id: 'l108', title: 'Done', color: '#61bd4f' },
                { id: 'l107', title: 'Progress', color: '#61bd33' },
                { id: 'l101', title: '', color: '#61BD4F' },
                { id: 'l102', title: '', color: '#F2D600' },
                { id: 'l103', title: '', color: '#FF9F1A' },
                { id: 'l104', title: '', color: '#EB5A46' },
                { id: 'l105', title: '', color: '#C377E0' },
                { id: 'l106', title: '', color: '#0079BF' },
            ],
            members: [
                {
                    id: 'u101',
                    fullname: 'Barak Braun',
                    username: 'barak',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                },
                {
                    id: 'u102',
                    fullname: 'Guy Elizarov',
                    username: 'guy',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guy_r35jqz.jpg',
                },
                {
                    id: 'u103',
                    fullname: 'Itai Rotstein',
                    username: 'itai',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/itai_thvoqr.jpg',
                },
                {
                    id: 'u104',
                    fullname: 'Tommy Irmia',
                    username: 'tommy',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653410100/tommy_rnax4n.jpg',
                },
            ],
            groups: [
                {
                    id: 'g101',
                    title: 'In Progress',
                    archivedAt: 1589983468418,
                    tasks: [
                        {
                            id: 't101',
                            title: 'Replace logo',
                            style: {
                                color: null,
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            dueDate: null,
                            archivedAt: null,
                            checklists: [
                                {
                                    id: 'YEcccaa',
                                    title: 'Third checklist',
                                    todos: [
                                        {
                                            id: 'td161',
                                            title: 'take fifteen deep breathesssssss',
                                            isDone: false,
                                        },
                                        {
                                            id: 'td171',
                                            title: 'finish the DND Feature',
                                            isDone: true,
                                        },
                                    ],
                                },
                            ],
                        },

                        {
                            id: 't102',
                            title: 'Add Samples',
                            style: {
                                color: null,
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            dueDate: null,
                            archivedAt: null,
                            checklists:[]
                        },
                        {
                            id: 't103',
                            title: 'Make JSON Look Pretty',
                            style: {
                                color: null,
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            dueDate: null,
                            archivedAt: null,
                            checklists:[]
                        },
                    ],
                    style: {},
                },
                {
                    id: 'g102',
                    title: 'QA',
                    tasks: [
                        {
                            id: 't104',
                            title: 'Test headers new button',
                            status: 'in-progress',
                            description: 'description',
                            comments: [
                                {
                                    id: 'ZdPnm',
                                    txt: 'I started testing it, will finish by tomorrow noon...',
                                    createdAt: 1590999817436.0,
                                    byMember: {
                                        _id: 'u101',
                                        fullname: 'Barak Braun',
                                        imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                                    },
                                },
                            ],
                            checklists: [
                                {
                                    id: 'YEhaa',
                                    title: 'First checklist',
                                    todos: [
                                        {
                                            id: 'td131',
                                            title: 'take one deep breath',
                                            isDone: false,
                                        },
                                        {
                                            id: 'td132',
                                            title: 'Grab some beersss',
                                            isDone: true,
                                        },
                                    ],
                                },
                                {
                                    id: 'bbhmF',
                                    title: 'Second checklist',
                                    todos: [
                                        {
                                            id: 'td141',
                                            title: 'First of all take a deep breath',
                                            isDone: false,
                                        },
                                        {
                                            id: 'td142',
                                            title: 'Grab only one beer',
                                            isDone: true,
                                        },
                                    ],
                                },
                            ],
                            memberIds: ['u100', 'u101', 'u102', 'u104'],
                            labelIds: ['l101', 'l102'],
                            createdAt: 1590999730348,
                            dueDate: 16156215211,
                            byMember: {
                                _id: 'u102',
                                username: 'guy',
                                fullname: 'Guy Elizarov',
                                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guy_r35jqz.jpg',
                            },
                            style: {
                                color: '#7BC86C',
                                imgUrl: null,
                            },
                            archivedAt: null
                        },
                    ],
                    style: {},
                },
            ],
            activities: [
                {
                    id: 'a101',
                    txt: 'Changed Color',
                    createdAt: 154514,
                    byMember: {
                        _id: 'u101',
                        fullname: 'Barak Braun',
                        imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                    },
                    task: {
                        id: 't107',
                        title: 'Replace Logo',
                    },
                },
            ],
        },
        {
            _id: 'b103',
            title: 'Grow process',
            archivedAt: null,
            createdAt: 1589983468418,
            createdBy: {
                _id: 'u101',
                fullname: 'Barak Braun',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
            },
            style: {
                background: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            },
            labels: [
                { id: 'l108', title: 'Done', color: '#61bd4f' },
                { id: 'l107', title: 'Progress', color: '#61bd33' },
                { id: 'l101', title: '', color: '#61BD4F' },
                { id: 'l102', title: '', color: '#F2D600' },
                { id: 'l103', title: '', color: '#FF9F1A' },
                { id: 'l104', title: '', color: '#EB5A46' },
                { id: 'l105', title: '', color: '#C377E0' },
                { id: 'l106', title: '', color: '#0079BF' },
            ],
            members: [
                {
                    id: 'u101',
                    fullname: 'Barak Braun',
                    username: 'barak',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                },
                {
                    id: 'u102',
                    fullname: 'Guy Elizarov',
                    username: 'guy',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guy_r35jqz.jpg',
                },
                {
                    id: 'u103',
                    fullname: 'Itai Rotstein',
                    username: 'itai',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/itai_thvoqr.jpg',
                },
                {
                    id: 'u104',
                    fullname: 'Tommy Irmia',
                    username: 'tommy',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653410100/tommy_rnax4n.jpg',
                },
            ],
            groups: [
                {
                    id: 'g101',
                    title: 'In Progress',
                    archivedAt: 1589983468418,
                    tasks: [
                        {
                            id: 't101',
                            title: 'Replace logo',
                            style: {
                                color: null,
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            dueDate: null,
                            archivedAt: null,
                            checklists:[]
                        },
                        {
                            id: 't102',
                            title: 'Add Samples',
                            style: {
                                color: null,
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            dueDate: null,
                            archivedAt: null,
                            checklists:[]
                        },
                        {
                            id: 't103',
                            title: 'Make JSON Look Pretty',
                            style: {
                                color: null,
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            dueDate: null,
                            archivedAt: null,
                            checklists:[]
                        },
                    ],
                    style: {},
                },
                {
                    id: 'g102',
                    title: 'QA',
                    tasks: [
                        {
                            id: 't113',
                            title: 'Test Filter Component',
                            style: {
                                color: null,
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            dueDate: null,
                            archivedAt: null,
                            checklists:[]
                        },
                        {
                            id: 't104',
                            title: 'Test headers new button',
                            status: 'in-progress',
                            description: 'description',
                            comments: [
                                {
                                    id: 'ZdPnm',
                                    txt: 'I started testing it, will finish by tomorrow noon...',
                                    createdAt: 1590999817436.0,
                                    byMember: {
                                        _id: 'u101',
                                        fullname: 'Barak Braun',
                                        imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                                    },
                                },
                            ],
                            checklists: [
                                {
                                    id: 'YEhmF',
                                    title: 'Checklist',
                                    todos: [
                                        {
                                            id: 'td101',
                                            title: 'First take a deep breath',
                                            isDone: false,
                                        },
                                        {
                                            id: 'td102',
                                            title: 'Grab a beer',
                                            isDone: true,
                                        },
                                    ],
                                },
                            ],
                            memberIds: ['u100', 'u101', 'u102', 'u104'],
                            labelIds: ['l101', 'l102'],
                            createdAt: 1590999730348,
                            dueDate: 16156215211,
                            byMember: {
                                _id: 'u102',
                                username: 'guy',
                                fullname: 'Guy Elizarov',
                                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guy_r35jqz.jpg',
                            },
                            style: {
                                color: '#F5DD29',
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            archivedAt: null
                        },
                    ],
                    style: {},
                },
            ],
            activities: [
                {
                    id: 'a101',
                    txt: 'Changed Color',
                    createdAt: 154514,
                    byMember: {
                        _id: 'u101',
                        fullname: 'Barak Braun',
                        imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                    },
                    task: {
                        id: 't107',
                        title: 'Replace Logo',
                    },
                },
            ],
        },
        {
            _id: 'b104',
            title: 'Dev Master',
            archivedAt: null,
            createdAt: 1589983468418,
            createdBy: {
                _id: 'u101',
                fullname: 'Barak Braun',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
            },
            style: {
                background: 'https://images.unsplash.com/photo-1594904351111-a072f80b1a71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
            },
            labels: [
                { id: 'l108', title: 'Done', color: '#61bd4f' },
                { id: 'l107', title: 'Progress', color: '#61bd33' },
                { id: 'l101', title: '', color: '#61BD4F' },
                { id: 'l102', title: '', color: '#F2D600' },
                { id: 'l103', title: '', color: '#FF9F1A' },
                { id: 'l104', title: '', color: '#EB5A46' },
                { id: 'l105', title: '', color: '#C377E0' },
                { id: 'l106', title: '', color: '#0079BF' },
            ],
            members: [
                {
                    id: 'u101',
                    fullname: 'Barak Braun',
                    username: 'barak',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                },
                {
                    id: 'u102',
                    fullname: 'Guy Elizarov',
                    username: 'guy',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guy_r35jqz.jpg',
                },
                {
                    id: 'u103',
                    fullname: 'Itai Rotstein',
                    username: 'itai',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/itai_thvoqr.jpg',
                },
                {
                    id: 'u104',
                    fullname: 'Tommy Irmia',
                    username: 'tommy',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653410100/tommy_rnax4n.jpg',
                },
            ],
            groups: [
                {
                    id: 'g101',
                    title: 'In Progress',
                    archivedAt: 1589983468418,
                    tasks: [
                        {
                            id: 't101',
                            title: 'Replace logo',
                            style: {
                                color: null,
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            dueDate: null,
                            archivedAt: null,
                            checklists:[]
                        },
                        {
                            id: 't102',
                            title: 'Add Samples',
                            style: {
                                color: null,
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            dueDate: null,
                            archivedAt: null,
                            checklists:[]
                        },
                        {
                            id: 't103',
                            title: 'Make JSON Look Pretty',
                            style: {
                                color: null,
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            dueDate: null,
                            archivedAt: null,
                            checklists:[]
                        },
                    ],
                    style: {},
                },
                {
                    id: 'g102',
                    title: 'QA',
                    tasks: [
                        {
                            id: 't113',
                            title: 'Test Filter Component',
                            style: {
                                color: null,
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            dueDate: null,
                            archivedAt: null,
                            checklists:[]
                        },
                        {
                            id: 't104',
                            title: 'Test headers new button',
                            status: 'in-progress',
                            description: 'description',
                            comments: [
                                {
                                    id: 'ZdPnm',
                                    txt: 'I started testing it, will finish by tomorrow noon...',
                                    createdAt: 1590999817436.0,
                                    byMember: {
                                        _id: 'u101',
                                        fullname: 'Barak Braun',
                                        imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                                    },
                                },
                            ],
                            checklists: [
                                {
                                    id: 'YEhaa',
                                    title: 'First checklist',
                                    todos: [
                                        {
                                            id: 'td131',
                                            title: 'take one deep breath',
                                            isDone: false,
                                        },
                                        {
                                            id: 'td132',
                                            title: 'Grab some beersss',
                                            isDone: true,
                                        },
                                    ],
                                },
                                {
                                    id: 'bbhmF',
                                    title: 'Second checklist',
                                    todos: [
                                        {
                                            id: 'td141',
                                            title: 'First of all take a deep breath',
                                            isDone: false,
                                        },
                                        {
                                            id: 'td142',
                                            title: 'Grab only one beer',
                                            isDone: true,
                                        },
                                    ],
                                },
                            ],
                            memberIds: ['u100', 'u101', 'u102', 'u103'],
                            createdAt: 1590999730348,
                            dueDate: 16156215211,
                            byMember: {
                                _id: 'u102',
                                username: 'guy',
                                fullname: 'Guy Elizarov',
                                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guy_r35jqz.jpg',
                            },
                            style: {
                                color: null,
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            archivedAt: null
                        },
                    ],
                    style: {},
                },
            ],
            activities: [
                {
                    id: 'a101',
                    txt: 'Changed Color',
                    createdAt: 154514,
                    byMember: {
                        _id: 'u101',
                        fullname: 'Barak Braun',
                        imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                    },
                    task: {
                        id: 't107',
                        title: 'Replace Logo',
                    },
                },
            ],
        },
        {
            _id: 'b105',
            title: 'Free Spirit',
            archivedAt: null,
            createdAt: 1589983468418,
            createdBy: {
                _id: 'u101',
                fullname: 'Barak Braun',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
            },
            style: {
                background: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
            },
            labels: [
                { id: 'l108', title: 'Done', color: '#61bd4f' },
                { id: 'l107', title: 'Progress', color: '#61bd33' },
                { id: 'l101', title: '', color: '#61BD4F' },
                { id: 'l102', title: '', color: '#F2D600' },
                { id: 'l103', title: '', color: '#FF9F1A' },
                { id: 'l104', title: '', color: '#EB5A46' },
                { id: 'l105', title: '', color: '#C377E0' },
                { id: 'l106', title: '', color: '#0079BF' },
            ],
            members: [
                {
                    id: 'u101',
                    fullname: 'Barak Braun',
                    username: 'barak',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                },
                {
                    id: 'u102',
                    fullname: 'Guy Elizarov',
                    username: 'guy',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guy_r35jqz.jpg',
                },
                {
                    id: 'u103',
                    fullname: 'Itai Rotstein',
                    username: 'itai',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/itai_thvoqr.jpg',
                },
                {
                    id: 'u104',
                    fullname: 'Tommy Irmia',
                    username: 'tommy',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653410100/tommy_rnax4n.jpg',
                },
            ],
            groups: [
                {
                    id: 'g101',
                    title: 'In Progress',
                    archivedAt: 1589983468418,
                    tasks: [
                        {
                            id: 't101',
                            title: 'Replace logo',
                            style: {
                                color: null,
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            dueDate: null,
                            archivedAt: null,
                            checklists:[]
                        },
                        {
                            id: 't102',
                            title: 'Add Samples',
                            style: {
                                color: null,
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            dueDate: null,
                            archivedAt: null,
                            checklists:[]
                        },
                        {
                            id: 't103',
                            title: 'Make JSON Look Pretty',
                            style: {
                                color: null,
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            dueDate: null,
                            archivedAt: null,
                            checklists:[]
                        },
                    ],
                    style: {},
                },
                {
                    id: 'g102',
                    title: 'QA',
                    tasks: [
                        {
                            id: 't113',
                            title: 'Test Filter Component',
                            style: {
                                color: null,
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            dueDate: null,
                            archivedAt: null,
                            checklists:[]
                        },
                        {
                            id: 't104',
                            title: 'Test headers new button',
                            status: 'in-progress',
                            description: 'description',
                            comments: [
                                {
                                    id: 'ZdPnm',
                                    txt: 'I started testing it, will finish by tomorrow noon...',
                                    createdAt: 1590999817436.0,
                                    byMember: {
                                        _id: 'u101',
                                        fullname: 'Barak Braun',
                                        imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                                    },
                                },
                            ],
                            checklists: [
                                {
                                    id: 'YEhmF',
                                    title: 'Checklist',
                                    todos: [
                                        {
                                            id: 'td101',
                                            title: 'First take a deep breath',
                                            isDone: false,
                                        },
                                        {
                                            id: 'td102',
                                            title: 'Grab a beer',
                                            isDone: true,
                                        },
                                    ],
                                },
                            ],
                            memberIds: ['u100', 'u101', 'u102', 'u104'],
                            labelIds: ['l101', 'l102'],
                            createdAt: 1590999730348,
                            dueDate: 16156215211,
                            byMember: {
                                _id: 'u102',
                                username: 'guy',
                                fullname: 'Guy Elizarov',
                                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guy_r35jqz.jpg',
                            },
                            style: {
                                color: null,
                                imgUrl: null,
                                isCoverSizeBig: false,
                            },
                            archivedAt: null
                        },
                    ],
                    style: {},
                },
            ],
            activities: [
                {
                    id: 'a101',
                    txt: 'Changed Color',
                    createdAt: 154514,
                    byMember: {
                        _id: 'u101',
                        fullname: 'Barak Braun',
                        imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                    },
                    task: {
                        id: 't107',
                        title: 'Replace Logo',
                    },
                },
            ],
        },
        // {
        //     _id: 'b106',
        //     title: 'Sixth Board',
        //     archivedAt: null,
        //     createdAt: 1589983468418,
        //     createdBy: {
        //         _id: 'u101',
        //         fullname: 'Barak Braun',
        //         imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
        //     },
        //     style: {
        //         bgColor: '#89609e',
        //         bgImage: null
        //     },
        //     labels: [
        //         { id: 'l108', title: 'Done', color: '#61bd4f' },
        //         { id: 'l107', title: 'Progress', color: '#61bd33' },
        //         { id: 'l101', title: '', color: '#61BD4F' },
        //         { id: 'l102', title: '', color: '#F2D600' },
        //         { id: 'l103', title: '', color: '#FF9F1A' },
        //         { id: 'l104', title: '', color: '#EB5A46' },
        //         { id: 'l105', title: '', color: '#C377E0' },
        //         { id: 'l106', title: '', color: '#0079BF' },
        //     ],
        //     members: [
        //         {
        //             id: 'u101',
        //             fullname: 'Barak Braun',
        //             username: 'barak',
        //             imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
        //         },
        //         {
        //             id: 'u102',
        //             fullname: 'Guy Elizarov',
        //             username: 'guy',
        //             imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guy_r35jqz.jpg',
        //         },
        //         {
        //             id: 'u103',
        //             fullname: 'Itai Rotstein',
        //             username: 'itai',
        //             imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/itai_thvoqr.jpg',
        //         },
        //         {
        //             id: 'u104',
        //             fullname: 'Tommy Irmia',
        //             username: 'tommy',
        //             imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653410100/tommy_rnax4n.jpg',
        //         },
        //     ],
        //     groups: [
        //         {
        //             id: 'g101',
        //             title: 'In Progress',
        //             archivedAt: 1589983468418,
        //             tasks: [
        //                 {
        //                     id: 't101',
        //                     title: 'Replace logo',
        //                     style: {
        //                         color: null,
        //                         imgUrl: null,
        //                         isCoverSizeBig: false,
        //                     },
        //                     dueDate: null,
        //                     archivedAt: null
        //                 },
        //                 {
        //                     id: 't102',
        //                     title: 'Add Samples',
        //                     style: {
        //                         color: null,
        //                         imgUrl: null,
        //                         isCoverSizeBig: false,
        //                     },
        //                     dueDate: null,
        //                     archivedAt: null
        //                 },
        //                 {
        //                     id: 't103',
        //                     title: 'Make JSON Look Pretty',
        //                     style: {
        //                         color: null,
        //                         imgUrl: null,
        //                         isCoverSizeBig: false,
        //                     },
        //                     dueDate: null,
        //                     archivedAt: null
        //                 },
        //             ],
        //             style: {},
        //         },
        //         {
        //             id: 'g102',
        //             title: 'QA',
        //             tasks: [
        //                 {
        //                     id: 't113',
        //                     title: 'Test Filter Component',
        //                     style: {
        //                         color: null,
        //                         imgUrl: null,
        //                         isCoverSizeBig: false,
        //                     },
        //                     dueDate: null,
        //                 },
        //                 {
        //                     id: 't104',
        //                     title: 'Test headers new button',
        //                     status: 'in-progress',
        //                     description: 'description',
        //                     comments: [
        //                         {
        //                             id: 'ZdPnm',
        //                             txt: 'I started testing it, will finish by tomorrow noon...',
        //                             createdAt: 1590999817436.0,
        //                             byMember: {
        //                                 _id: 'u101',
        //                                 fullname: 'Barak Braun',
        //                                 imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
        //                             },
        //                         },
        //                     ],
        //                     checklists: [
        //                         {
        //                             id: 'YEhaa',
        //                             title: 'First checklist',
        //                             todos: [
        //                                 {
        //                                     id: 'td131',
        //                                     title: 'take one deep breath',
        //                                     isDone: false,
        //                                 },
        //                                 {
        //                                     id: 'td132',
        //                                     title: 'Grab some beersss',
        //                                     isDone: true,
        //                                 },
        //                             ],
        //                         },
        //                         {
        //                             id: 'bbhmF',
        //                             title: 'Second checklist',
        //                             todos: [
        //                                 {
        //                                     id: 'td141',
        //                                     title: 'First of all take a deep breath',
        //                                     isDone: false,
        //                                 },
        //                                 {
        //                                     id: 'td142',
        //                                     title: 'Grab only one beer',
        //                                     isDone: true,
        //                                 },
        //                             ],
        //                         },
        //                     ],
        //                     memberIds: ['u100', 'u101', 'u102', 'u103', 'u104'],
        //                     labelIds: ['l101', 'l102'],
        //                     createdAt: 1590999730348,
        //                     dueDate: 16156215211,
        //                     byMember: {
        //                         _id: 'u102',
        //                         username: 'guy',
        //                         fullname: 'Guy Elizarov',
        //                         imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guy_r35jqz.jpg',
        //                     },
        //                     style: {
        //                         color: null,
        //                         imgUrl: 'https://images.unsplash.com/photo-1631116616602-322db356c4fb?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687',
        //                         isCoverSizeBig: false,
        //                     },
        //                 },
        //             ],
        //             style: {},
        //         },
        //     ],
        //     activities: [
        //         {
        //             id: 'a101',
        //             txt: 'Changed Color',
        //             createdAt: 154514,
        //             byMember: {
        //                 _id: 'u101',
        //                 fullname: 'Barak Braun',
        //                 imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
        //             },
        //             task: {
        //                 id: 't107',
        //                 title: 'Replace Logo',
        //             },
        //         },
        //     ],
        // },
    ]
}

function _createUsers() {
    return [
        {
            _id: 'u100',
            fullname: 'Guest',
            username: 'guest',
            password: 'guest',
            imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guest_he90su.jpg',
            mentions: [
                {
                    id: 'm101',
                    boardId: 'b101',
                    taskId: 't101',
                },
                {
                    id: 'm102',
                    boardId: 'b102',
                    taskId: 't102',
                },
            ],
        },
        {
            _id: 'u101',
            fullname: 'Barak Braun',
            username: 'barak',
            password: 'barak',
            imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
            mentions: [
                {
                    id: 'm101',
                    boardId: 'b101',
                    taskId: 't101',
                },
                {
                    id: 'm102',
                    boardId: 'b102',
                    taskId: 't102',
                },
            ],
        },
        {
            _id: 'u102',
            fullname: 'Guy Elizarov',
            username: 'guy',
            password: 'guy',
            imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guy_r35jqz.jpg',
            mentions: [
                {
                    id: 'm102',
                    boardId: 'b102',
                    taskId: 't102',
                },
            ],
        },
        {
            _id: 'u103',
            fullname: 'Itai Rotstein',
            username: 'itai',
            password: 'itai',
            imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/itai_thvoqr.jpg',
            mentions: [
                {
                    id: 'm103',
                    boardId: 'b103',
                    taskId: 't103',
                },
            ],
        },
        {
            _id: 'u104',
            fullname: 'Tommy Irmia',
            username: 'tommy',
            password: 'tommy',
            imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653410100/tommy_rnax4n.jpg',
            mentions: [
                {
                    id: 'm104',
                    boardId: 'b104',
                    taskId: 't104',
                },
            ],
        },
    ]
}
