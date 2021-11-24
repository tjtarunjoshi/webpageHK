import React, { useState } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const [userType, setUserType] = useState("teacher");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setError] = useState([]);

  const isFormValid = () => {
    let errors = [];
    let error;
    if (isFormEmpty(useState)) {
      error = { message: "Fill in all the fields" };
      setError({ errors: errors.concat(error) });
      return false;
    } else if (!isPasswordValid(useState)) {
      error = { message: "Password is invalid" };
      setError({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  const isFormEmpty = ({ username, email, password, passwordConfirm }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirm.length
    );
  };

  const isPasswordValid = ({ password, passwordConfirm }) => {
    if (password.length < 6 || passwordConfirm.length < 6) {
      return false;
    } else if (password !== passwordConfirm) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //    if (isFormValid()) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
        alert(errorMessage);
        // ..
      });
  };
  //};

  return (
    <div>
      <Grid centered verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="blue" textAlign="center">
            <Button.Group>
              <Button as={Link} to="/register" size="massive" primary>
                Teacher
              </Button>
              <Button.Or text="OR" />
              <Button as={Link} to="/sregister" size="massive" positive>
                Student
              </Button>
            </Button.Group>
            <Icon name="paper plane" color="blue" />
            Sign-Up
          </Header>
          <Form size="large" textAlign="left">
            <Segment>
              <Form.Field>
                <label>Select User Type</label>
                <select
                  value={userType}
                  name="userType"
                  onChange={(event) => setUserType(event.target.value)}
                >
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </select>
              </Form.Field>

              <Form.Field>
                <label>Username</label>
                <input
                  value={username}
                  name="username"
                  placeholder="Type your username"
                  onChange={(event) => setUsername(event.target.value)}
                  type="text"
                />
              </Form.Field>

              <Form.Field>
                <label>Email-Id</label>
                <input
                  value={email}
                  name="email"
                  placeholder="Type your email-id"
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                />
              </Form.Field>

              <Form.Field>
                <label>Password</label>
                <input
                  value={password}
                  name="password"
                  placeholder="Type your email-id"
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                />
              </Form.Field>

              <Form.Field>
                <label>Confirm Password</label>
                <input
                  value={passwordConfirm}
                  name="passwordConfirm"
                  placeholder="Type your password again to confirm"
                  onChange={(event) => setPasswordConfirm(event.target.value)}
                  type="password"
                />
              </Form.Field>

              <Button onClick={handleSubmit} color="blue" fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
}
