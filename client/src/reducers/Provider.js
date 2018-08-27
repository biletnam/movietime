const INITIAL_STATE = 'Choose provider';

export default (state = INITIAL_STATE, action) => {
    //initial_state sebagai default value dan hanya berjalan pertama kali
    switch (action.type){
        case 'selected_provider':
            return action.payload;
        default:
            return state;
            //state terakhir atau sebelumnya
    }
}