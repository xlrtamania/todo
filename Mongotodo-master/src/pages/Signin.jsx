import { Image, Form, Segment, Grid, Label, Container } from "semantic-ui-react";
import logo from "../assets/logo.png"
import "./Signin.css"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services";


export function Signin() {
  const [user,setUser]=useState({})
  const navigate=useNavigate()
  const handleChange = (e, { name, value }) => setUser({ ...user,[name]: value })
  const handleSubmit=async()=>{
    await login(user)
    navigate("/")
  }
  return (
    <>
      <div id="animation">      
        <br /><br />
        <Grid centered>
          <Grid.Column width={8}>
            <Segment padded>
              <h1>Welcome back</h1>
              <Image src={logo} size="medium" centered />
              <Form widths="equal" onSubmit={handleSubmit}>

                <Form.Input fluid label='Email'
                  placeholder='Enter email'                  
                  required
                  name="email"
                  onChange={handleChange} />

                <Form.Input fluid
                  type='password'
                  label='Password'
                  placeholder='Enter Password'
                  required
                  name="password"
                  onChange={handleChange} />
                  <Container textAlign="right" as={Link} to="/signup">Don't have an account? create one</Container>
                <Form.Button type='submit'>Submit</Form.Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>

    </>
  );
}