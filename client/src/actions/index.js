export const movie1 = (parameterKu) => {
    return {
        type: 'movie_1',
        payload: parameterKu
    };
};

export const movie2 = (parameterKu) => {
    return {
        type: 'movie_2',
        payload: parameterKu
    };
};

export const movie3 = (parameterKu) => {
    return {
        type: 'movie_3',
        payload: parameterKu
    };
};

//hasil return dari action creator masuk ke semua reducers