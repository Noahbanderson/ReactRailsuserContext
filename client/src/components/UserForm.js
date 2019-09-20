import React, { useState, useEffect, useContext } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { UsersContext } from "../providers/UsersProvider";
import axios from 'axios'


const UserForm = (props) => {
  // const [values, ] = usePet(callback(pet))
  const [firstName, setfirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [email, setemail] = useState("")
  const [bday, setbday] = useState("")

  const {userList, setuserList} = useContext(UsersContext);
  
  const updateUserList = () => {
    if (props.match.params.id) {
      axios.put(`/api/users/${props.match.params.id}`, {first_name: firstName, last_name: lastName, email, bday})
      .then( res => {
        setuserList([...userList.filter(user => user.id !== res.data.id), res.data]) 
      })
      .catch( err => {
        console.log(err)
      })

    } else {
      axios.post("/api/users", {first_name: firstName, last_name: lastName, email, bday})
        .then( res => {
          setuserList([...userList, res.data])
        })
        .catch( err => {
          console.log(err)
        })
    }

    props.history.push("/users")
    
  }


  useEffect(() => {
      axios.get(`/api/users/${props.match.params.id}`)
        .then(res => {
          const {first_name, last_name, email, bday } = res.data
          setfirstName(first_name)
          setlastName(last_name)
          setemail(email)
          setbday(bday)
        })
        .catch( err => {
          console.log(err)
        })
    
  }, [props.match.params.id]) //! WHY DOES IT WANT THIS HERE??




  return (
    <Form onSubmit={updateUserList}>
      <Form.Group>
        <Form.Input
          required
          type="text"
          name="firstName"
          value={firstName}
          label="First Name"
          placeholder="First Name"
          onChange={(e) => setfirstName(e.target.value)}
        />
        <Form.Input
          required
          type="text"
          name="lastName"
          value={lastName}
          label="Last Name"
          placeholder="Last Name"
          onChange={(e) => setlastName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Input
          required
          type="text"
          name="email"
          value={email}
          label="Email"
          placeholder="Email"
          onChange={(e) => setemail(e.target.value)}
        />
        <Form.Input
          required
          type="date"
          name="bday"
          value={bday}
          label="Birth Date"
          placeholder="Birth Date"
          onChange={(e) => setbday(e.target.value)}
        />
      </Form.Group>
      <Button  color="green">Submit</Button>
    </Form>
  )
}


export default UserForm 