import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.list);
  console.log("nashaaa ",users);
  const getAllData = async() =>{
    dispatch({ type: "FETCH_DATA_REQUEST" });
    await axios
      .get('http://localhost:8047/users/')
      .then((response) => {
        // console.log("data is here only", response.data);
        let res = response.data;
        dispatch({ type: "FETCH_DATA_SUCCESS", payLoad: res });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_DATA_FAILURE", payLoad: error });
      });
  }
  useEffect(() => {
    getAllData();
  },[dispatch]);

  const [name, setName] = useState("");
  const handleInputName = (e) => {
    setName(e.target.value)
  }

  const [email, setEmail] = useState("");
  const handleInputEmail = (e) => {
    setEmail(e.target.value);
  };

  const [dob, setDob] = useState(null);
  const handleDOBChange = (date) => {
    setDob(date);
  };

  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const deleteUser = async (index) => {
    console.log("index", index);
    dispatch({ type: "DELETE-USER", payLoad: index });
    await axios
    .delete(`http://localhost:8047/users/${index}`)
    .then((response) => {
      console.log('Resource deleted successfully.', response.data);
    })
    .catch((error) => {
      console.log('Error deleting resource: ' + error.message);
    });
  };

  const handleButtonClick = (index, item) => {
    // console.log(typeof((item.dateOfBirth).toLocaleDateString()))
    setName(item.name);
    setEmail(item.email);
    // setDob((item.dateOfBirth).toString());
    setId(item.id);
    setShow(true);
  };

  const updateUser = async(id, name, email, dob) => {
    let details = { name, email, dob };
    await axios
    .put(`http://localhost:8047/users/${id}`, details)
    .then((response) => {
      console.log('Resource updated successfully.', response.data);
      dispatch({ type: "UPDATE-USER", payLoad: { id: id, details: details } })
      })
      .catch((error) => {
        console.log('Error updating resource: ' + error.message);
      });
    handleClose();
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
          {users !== undefined && users.map((item, index) => (
            // <div>{item.name}</div>
            // {item !== undefined}
            <tr key={index}>
              <th>{item.id}</th>
              <th>{item.name}</th>
              <th>{item.email}</th>
              <th>{item.dateOfBirth}</th>
              <th>
                <button
                  className="tableButton"
                  onClick={() => deleteUser(item.id)}
                >
                  Delete
                </button>
              </th>
              <th>
                <button className="tableButton" onClick={() => handleButtonClick(index, item)}>
                  Edit
                </button>
              </th>
            </tr>
          ))}
        </thead>
        {/* <div>{users !== undefined ? (<><h1>HELLO</h1></>):(<><h1 style={{"color":"black"}}>BYEEE</h1></>)}</div> */}
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
                  defaultValue={name || ''}
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
                  defaultValue={email || ' '}
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
                  dateFormat="YYYY/MM/DD" // Define your preferred date format
                  isClearable
                  placeholderText="Select Date of Birth"
                  defaultValue={dob || ' '}
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
