import { Image, Form, Segment, Grid, Header,Container } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import "./Signin.css"
import { useState } from "react";
import { createAccount } from "../services";

export function Signup() {
    const navigate=useNavigate()
    const [user,setUser]=useState({})

    const handleChange = (e, { name, value }) => setUser({ ...user, [name]: value })
    const handleSubmit=async()=>{
        await createAccount(user)
        navigate("/")
      }
    return (
        <>
            <div id="animation">                
                <br /><br />
                <Grid centered>
                    <Grid.Column width={8}>
                        <Segment padded>
                            <Header as={"h1"}>Join Mongotodo</Header>
                            <Image src={logo} size="medium" centered />
                            <Form onSubmit={handleSubmit}>
                                <Form.Input fluid label='User name'
                                    placeholder='Enter user name'
                                    required
                                    name="nomComplet"
                                    onChange={handleChange} />

                                <Form.Input fluid label='Email'
                                    placeholder='Enter email'
                                    required
                                    name="email"
                                    onChange={handleChange} />

                                <Form.Group inline widths='equal'>
                                <Form.Input fluid
                                    type='password'
                                    label='Password'
                                    placeholder='Enter Password'
                                    required
                                    name="motDePasse"
                                    onChange={handleChange} />

                                <Form.Input fluid
                                    type='password'
                                    label='Confirm password'
                                    placeholder='Confirm password'
                                    required
                                    name="motDePasse2"
                                    onChange={handleChange} />
                                </Form.Group>
                                <Container textAlign="right" as={Link} to="/signin">Already got an account? sign in</Container>
                                <Form.Button type='submit'>Submit</Form.Button>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        </>
    );
}