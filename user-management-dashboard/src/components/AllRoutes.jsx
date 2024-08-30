import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from '../pages/Home'
import AddUser from '../pages/AddUser'
import EditUser from '../pages/EditUser'


export const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/add-user' element={<AddUser/>}/>
            {/* <Route path='/ticket' element={<TicketList/>}/> */}
            <Route path="/edit-user/:id" element={<EditUser />} />
        </Routes>
    </div>
  )
}