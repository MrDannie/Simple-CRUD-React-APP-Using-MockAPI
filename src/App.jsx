import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import User from './components/user'
import AddUser from './components/AddUser'

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
   fetchData()
  }, [])

  const fetchData = async () => {
    await fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((data) => setUsers(data))
    .catch((err) => {
      console.log(err)
    })

    console.log(users);
  }
  const onAdd = async (name, email) => {
        await fetch('https://jsonplaceholder.typicode.com/users', {
          method: "POST",
          body: JSON.stringify({
            name:name,
            email: email
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          }
        })
        .then((res) => {
          if(res.status !== 201) {
            return
          } else {
            return res.json()
          }
        })
        .then((data) => {
          setUsers((users) => [...users, data])
        })
        .catch((err) => {
          console.log(err);
        })

  }

   const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='App'>

     <h3> Simple React CRUD App Using Mock API</h3>
     <br />
     <AddUser onAdd={onAdd}/>
     {
      users.map((user) => (
        <User id={user.id} key={user.id} name={user.name} email={user.email} onDelete={onDelete}/>
      ))
     }
    </div>
  )
}

export default App
