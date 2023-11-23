import { useEffect, useState } from 'react'
import './App.css'
import User from './components/user'
import AddUser from './components/AddUser'
import axios from 'axios'

const baseURL = 'https://jsonplaceholder.typicode.com/users'

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
   fetchData()
  }, [])

  const fetchData =  () => {
     axios.get(baseURL)
    .then((res) => setUsers(res.data))
    .catch((err) => {
      console.log(err)
    })

    console.log(users);
  }
  const onAdd = (name, email) => {
        axios.post(baseURL, 
           {
            name: name,
            email: email
          },
        )
        .then((res) => {
          setUsers((users) => [...users, res.data])
        })
        .catch((err) => {
          console.log(err);
        })

  }

    const onEdit = (id) => {
        axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, 
           {
            name: "Name is Updated",
            email: "Email is Updated"
          },
        )
        .then((res) => {
          setUsers((users) => [...users, res.data])
        })
        .catch((err) => {
          console.log(err);
        })

  }

   const onDelete = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
  
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
        <User id={user.id} key={user.id} name={user.name} email={user.email} onDelete={onDelete} onEdit={onEdit}/>
      ))
     }
    </div>
  )
}

export default App
