import { Menu, Divider, Button, Search, Label, Item } from "semantic-ui-react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'
import { logout } from "../services";


export function NavBar() {
    const items = [{
        name: "Tasks",
        to: "/tasks"
    }
    ]

    const handleLogout=async ()=>{
        await logout()
        window.location.reload()
    }

    return (
        <div id="header">
            <Menu secondary>

                <Menu.Item as={Link} to="/">
                    
                    <img id="logo" alt="logo" src={logo} />
                    <b>Mongotodo</b>
                </Menu.Item>

                {
                    items.map((x, i) => <Menu.Item key={i} name={x.name} to={x.to} as={Link}/>)                
                }

                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button basic content='Logout' icon='sign-out' labelPosition='right' onClick={handleLogout}/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <Divider />
        </div>
    )
}