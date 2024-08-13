import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import Users from './Components/Users';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useNavigate } from "react-router-dom";


function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  // Chart:
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(users.length);
  }, [users]);


  // GET:
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        return setUsers(json)
      })
  }, [])

  // POST operation:
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");

  function addUser() {
    const name = newName.trim();
    const email = newEmail.trim();
    const website = newWebsite.trim();

    if (name && email && website) {
      fetch('https://jsonplaceholder.typicode.com/users',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            website: website
          })
        }
      )
        .then((response) => {
          console.log("newItems", response)
          return response.json();
        })
        .then((json) => {
          setUsers([...users, json])
          // alert("New Data Posted")
          setNewName("");
          setNewEmail("");
          setNewWebsite("");
        })
    }
  }

  function notifyDelete() {
    toast.success("User Deleted", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });
  }

  function notify() {
    toast.success("User Added Successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });
  }


  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form Submitted")
    notify();
  }

  // DELETE:
  function handleDelete(id) {
    notifyDelete();
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "DELETE"
      }
    )
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        return setUsers((users) => {
          return users.filter((i) => {
            return i.id !== id
          })
        })
      })
  }

  // Login:
  const navigate = useNavigate();
  function handleLoginSubmit() {
    console.log("Login Form Submitted")
    if (username !== "" && pwd !== "") {
      navigate('/dashboard')
    }
  }


  return (
    <div className="App">
      <div className="appContainer">
        <Routes>
          <Route path="/" element={<Login username={username} setUsername={setUsername} pwd={pwd} setPwd={setPwd} handleLoginSubmit={handleLoginSubmit} />} />
          <Route path="/dashboard" element={<Users users={users} setUsers={setUsers} newName={newName} setNewName={setNewName} newEmail={newEmail} setNewEmail={setNewEmail} newWebsite={newWebsite} setNewWebsite={setNewWebsite} handleSubmit={handleSubmit} addUser={addUser} handleDelete={handleDelete} count={count} setCount={setCount} />} />
          <Route path="*" element={"Invalid URL"} />
        </Routes>
        <ToastContainer />
      </div>

    </div>
  );
}

export default App;
