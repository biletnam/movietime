export const city = (parameterKu) => {
    return {
        type: 'selected_city',
        payload: parameterKu
    };
};

export const provider = (parameterKu) => {
    return {
        type: 'selected_provider',
        payload: parameterKu
    };
};

export const cinema = (parameterKu) => {
    return {
        type: 'selected_cinema',
        payload: parameterKu
    };
};

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

export const cookie = (parameterKu) => {
    return {
        type: 'cookie',
        payload: parameterKu
    };
};

export const email = (parameterKu) => {
    return {
        type: 'gantiEmail',
        payload: parameterKu
    };
};

export const password = (parameterKu) => {
    return {
        type: 'gantiPassword',
        payload: parameterKu
    };
};

//hasil return dari action creator masuk ke semua reducers