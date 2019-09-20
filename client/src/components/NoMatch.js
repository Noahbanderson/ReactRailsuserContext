import React from 'react'
import {Header, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'


const NoMatch = () => (
  <div style={styles.container}> 
    <Header style={styles.header} as="h1"> Oops! </Header>
    <br />
    <Header style={styles.header} as="h1">Error: 404 - No Match</Header>
    <br />
    <Header as="h3"> You Found A Broken Link</Header>
  
    <Link to="/">
      <Button color="black">Home</Button>
    </Link>
  </div>
)

const styles ={
  container: { display: "flex", flexDirection: "column", alignItems: "center"},
  header: { fontSize: "50px"}
}


export default NoMatch