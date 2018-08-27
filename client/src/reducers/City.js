const INITIAL_STATE = 'Choose city';

export default (state = INITIAL_STATE, action) => {
    //initial_state sebagai default value dan hanya berjalan pertama kali
    switch (action.type){
        case 'selected_city':
            return action.payload;
        default:
            return state;
            //state terakhir atau sebelumnya
    }
}