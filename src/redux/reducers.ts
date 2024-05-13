const initialState = {
    userData:{}
}

function reducer(state = initialState, action: any) {
    switch (action.type) {
        case 'Set_User':return {
            ...state,
            userData: action.payload,
        }
        default: return state;
    }
}

export { reducer };
