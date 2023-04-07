import React, { useState } from "react";
import Form from "./components/Form";
import "./App.css";

function App() {
  const [kullanicilar, setKullanicilar] = useState([]);

  const handleNewUser = (userData) => {
    setKullanicilar([...kullanicilar, userData]);
  };

  const handleDeleteUser = (userId) => {
    setKullanicilar(kullanicilar.filter(user => user.id !== userId));
  }

  return (
    <div className="App">
      
      <Form onNewUser={handleNewUser} />
   
      <h2>Kullanıcılar</h2>
      <div className="users">
        {kullanicilar.map((user, index) => (
          <div className="user-card">
            <div className="veri"><div className="veri-tipi">Ad Soyad:</div> <div className="data">{user.isim} {' '} {user.soyisim}</div></div>
            <div className="veri"><div className="veri-tipi">Email:</div> <div className="data">{user.email}</div></div>
            <div className="veri"><div className="veri-tipi">Şifre:</div> <div className="data">{user.sifre}</div></div>
            <div><button className="delete-button" onClick={() => handleDeleteUser(user.id)}>Sil</button></div>
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;
