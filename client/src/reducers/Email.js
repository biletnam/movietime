const INITIAL_STATE = 'youremail';

export default (state = INITIAL_STATE, action) => {
    //initial_state sebagai default value dan hanya berjalan pertama kali
    switch (action.type){
        case 'gantiEmail':
            return action.payload;
        default:
            return state;
            //state terakhir atau sebelumnya
    }
}