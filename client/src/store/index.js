import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth'

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    SAVE_PUBLISH_LIST: "SAVE_PUBLISH_LIST",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    LIKE_DISLIKE_LIST: "LIKE_DISLIKE_LIST",
    CHANGE_PAGE: "CHANGE_PAGE",
    SORT_LISTS: "SORT_LISTS",
    SEARCH_LISTS: "SEARCH_LISTS",
    RESET_COUNT: "RESET_COUNT"
}

export const GlobalStorePageType = {
    HOME: "HOME",
    COMMUNITY: "COMMUNITY",
    USERS: "USERS",
    ALLLISTS: "ALLLISTS"
}

export const GlobalStoreSortType = {
    NEWEST: "NEWEST",
    OLDEST: "OLDEST",
    VIEWS: "VIEWS",
    LIKE: "LIKE",
    DISLIKE: "DISLIKE"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentLists: [],
        currentList: null,
        newListCounter: 0,
        listMarkedForDeletion: null,
        pageType: null,
        sortType: null,
        searched: "",
        communityLists: []
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.SAVE_PUBLISH_LIST: {
                return setStore({
                    currentLists: payload.currentLists,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    pageType: store.pageType,
                    sortType: store.sortType,
                    searched: store.searched,
                    communityLists: payload.communityLists
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentLists: store.currentLists,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    pageType: store.pageType,
                    sortType: store.sortType,
                    searched: store.searched,
                    communityLists: store.communityLists
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    currentLists: store.currentLists,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listMarkedForDeletion: null,
                    pageType: store.pageType,
                    sortType: store.sortType,
                    searched: store.searched,
                    communityLists: payload.communityLists
                })
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentLists: store.currentLists,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: payload,
                    pageType: store.pageType,
                    sortType: store.sortType,
                    searched: store.searched,
                    communityLists: store.communityLists
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    currentLists: store.currentLists,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    pageType: store.pageType,
                    sortType: store.sortType,
                    searched: store.searched,
                    communityLists: store.communityLists
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentLists: store.currentLists,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    pageType: store.pageType,
                    sortType: store.sortType,
                    searched: store.searched,
                    communityLists: store.communityLists
                });
            }
            case GlobalStoreActionType.LIKE_DISLIKE_LIST: {
                return setStore({
                    currentLists: store.currentLists,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    pageType: store.pageType,
                    sortType: store.sortType,
                    searched: store.searched,
                    communityLists: store.communityLists
                })
            }
            case GlobalStoreActionType.CHANGE_PAGE: {
                return setStore({
                    currentLists: payload.currentLists,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    pageType: payload.pageType,
                    sortType: null,
                    searched: "",
                    communityLists: payload.communityLists
                })
            }
            case GlobalStoreActionType.SORT_LISTS: {
                return setStore({
                    currentLists: payload.currentLists,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    pageType: store.pageType,
                    sortType: payload.sortType,
                    searched: store.searched,
                    communityLists: payload.communityLists
                })
            }
            case GlobalStoreActionType.SEARCH_LISTS: {
                return setStore({
                    currentLists: payload.currentLists,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    pageType: store.pageType,
                    sortType: store.sortType,
                    searched: payload.searched,
                    communityLists: payload.communityLists
                })
            }
            case GlobalStoreActionType.RESET_COUNT: {
                return setStore({
                    currentLists: store.currentLists,
                    currentList: null,
                    newListCounter: 0,
                    listMarkedForDeletion: null,
                    pageType: store.pageType,
                    sortType: store.sortType,
                    searched: store.searched,
                    communityLists: store.communityLists
                })
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.
    store.loginReset = function () {
        storeReducer({
            type: GlobalStoreActionType.RESET_COUNT,
            payload: {}
        })
    }
    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.saveList = async function (id, newName, newItems) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.name = newName;
            top5List.items = newItems;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs(top5List) {
                        response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.top5Lists;
                            let ownedLists = pairsArray.filter(list => list.ownerId === auth.user.userId);
                            storeReducer({
                                type: GlobalStoreActionType.SAVE_PUBLISH_LIST,
                                payload: {
                                    currentLists: ownedLists,
                                    communityLists: store.communityLists
                                }
                            });
                            history.push("/home/");
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
    }

    store.publishList = async function (id, newName, newItems) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.name = newName;
            top5List.items = newItems;
            top5List.published = true;
            top5List.publishDate = new Date();
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs(top5List) {
                        response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.top5Lists;
                            let ownedLists = pairsArray.filter(list => list.ownerId === auth.user.userId);
                            let communityLists = await store.updateCommunity(top5List)
                            console.log(communityLists)
                            storeReducer({
                                type: GlobalStoreActionType.SAVE_PUBLISH_LIST,
                                payload: {
                                    currentLists: ownedLists,
                                    communityLists: communityLists
                                }
                            });
                            history.push("/home/");
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
    }
    store.handleViews = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.views++;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    const list = store.currentLists.find(list => list._id === id)
                    list.views++;
                    storeReducer({
                        type: GlobalStoreActionType.LIKE_DISLIKE_LIST,
                        payload: {}
                    })
                }
            }
            updateList(top5List);
        }
    }

    store.handleCommunityViews = async function (id) {
        let response = await api.getAggregateById(id);
        if (response.data.success) {
            let aggregate = response.data.aggregate;
            console.log(aggregate)
            aggregate.views++;
            async function updateList(aggregate) {
                response = await api.updateAggregates(aggregate._id, aggregate);
                if (response.data.success) {
                    const list = store.communityLists.find(list => list._id === id)
                    list.views++;
                    storeReducer({
                        type: GlobalStoreActionType.LIKE_DISLIKE_LIST,
                        payload: {}
                    })
                }
            }
            updateList(aggregate);
        }
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        history.push("/home/");
    }

    store.welcomePage = function () {
        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        let payload = {
            name: newListName,
            items: ["?", "?", "?", "?", "?"],
            ownerId: auth.user.userId,
            likes: 0,
            likedUsers: [],
            dislikes: 0,
            dislikedUsers: [],
            views: 0,
            published: false,
            comments: [],
            publishDate: new Date(0)
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            });

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/home/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadHomeLists = async function () {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.top5Lists;
            let ownedLists = pairsArray.filter(list => list.ownerId === auth.user.userId);
            storeReducer({
                type: GlobalStoreActionType.CHANGE_PAGE,
                payload: {
                    currentLists: ownedLists,
                    pageType: GlobalStorePageType.HOME,
                    communityLists: store.communityLists
                }
            });
        }
    }

    store.loadCommunityLists = async function () {
        const response = await api.getAllAggregates();
        if (response.data.success) {
            let aggregates = response.data.aggregates;
            aggregates.sort((first, second) => {
                if(first.updatedAt > second.updatedAt){
                    return -1;
                }else if(first.updatedAt < second.updatedAt){
                    return 1
                }else{
                    return 0
                }
            })
            storeReducer({
                type: GlobalStoreActionType.CHANGE_PAGE,
                payload: {
                    currentLists: store.currentList,
                    pageType: GlobalStorePageType.COMMUNITY,
                    communityLists: aggregates
                }
            });
        }
    }

    store.loadDefaultAllLists = async function () {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let top5Lists = response.data.top5Lists;
            let publishedLists = top5Lists.filter(list => list.published === true);
            publishedLists.sort((first, second) => {
                if(first.creationDate > second.creationDate){
                    return -1;
                }else if(first.creationDate < second.creationDate){
                    return 1
                }else{
                    return 0
                }
            })
            storeReducer({
                type: GlobalStoreActionType.CHANGE_PAGE,
                payload: {
                    currentLists: publishedLists,
                    pageType: GlobalStorePageType.ALLLISTS,
                    communityLists: store.communityLists
                }
            });
        }
    }

    store.updateCommunity = async function (newlist) {
        try{
            let response = await api.getAllAggregates();
            if(response.data.success){
                let aggregates = response.data.aggregates
                const index = aggregates.findIndex(list => list.name.toLowerCase() === newlist.name.toLowerCase())
                console.log(index)
                const matchingList = aggregates[index]
                if(matchingList){ // update
                    let itemsCount = matchingList.itemsCount
                    let items = newlist.items
                    for(let index in items){
                        if(items[index] in itemsCount){
                            itemsCount[items[index]]++
                        }else{
                            itemsCount[items[index]] = 1
                        }
                    }
                    let itemsCountMap = new Map([...Object.entries(itemsCount)].sort((a, b) => b[1] - a[1]));
                    itemsCount = Object.fromEntries(itemsCountMap);
                    aggregates[index].itemsCount = itemsCount;
                    aggregates[index].users.push(newlist.ownerId)
                    let response = await api.updateAggregates(aggregates[index]._id, aggregates[index])
                    if(response.data.success){
                        response = await api.getAllAggregates();
                        if(response.data.success){
                            return response.data.aggregates
                        }
                    } 
                }else{ // no entries in collection
                    let itemsCountMap = new Map()
                    let items = newlist.items
                    for(let index in items){
                        itemsCountMap.set(items[index], 1)
                    }
                    let itemsCount = Object.fromEntries(itemsCountMap);
                    let payload = {
                        name: newlist.name,
                        itemsCount: itemsCount,
                        users: [newlist.ownerId],
                        likes: 0,
                        likedUsers: [],
                        dislikes: 0,
                        dislikedUsers: [],
                        views: 0,
                        comments: [],
                        publishDate: new Date()
                    };
                    let response = await api.createAggregates(payload)
                    if(response.data.success){
                        response = await api.getAllAggregates();
                        if(response.data.success){
                            return response.data.aggregates
                        }
                    }
                }
            }
        }catch (err){ // zero entries in collection
            let itemsCountMap = new Map()
            let items = newlist.items
            for(let index in items){
                itemsCountMap.set(items[index], 1)
            }
            let itemsCount = Object.fromEntries(itemsCountMap);
            let payload = {
                name: newlist.name,
                itemsCount: itemsCount,
                users: [newlist.ownerId],
                likes: 0,
                likedUsers: [],
                dislikes: 0,
                dislikedUsers: [],
                views: 0,
                comments: [],
                publishDate: new Date()
            };
            let response = await api.createAggregates(payload)
            if(response.data.success){
                response = await api.getAllAggregates();
                if(response.data.success){
                    return response.data.aggregates
                }
            }
        }
    }

    store.postComment = async function(id, comment) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;

            let comments = top5List.comments
            let newComment = [auth.user.userId, comment]
            comments.unshift(newComment)
            top5List.comments = comments
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    const list = store.currentLists.find(list => list._id === id)
                    list.comments = comments
                    storeReducer({
                        type: GlobalStoreActionType.LIKE_DISLIKE_LIST,
                        payload: {}
                    })
                }
            }
            updateList(top5List);
        }
    }

    store.postCommunityComment = async function(id, comment) {
        let response = await api.getAggregateById(id);
        if (response.data.success) {
            let aggregate = response.data.aggregate;

            let comments = aggregate.comments
            let newComment = [auth.user.userId, comment]
            comments.unshift(newComment)
            aggregate.comments = comments
            async function updateList(aggregate) {
                response = await api.updateAggregates(aggregate._id, aggregate);
                if (response.data.success) {
                    const list = store.communityLists.find(list => list._id === id)
                    list.comments = comments
                    storeReducer({
                        type: GlobalStoreActionType.LIKE_DISLIKE_LIST,
                        payload: {}
                    })
                }
            }
            updateList(aggregate);
        }
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            store.loadHomeLists();
            history.push("/home/");
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }
    store.likeList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;

            let user = auth.user.userId;
            let likeArray = top5List.likedUsers
            let likes = top5List.likes
            let dislikeArray = top5List.dislikedUsers
            let dislikes = top5List.dislikes
            if(likeArray.includes(user)){
                likeArray.pop(user)
                likes--;
            }else if(dislikeArray.includes(user)){
                likeArray.push(user);
                likes++;
                dislikeArray.pop(user)
                dislikes--;
            }else{
                likeArray.push(user);
                likes++;
            }
            top5List.likedUsers = likeArray;
            top5List.likes = likes;
            top5List.dislikes = dislikes;
            top5List.dislikedUsers = dislikeArray
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    const list = store.currentLists.find(list => list._id === id)
                    list.likedUsers = likeArray;
                    list.likes = likes;
                    list.dislikes = dislikes;
                    list.dislikedUsers = dislikeArray;
                    storeReducer({
                        type: GlobalStoreActionType.LIKE_DISLIKE_LIST,
                        payload: {}
                    })
                }
            }
            updateList(top5List);
        }
    }

    store.likeCommunityList = async function (id) {
        let response = await api.getAggregateById(id);
        if (response.data.success) {
            let aggregate = response.data.aggregate;

            let user = auth.user.userId;
            let likeArray = aggregate.likedUsers
            let likes = aggregate.likes
            let dislikeArray = aggregate.dislikedUsers
            let dislikes = aggregate.dislikes
            if(likeArray.includes(user)){
                likeArray.pop(user)
                likes--;
            }else if(dislikeArray.includes(user)){
                likeArray.push(user);
                likes++;
                dislikeArray.pop(user)
                dislikes--;
            }else{
                likeArray.push(user);
                likes++;
            }
            aggregate.likedUsers = likeArray;
            aggregate.likes = likes;
            aggregate.dislikes = dislikes;
            aggregate.dislikedUsers = dislikeArray
            async function updateList(aggregate) {
                response = await api.updateAggregates(aggregate._id, aggregate);
                if (response.data.success) {
                    const list = store.communityLists.find(list => list._id === id)
                    list.likedUsers = likeArray;
                    list.likes = likes;
                    list.dislikes = dislikes;
                    list.dislikedUsers = dislikeArray;
                    storeReducer({
                        type: GlobalStoreActionType.LIKE_DISLIKE_LIST,
                        payload: {}
                    })
                }
            }
            updateList(aggregate);
        }
    }

    store.dislikeCommunityLists = async function (id) {
        let response = await api.getAggregateById(id);
        if (response.data.success) {
            let aggregate = response.data.aggregate;

            let user = auth.user.userId;
            let likeArray = aggregate.likedUsers
            let likes = aggregate.likes
            let dislikeArray = aggregate.dislikedUsers
            let dislikes = aggregate.dislikes
            if(dislikeArray.includes(user)){
                dislikeArray.pop(user)
                dislikes--;
            }else if(likeArray.includes(user)){
                dislikeArray.push(user);
                dislikes++;
                likeArray.pop(user)
                likes--;
            }else{
                dislikeArray.push(user);
                dislikes++;
            }
            aggregate.likedUsers = likeArray;
            aggregate.likes = likes;
            aggregate.dislikes = dislikes;
            aggregate.dislikedUsers = dislikeArray
            async function updateList(aggregate) {
                response = await api.updateAggregates(aggregate._id, aggregate);
                if (response.data.success) {
                    const list = store.communityLists.find(list => list._id === id)
                    list.likedUsers = likeArray;
                    list.likes = likes;
                    list.dislikes = dislikes;
                    list.dislikedUsers = dislikeArray;
                    storeReducer({
                        type: GlobalStoreActionType.LIKE_DISLIKE_LIST,
                        payload: {}
                    })
                }
            }
            updateList(aggregate);
        }
    }

    store.dislikeList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;

            let user = auth.user.userId;
            let likeArray = top5List.likedUsers
            let likes = top5List.likes
            let dislikeArray = top5List.dislikedUsers
            let dislikes = top5List.dislikes
            if(dislikeArray.includes(user)){
                dislikeArray.pop(user)
                dislikes--;
            }else if(likeArray.includes(user)){
                dislikeArray.push(user);
                dislikes++;
                likeArray.pop(user)
                likes--;
            }else{
                dislikeArray.push(user);
                dislikes++;
            }
            top5List.likedUsers = likeArray;
            top5List.likes = likes;
            top5List.dislikes = dislikes;
            top5List.dislikedUsers = dislikeArray
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    const list = store.currentLists.find(list => list._id === id)
                    list.likedUsers = likeArray;
                    list.likes = likes;
                    list.dislikes = dislikes;
                    list.dislikedUsers = dislikeArray;
                    storeReducer({
                        type: GlobalStoreActionType.LIKE_DISLIKE_LIST,
                        payload: {}
                    })
                    console.log(store.currentLists)
                }
            }
            updateList(top5List);
        }
    }
    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if(auth.user !== null && top5List.ownerId === auth.user.userId){
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: top5List
            });
            history.push("/home/" + top5List._id);
            
            }       
            
        }
    }

    store.updateItem = function (index, newItem) {
        store.currentList.items[index] = newItem;
        store.updateCurrentList();
    }

    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
    }

    store.getListId = function (){
        let listId = history.location.pathname
        return listId.substring("/home/".length);
    }

    store.sortNewest = function () {
        if(store.pageType === "COMMUNITY"){
            let publishedLists = store.communityLists
            publishedLists.sort((first, second) => {
                if(first.publishDate > second.publishDate){
                    return -1
                }else if(first.publishDate < second.publishDate){
                    return 1;
                }else{
                    return 0
                }
            })
            storeReducer({
                type: GlobalStoreActionType.SORT_LISTS,
                payload: {
                    currentLists: store.currentLists,
                    sortType: GlobalStoreSortType.NEWEST,
                    communityLists: publishedLists
                }
            })
        }else{
            let publishedLists = store.currentLists.filter(list => list.published === true)
            let unpublishedLists = store.currentLists.filter(list => list.published === false)
            publishedLists.sort((first, second) => {
                if(first.publishDate > second.publishDate){
                    return -1
                }else if(first.publishDate < second.publishDate){
                    return 1;
                }else{
                    return 0
                }
            })
            let lists = []
            lists = publishedLists.concat(unpublishedLists)
            storeReducer({
                type: GlobalStoreActionType.SORT_LISTS,
                payload: {
                    currentLists: lists,
                    sortType: GlobalStoreSortType.NEWEST,
                    communityLists: store.commmunityLists
                }
            })

        }
    }
    store.sortOldest = function () {
        if(store.pageType === "COMMUNITY"){
            let publishedLists = store.communityLists
            publishedLists.sort((first, second) => {
                if(first.publishDate > second.publishDate){
                    return 1
                }else if(first.publishDate < second.publishDate){
                    return -1;
                }else{
                    return 0
                }
            })
            storeReducer({
                type: GlobalStoreActionType.SORT_LISTS,
                payload: {
                    currentLists: store.currentLists,
                    sortType: GlobalStoreSortType.OLDEST,
                    communityLists: publishedLists
                }
            })
        }else{
            let publishedLists = store.currentLists.filter(list => list.published === true)
            let unpublishedLists = store.currentLists.filter(list => list.published === false)
            publishedLists.sort((first, second) => {
                if(first.publishDate > second.publishDate){
                    return 1
                }else if(first.publishDate < second.publishDate){
                    return -1;
                }else{
                    return 0
                }
            })
            let lists = publishedLists.concat(unpublishedLists)
            storeReducer({
                type: GlobalStoreActionType.SORT_LISTS,
                payload: {
                    currentLists: lists,
                    sortType: GlobalStoreSortType.OLDEST,
                    communityLists: store.commmunityLists
                }
            })

        }
    }
    store.sortViews = function() {
        if(store.pageType === "COMMUNITY"){
            let lists = store.communityLists
            lists.sort((first, second) => {
                if(first.views > second.views){
                    return -1
                }else if(first.views < second.views){
                    return 1;
                }else{
                    return 0
                }
            })
            storeReducer({
                type: GlobalStoreActionType.SORT_LISTS,
                payload: {
                    currentLists: store.currentLists,
                    sortType: GlobalStoreSortType.VIEWS,
                    communityLists: lists
                }
            })
        }else{
            let lists = store.currentLists
            lists.sort((first, second) => {
                if(first.views > second.views){
                    return -1
                }else if(first.views < second.views){
                    return 1;
                }else{
                    return 0
                }
            })
            storeReducer({
                type: GlobalStoreActionType.SORT_LISTS,
                payload: {
                    currentLists: lists,
                    sortType: GlobalStoreSortType.VIEWS,
                    communityLists: store.communityLists
                }
            })
        }
    }
    store.sortLikes = function(){
        if(store.pageType === "COMMUNITY"){
            let lists = store.communityLists
            lists.sort((first, second) => {
                if(first.likes > second.likes){
                    return -1
                }else if(first.likes < second.likes){
                    return 1;
                }else{
                    return 0
                }
            })
            storeReducer({
                type: GlobalStoreActionType.SORT_LISTS,
                payload: {
                    currentLists: lists,
                    sortType: GlobalStoreSortType.LIKE,
                    communityLists: lists
                }
            })
        }else{
            let lists = store.currentLists
            lists.sort((first, second) => {
                if(first.likes > second.likes){
                    return -1
                }else if(first.likes < second.likes){
                    return 1;
                }else{
                    return 0
                }
            })
            storeReducer({
                type: GlobalStoreActionType.SORT_LISTS,
                payload: {
                    currentLists: lists,
                    sortType: GlobalStoreSortType.LIKE,
                    communityLists: store.communityLists
                }
            })
        }
    }
    store.sortDislikes = function(){
        if(store.pageType === "COMMUNITY"){
            let lists = store.communityLists
            lists.sort((first, second) => {
                if(first.dislikes > second.dislikes){
                    return -1
                }else if(first.dislikes < second.dislikes){
                    return 1;
                }else{
                    return 0
                }
            })
            storeReducer({
                type: GlobalStoreActionType.SORT_LISTS,
                payload: {
                    currentLists: store.currentLists,
                    sortType: GlobalStoreSortType.DISLIKE,
                    communityLists: lists
                }
            })
        }else{
            let lists = store.currentLists
            lists.sort((first, second) => {
                if(first.dislikes > second.dislikes){
                    return -1
                }else if(first.dislikes < second.dislikes){
                    return 1;
                }else{
                    return 0
                }
            })
            storeReducer({
                type: GlobalStoreActionType.SORT_LISTS,
                payload: {
                    currentLists: lists,
                    sortType: GlobalStoreSortType.DISLIKE,
                    communityLists: store.communityLists
                }
            })
        }
    }

    store.goToAllLists = async function() {
        await store.loadDefaultAllLists();
        history.push("/alllists/")
    }
    store.goToHome = async function() {
        await store.loadHomeLists();
        history.push("/home/")
    }
    store.goToCommunity = async function(){
        history.push("/community/")
        await store.loadCommunityLists();
    }
    store.goToUser = function() {
        storeReducer({
            type: GlobalStoreActionType.CHANGE_PAGE,
            payload: {
                currentLists: [],
                pageType: GlobalStorePageType.USERS,
                communityLists: store.communityLists
            }
        });
        history.push("/users/")
    }
    
    store.searchLists = async function (search) {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let top5Lists = response.data.top5Lists;
            let publishedLists = top5Lists.filter(list => list.published === true);
            let searchedLists = publishedLists.filter(list => list.name.toLowerCase() === search.toLowerCase())
            searchedLists.sort((first, second) => {
                if(first.updatedDate > second.updatedDate){
                    return -1;
                }else if(first.updatedDate < second.updatedDate){
                    return 1
                }else{
                    return 0
                }
            })
            storeReducer({
                type: GlobalStoreActionType.SEARCH_LISTS,
                payload:{
                    currentLists: searchedLists,
                    searched: search
                }
            })
        }
    }

    store.searchStartWith = async function (search) {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let top5Lists = response.data.top5Lists;
            let publishedLists = top5Lists.filter(list => list.published === true);
            let searchedLists = publishedLists.filter(list => list.name.toLowerCase().startsWith(search.toLowerCase()))
            if(store.paheType === "COMMUNITY"){
                searchedLists.sort((first, second) => {
                    if(first.updatedDate > second.updatedDate){
                        return -1;
                    }else if(first.updatedDate < second.updatedDate){
                        return 1
                    }else{
                        return 0
                    }
                })
            }else{
                searchedLists.sort((first, second) => {
                    if(first.creationDate > second.creationDate){
                        return -1;
                    }else if(first.creationDate < second.creationDate){
                        return 1
                    }else{
                        return 0
                    }
                })
            }
            storeReducer({
                type: GlobalStoreActionType.SEARCH_LISTS,
                payload:{
                    currentLists: searchedLists,
                    searched: search
                }
            })
        }
    }

    store.searchStartWithHome = async function (search) {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.top5Lists;
            let ownedLists = pairsArray.filter(list => list.ownerId === auth.user.userId);
            let searchedLists = ownedLists.filter(list => list.name.toLowerCase().startsWith(search.toLowerCase()))
            storeReducer({
                type: GlobalStoreActionType.SEARCH_LISTS,
                payload:{
                    currentLists: searchedLists,
                    searched: search
                }
            })
        }
    }

    store.searchUsers = async function (search) {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let top5Lists = response.data.top5Lists;
            let published = top5Lists.filter(list => list.published === true)
            let searchedLists = published.filter(list => list.ownerId === search)
            storeReducer({
                type: GlobalStoreActionType.SEARCH_LISTS,
                payload:{
                    currentLists: searchedLists,
                    searched: search
                }
            })
        }
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };