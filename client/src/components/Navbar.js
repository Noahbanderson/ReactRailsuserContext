import React, {useEffect, useState, useContext} from 'react'  
import { NavLink } from "react-router-dom"
import { Menu } from "semantic-ui-react"
import { UsersContext } from "../providers/UsersProvider";

import Axios from 'axios';


const Navbar = () => {
  const {cUser} = useContext(UsersContext)
  const [user, setuser] = useState({})

  // const id = localStorage.getItem("user")

  
  useEffect(()=> {
    if (cUser) {
      Axios.get(`/api/users/${cUser}`)
        .then(res => {
          setuser(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }

  },[cUser])




  return (
    <Menu>
      <NavLink to="/">
        <Menu.Item>
          Home
        </Menu.Item>
      </NavLink>
      <NavLink to="/users">
        <Menu.Item>
          Users
        </Menu.Item>
      </NavLink>
      {cUser !== 0 ? 
        <NavLink to={`/users/${cUser}`}>
          <Menu.Item>
            {user.first_name} {user.last_name}
          </Menu.Item>
        </NavLink>
      : 
        ""
      }

    </Menu>
  )
}

export default Navbar