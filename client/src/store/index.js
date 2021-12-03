import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

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
    SEARCH_LISTS: "SEARCH_LISTS"
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
        searched: ""
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
                    searched: store.searched
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
                    searched: store.searched
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
                    searched: store.searched
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
                    searched: store.searched
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
                    searched: store.searched
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
                    searched: store.searched
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
                    searched: store.searched
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
                    searched: ""
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
                    searched: store.searched
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
                    searched: payload.searched
                })
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

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
                            storeReducer({
                                type: GlobalStoreActionType.SAVE_PUBLISH_LIST,
                                payload: {
                                    currentLists: ownedLists,
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
                }
            });
        }
    }

    store.loadCommunityLists = async function () {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let top5Lists = response.data.top5Lists;
            let publishedLists = top5Lists.filter(list => list.published === true);
            publishedLists.sort((first, second) => {
                if(first.updatedDate > second.updatedDate){
                    return -1;
                }else if(first.updatedDate < second.updatedDate){
                    return 1
                }else{
                    return 0
                }
            })
            storeReducer({
                type: GlobalStoreActionType.CHANGE_PAGE,
                payload: {
                    currentLists: publishedLists,
                    pageType: GlobalStorePageType.COMMUNITY,
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
                }
            });
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
        let lists = publishedLists.concat(unpublishedLists)
        storeReducer({
            type: GlobalStoreActionType.SORT_LISTS,
            payload: {
                currentLists: lists,
                sortType: GlobalStoreSortType.NEWEST
            }
        })
    }
    store.sortOldest = function () {
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
                sortType: GlobalStoreSortType.NEWEST
            }
        })
    }
    store.sortViews = function() {
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
                sortType: GlobalStoreSortType.NEWEST
            }
        })
    }
    store.sortLikes = function(){
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
                sortType: GlobalStoreSortType.NEWEST
            }
        })
    }
    store.sortDislikes = function(){
        let lists = store.currentLists
        lists.sort((first, second) => {
            console.log(first.dislikes)
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
                sortType: GlobalStoreSortType.NEWEST
            }
        })
    }

    store.goToAllLists = async function() {
        history.push("/alllists/")
    }
    store.goToHome = function() {
        history.push("/home/")
    }
    store.goToCommunity = function(){
        history.push("/community/")
    }
    store.goToUser = async function() {
        storeReducer({
            type: GlobalStoreActionType.CHANGE_PAGE,
            payload: {
                currentLists: [],
                pageType: GlobalStorePageType.USERS,
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
            searchedLists.sort((first, second) => {
                if(first.creationDate > second.creationDate){
                    return -1;
                }else if(first.creationDate < second.creationDate){
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