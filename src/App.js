import React,{useEffect,useState } from 'react';
import './App.css';
import Card from './Components/Card';
import axios from 'axios';
import Spinner from './Components/Spiner';
import users from './Components/users.jfif';

function App() {
  const [cardData, setData] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const allData = async () => {
    if (visibility) {
      const res = await axios.get("https://reqres.in/api/users?page=2");
      const delay = 5000;
      await new Promise((resolve) => setTimeout(resolve, delay));
      setData(res.data.data);
    }
    setLoading(false);
  };
  const display = () => {
    setVisibility(true);
    setLoading(true);
  };
  useEffect(() => {
    if (visibility) {
      allData();
    }
  },);
  const renderCard = (user) => {
    if (loading) return Spinner;
    else {
      return (
        <Card userName = {user.first_name}
          userLast = {user.last_name}
          userEmail= {user.email}
          avatar = {user.avatar}
        />
      );
    }
  };
  return (
    <>
    <div className="Navbar">
      <img src={users} alt="Users"/>
      <h1>LetsGrowMore
      </h1>
      <button onClick={display}>Get Users</button>
    </div>
     {loading ? <Spinner /> : null}
      <div>
        {loading ? null : cardData.map(renderCard)}
      </div>
    </>
  );
}

export default App;
