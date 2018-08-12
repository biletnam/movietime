import React, { Component } from 'react';
import './App.css';

// Components
import AppInit from './AppInit';

import { Provider } from 'react-redux';
//semua yang dibungkus provider bisa mengakses global state
//provider fungsinya membuat store

import { createStore, applyMiddleware } from 'redux';
//store adalah ruang yg membungkus reducers dan state
//guna middleware: 
// agar kita dapa menentukan kapan mau kirim action
// bisa mereturn action lebih dari 1 kali (dispacth)

import reducers from './reducers';

import ReduxThunk from 'redux-thunk';
//untuk memnggunakan middleware

class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    // paramater kedua untuk reload state
    // middleware terletak di parameter ketiga

    return (
        <Provider store={store}>
          <AppInit />
        </Provider>
    );
  }
}

export default App;
