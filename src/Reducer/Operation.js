const initialState = {
    users: []
}
const AddingTheUser = (state = initialState, action) => {
    switch(action.type){
        case "ADD-USER" :  {
            // console.log("inside Reducer", action.payLoad)
            return {
                ...state,
                users: [...state.users, action.payLoad],
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