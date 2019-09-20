import React, { useState, useEffect } from 'react'
import { Form, Button } from 'semantic-ui-react'
import axios from 'axios'


const PetForm = (props) => {
  // const [values, ] = usePet(callback(pet))
  const [name, setname] = useState("")
  const [species, setspecies] = useState("")

  useEffect(() => {
    axios.get(`/api/users/${props.match.params.id}/pets/${props.match.params.pet_id}`)
      .then(res => {
        const {name, species} = res.data
        setname(name)
        setspecies(species)
      })
      .catch(err => {
        console.log(err)
      })
  }, [props.match.params.id, props.match.params.pet_id])


  
  const newPet = () => {
    if (props.match.params.id){
      axios.put(`/api/users/${props.match.params.id}/pets/${props.match.params.pet_id}`, {name, species})
        .then( res => {
        })
        .catch(err => {
          console.log(err)
        })

    } else { 
    axios.post(`/api/users/${props.match.params.id}/pets`, {name, species})
      .then( res => {
      })
      .catch( err => {
        console.log(err)
      })
    }

    props.history.push(`/users/${props.match.params.id}`)
  }

  return (
    <Form onSubmit={newPet}>
      <Form.Group>
        <Form.Input
          required
          type="text"
          name="name"
          value={name}
          label="Name"
          placeholder="Name"
          onChange={(e) => setname(e.target.value)}
        />
        <Form.Input
          required
          type="text"
          name="species"
          value={species}
          label="Species"
          placeholder="Species"
          onChange={(e) => setspecies(e.target.value)}
        />
      </Form.Group>
      <Button color="green">Submit</Button>
    </Form>
  )
}


export default PetForm 