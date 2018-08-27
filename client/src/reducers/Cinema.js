const INITIAL_STATE = 'Choose Cinema';

export default (state = INITIAL_STATE, action) => {
    //initial_state sebagai default value dan hanya berjalan pertama kali
    switch (action.type){
        case 'selected_cinema':
            return action.payload;
        default:
            return state;
            //state terakhir atau sebelumnya
    }
}