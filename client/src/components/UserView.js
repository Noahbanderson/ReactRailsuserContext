import React,{useEffect, useState, useContext} from 'react'
import {Segment, Header, Button, Card} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { UsersContext } from "../providers/UsersProvider";

const UserView = (props) => {
  const {setcUser} = useContext(UsersContext)
  const [user, setuser] = useState({})
  const [pets, setpets] = useState([])

  useEffect(() => {
    
    axios.get(`/api/users/${props.match.params.id}`)
      .then(res => {
        setuser(res.data)
      })
      .catch( err => {
        console.log(err)
      })
    
    axios.get(`/api/users/${props.match.params.id}/pets`)
      .then(res => {
        setpets(res.data)
        setcUser(props.match.params.id)
      })
      .catch( err => {
        console.log(err)
      })


        return () => {
          
        }


    }, [pets]) //!!  RIGHT HERE why does it want props.match.params.id // but if i do, it won't update pet upon update


    const renderPets = () => {
      if (pets.length === 0){
        return <Header as="h2">No pets</Header>
      } else {
        return pets.map(pet => (
          <Card key={pet.id}>
            <Card.Content>
              <Card.Header>{pet.name}</Card.Header>
              <Card.Meta>{pet.species}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <Button as={Link} size="mini" color="blue" to={`/users/${props.match.params.id}/pets/${pet.id}/edit`}>Edit</Button> 
              <Button size="mini" color="red" onClick={() => deletePet(pet.id)}>Delete</Button>
            </Card.Content>
          </Card>
      ))
      }
    }

    const deletePet = (id) => {
      axios.delete(`/api/users/${props.match.params.id}/pets/${id}`)
      .then( res => {
        setpets(pets.filter( pet => pet.id !== id))
      })
      .catch( err => {
        console.log(err)
      })
    }


  return (
    <div>
      <Segment>
        <Header as="h1"> {user.first_name} {user.last_name} </Header>
        <Header as="h3"> {user.email} </Header>
        <Header as="h5" color="grey"> {user.bday} </Header>
      </Segment>
      <br />
      <br />
      <div> 
        <Button onClick={props.history.goBack} color="black">Back</Button>
        <Button as={Link} to={`/users/${props.match.params.id}/edit`} color="blue">Edit</Button>
      </div>
      <br />
      <hr />
      <br />
        <Header as="h2">{user.first_name}'s Pets</Header>
      <br />
      <br />
      <Button as={Link} to={`/users/${props.match.params.id}/pets/new`} color="green">New Pet</Button>
      <br />
      <br />
      <Card.Group>
        {renderPets()}
      </Card.Group>

    </div>
  )
}

export default UserView