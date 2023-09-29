const initialState = {
    users: []
}
const AddingTheUser = (state = initialState, action) => {
    switch(action.type){
        case "ADD-USER" :  {
            return {
                ...state,
                users: [...state.users, action.payLoad],
            };
        }
        case "DELETE-USER" : {
            console.log("HERE", action.index)
            const updatedItems = state.users.filter((item, index) => index !== action.index);
            // console.log(updatedItems);
            return{
                ...state,
                users: updatedItems,
            }
        }
        case "UPDATE-USER" : {
            console.log("HERE", action.payLoad)
            const updatedItems = state.users.map((item, index) => index === action.payLoad.id ? { ...item, ...action.payLoad.details } : item);
            return {
                ...state,
                users: updatedItems,
            };  
        }
        default : return state;
    }
}
export default AddingTheUser;
// let { name, email, dob} = action.payload;
// let userDetails = {
//     name: name,  
//     email : email,
//     dob : dob,
// }