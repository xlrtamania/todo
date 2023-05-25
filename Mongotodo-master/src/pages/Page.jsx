import { Outlet } from "react-router-dom";
import { Footer } from '../components/Footer'
import { NavBar } from "../components/NavBar";


export default function Page(){
    return(
        <><NavBar/>
      <div id='boody'>
      <Outlet/>
      </div>
      <Footer/></>
    )
}