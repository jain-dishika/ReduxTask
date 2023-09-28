import React from 'react'
import Table from 'react-bootstrap/Table';
import { useSelector } from "react-redux";
const UserList = () => {
  const { users } = useSelector((state) => state.list)
  // console.log("I am Here", users[0].name);
  return (
    <>
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>DOB</th>
          <th>Delete</th>
          <th>Edit</th>
        </tr>
        {users.map((item, index) =>(
          <tr>
            <th>{index}</th>
            <th>{item.name}</th>
            <th>{item.email}</th>
            <th>{(item.dob).toString()}</th>
            <th><button className='tableButton'>Delete</button></th>
            <th><button className='tableButton'>Edit</button></th>
          </tr>
        ))}
      </thead>
    </Table>
    </>
  )
}

export default UserList
// {/* <th><button className='tableButton'>Delete</button></th>
//           <th><button className='tableButton'>Edit</button></th> */}