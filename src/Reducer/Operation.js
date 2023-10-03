const initialState = {
    users: [],
    isLoading: false,
    error: null,
}
const AddingTheUser = (state = initialState, action) => {
    // console.log("updatedItems")
    switch (action.type) {
        case "FETCH_DATA_REQUEST":
            // console.log("request");
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case "FETCH_DATA_SUCCESS":
            // console.log("request2", action);
            return {
                ...state,
                users : action.payLoad,
                isLoading: false,
                error: null,
            };
        case "FETCH_DATA_FAILURE":
            // console.log("request3");
            return {
                ...state,
                users: [],
                isLoading: false,
                error: action.payLoad,
            };
        case "ADD-USER": {
            console.log("hete", action)
            return {
                ...state,
                users: [...state.users, action.payLoad],
            };
        }
        case "DELETE-USER": {
            // console.log("HERE", action);
            const updatedItems = state.users.filter((item) => item.id !== action.payLoad);
            console.log(updatedItems);
            return {
                ...state,
                users: updatedItems,
            }
        }
        case "UPDATE-USER": {
            console.log("HERE UPDATE", action.payLoad)
            const updatedItems = state.users.map((item) => item.id === action.payLoad.id ? { ...item, ...action.payLoad.details } : item);
            return {
                ...state,
                users: updatedItems,
            };
        }
        default: return state;
    }
}
export default AddingTheUser;