import React, { useContext, useEffect } from "react"   
import { Header, Card, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { UsersContext } from "../providers/UsersProvider";
import axios from "axios";

const Users = () => {
  const {setcUser ,setuserList, userList} = useContext(UsersContext);
 
  useEffect(()=> {
    setcUser(0)
  },[])

  const renderUsers = () => {
    if (userList.length === 0){
      return <Header as="h2">No users</Header>
    } else {
      
      return userList.map(user => (
        <Card key={user.id}>
          <Card.Content>
            <Card.Header>{user.first_name} {user.last_name}</Card.Header>
            <Card.Meta>{user.email}</Card.Meta>
            <Card.Description>B-Day: {user.bday}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button as={Link} size="mini" color="blue" to={`/users/${user.id}`}>View</Button>
            <Button size="mini" color="red" onClick={() => deleteUser(user.id)}>Delete</Button>
          </Card.Content>
        </Card>
    ))
    }
    
  }

  const deleteUser = (id) => {

    axios.delete(`/api/users/${id}`)
      .then( res => {
        setuserList(userList.filter( user => user.id !== id))
      })
      .catch( err => {
        console.log(err)
      })
  
    
  }


  return (
    <div>
      <Header as="h1">Users</Header>
      <br />
      <Link to="/users/new">
        <Button color="green">New User</Button>
      </Link>
      <br />
      <br />
      <Card.Group>
        {renderUsers()}
      </Card.Group>
    </div>

  )
}

export default Users



// setuList(userList)
// if (uList.length === 0)
//   return <Header as="h2">No users</Header>
// return uList.map(user => (
//   <Card key={user.id}>
//     <Card.Content>
//       <Card.Header>{user.first_name} {user.last_name}</Card.Header>
//       <Card.Meta>{user.email}</Card.Meta>
//       <Card.Description>B-Day: {user.bday}</Card.Description>
//     </Card.Content>
//     <Card.Content extra>
//       <Button as={Link} size="mini" color="blue" to={`/users/${user.id}`}>View</Button>
//       <Button size="mini" color="red" onClick={() => deleteUser(user.id)}>Delete</Button>
//     </Card.Content>
//   </Card>
// ))