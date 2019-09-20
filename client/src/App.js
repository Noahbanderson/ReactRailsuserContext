import React from 'react';
import {Container} from 'semantic-ui-react'
import Navbar from './components/Navbar'
import {Switch, Route } from "react-router-dom"
import UserList from './components/UserList'
import UserView from './components/UserView'
import UserForm from './components/UserForm'
import PetForm from './components/PetForm'
import NoMatch from './components/NoMatch'

const App = () => {

  return (
    <>
      <Navbar />
      <Container style={{marginTop: "35px"}}>
        <Switch>
          <Route exact path="/" render={() => <div>Home</div>} />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/users/new" component={UserForm} />
          <Route exact path="/users/:id" component={UserView} />
          <Route exact path="/users/:id/edit" component={UserForm} />
          <Route exact path="/users/:id/pets/new" component={PetForm} />
          <Route exact path="/users/:id/pets/:pet_id/edit" component={PetForm} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
    </>
  )
}

export default App;
