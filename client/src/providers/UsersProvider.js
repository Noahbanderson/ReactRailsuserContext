import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const UsersContext = React.createContext()

const UsersProvider = (props) => {
  const [userList, setuserList] = useState([])
  const [cUser, setcUser] = useState(0)
  // const [newUserFn, setnewUserFn] = useState("") // ? how do i pass down a function?

  useEffect(() => {
    axios.get("/api/users")
      .then(res => {
        setuserList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },[])

  // useEffect( () => {
  //   debugger
  // },[userList])


  // ? how do I use useEffect to update state?
  
  
  return (
    <UsersContext.Provider value={{userList, setuserList, cUser, setcUser}}>
      {props.children}
    </UsersContext.Provider>
  )
  
}

export default UsersProvider




























// class UsersProvider extends React.Component {

//   state = {userList: []}

//   componentDidMount() {
//     axios.get("/api/users")
//       .then(res => {
//         this.setState({userList: res.data})
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }


//   render() {
//     return (
//       <UsersContext.Provider value={this.state}>
//         {this.props.children}
//       </UsersContext.Provider>
//     )
//   }

// }
