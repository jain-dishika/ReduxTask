import React,{useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from "react-redux";
 
const Login = () => {
    const [dob, setDOB] = useState(null);
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');

    const dispatch = useDispatch(); 

    const handleInputName = (e) => {
        setInputName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Input Value:', inputName, " ", inputEmail, " ", dob);
    };

    const handleInputEmail = (e) => {
        setInputEmail(e.target.value);
    };

    const handleDOBChange = (date) => {
      setDOB(date);
    };

    const addUser = (name, email, dob) =>{
      // console.log('Input Value:', name, " ", email, " ", dob);
      let payLoad = {name , email, dob}
      dispatch({ type: "ADD-USER", payLoad });
    }
  
  return (
    <>
      <Form style={{"width":"40%"}} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name"  value={inputName}
            onChange={handleInputName}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="text-center">Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"  value={inputEmail}
            onChange={handleInputEmail}/>
        </Form.Group>
        <Form.Group controlId="dob" style={{"display": "flex",
    "flexDirection": "column"}}>
        <Form.Label>Date of Birth</Form.Label>
        <DatePicker
          selected={dob}
          onChange={handleDOBChange}
          dateFormat="MM/dd/yyyy" // Define your preferred date format
          isClearable
          placeholderText="Select Date of Birth" 
        />
      </Form.Group>
        <Button variant="primary" type="submit" style={{"margin" : "20px"}} onClick={()=>addUser(inputName, inputEmail, dob)}>
          ADD
        </Button>
      </Form>
    </>
  );
};

export default Login;
