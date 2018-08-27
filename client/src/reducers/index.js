import { combineReducers } from 'redux';
import Cinema from './Cinema';
import Provider from './Provider';
import City from './City';
import Movie1 from './Movie1';
import Movie2 from './Movie2';
import Movie3 from './Movie3';
import Email from './Email'
import Password from './Password'

export default combineReducers({
    //test: () => 'Hello Bro',
    cinema: Cinema,
    provider: Provider,
    city: City,
    movie1: Movie1,
    movie2: Movie2,
    movie3: Movie3,
    email: Email,
    password: Password
    //satu props satu reducers
});