import React, { Component } from 'react';
import '../style/Admin.css';

import axios from 'axios';

class Admin extends Component {
    masuk(){
        // console.log(`Sukses jalankan fungsi masuk`)
        var url = 'http://localhost:5001/adminlogin';
        axios.post(url, {
          username: this.refs.usernameadmin.value,
          password: this.refs.passwordadmin.value,
        })
        .then((response) => {
            console.log(`tessttt`)
            //   console.log(response);
        //   if (response.data.kode == '001'){
        //     console.log(`Admin berhasil login`)
        //   }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
    render() {
    return (
      <div className="Admin">
        <h1>Dashboard Admin</h1><br /><br />
        <input ref='usernameadmin' type='text' placeholder='Masukkan username' /><br /><br />
        <input ref='passwordadmin' type='password' placeholder='Masukkan password' /><br /><br />
        <button onClick={()=>{this.masuk()}}>Masuk</button>
      </div>
    );
  }
}

export default Admin;
