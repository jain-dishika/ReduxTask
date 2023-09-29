import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserList = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(null);
  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  const deleteUser = (index) => {
    console.log("index", index);
    dispatch({ type: "DELETE-USER", index });
  };

  const { users } = useSelector((state) => state.list);
  const handleInputName = (e) =>{
    setName(e.target.value)
  }

  const handleInputEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleDOBChange = (date) => {
    setDob(date);
  };

const handleButtonClick = (index, item) => {
  console.log(item.name, " ", item.email, " ", item.dob)
  setName(item.name);
  setEmail(item.email);
  setDob(item.dob);
  setDob(index);
  setShow(true);
};
const updateUser = (id, name, email, dob) =>{
  let details = {name, email, dob};
  dispatch({type: "UPDATE-USER", payLoad:{id : id, details: details}})
  handleClose();
}
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
          {users.map((item, index) => (
            <tr key={index}>
              <th>{index}</th>
              <th>{item.name}</th>
              <th>{item.email}</th>
              <th>{item.dob.toString()}</th>
              <th>
                <button
                  className="tableButton"
                  onClick={() => deleteUser(index)}
                >
                  Delete
                </button>
              </th>
              <th>
                <button className="tableButton" onClick={()=>handleButtonClick(index,item)}>
                  Edit
                </button>
              </th>
            </tr>
          ))}
        </thead>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form style={{ width: "40%" }} 
                  onSubmit={handleSubmit}
                  >
                    <Form.Group className="mb-3" controlId="Name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        defaultValue={name}
                        onChange={handleInputName}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="text-center">
                        Email address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        defaultValue={email}
                        onChange={handleInputEmail}
                      />
                    </Form.Group>
                    <Form.Group
                      controlId="dob"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <Form.Label>Date of Birth</Form.Label>
                      <DatePicker
                        selected={dob}
                        onChange={handleDOBChange}
                        dateFormat="MM/dd/yyyy" // Define your preferred date format
                        isClearable
                        placeholderText="Select Date of Birth"
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      style={{ margin: "20px" }}
                      onClick={() => updateUser(id, name, email, dob)}
                      // onClick={handleClose}
                    >
                      Save Changes
                    </Button>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
      </Table>
    </>
  );
};

export default UserList;
// {/* <th><button className='tableButton'>Delete</button></th>
//           <th><button className='tableButton'>Edit</button></th> */}
