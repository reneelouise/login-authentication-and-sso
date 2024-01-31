import React, { useEffect, useState } from "react";
import { TiUserAddOutline } from "react-icons/ti";
import {
  Container,
  Heading,
  Form,
  TextContainer,
  Text,
  InputContainer,
  Input,
  Button,
  PlainButton,
  LinkToRoute as Link,
} from "./register-styles";
import { PasswordInputComponent } from "../../../components/password-input";
import { PasswordStrength } from "../../../components/password-strength";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {validateEmail} from '../../../helpers'
import axios from "axios";


export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    const letterRegex = /[a-zA-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%&*]/;

    const conditionsMet =
      letterRegex.test(password) &&
      numberRegex.test(password) &&
      specialCharRegex.test(password) &&
      password.length >= 6;


    if (!name || !email || !password) {
      toast.error(
        "Missing fields. Please provide a name, email and password.",
        { position: "bottom-center", draggable: true, theme: "colored" }
      );
    }

    if (!validateEmail(email)) {
      return toast.error("Invalid email address.", {
        position: "bottom-center",
        draggable: true,
        theme: "colored",
      });
    }

    if (!conditionsMet) {
      return toast.error("All password conditions must be met", {
        position: "bottom-center",
        draggable: true,
        theme: "colored",
      });
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match", {
        position: "bottom-center",
        draggable: true,
        theme: "colored",
      });
    }

    const userData = {
      name,
      email,
      password,
    };

    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/register",
        userData
      );

      if (response.status === 200) {
        // Registration successful
        setIsSuccess(true);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsLoading(false);

        // Send welcome email
        const welcomeEmailData = {
          subject: "Welcome to Blaq Byte my love...",
          send_to: email, // Assuming 'email' is the user's email
          reply_to: "no-reply@blaqbyte.com", // Provide a valid reply-to address
          template: "register", // Replace with the actual template name
          url: "https://localhost:3001/profile", // URL to redirect the user after clicking the email link
        };

        // Call the endpoint to send the welcome email
        const welcomeEmailResponse = await axios.post(
          "http://localhost:5000/api/send-automated-email",
          welcomeEmailData
        );

        if (welcomeEmailResponse.status === 200) {
          console.log(`Welcome email successfully sent to : ${email}`);
        } else {
          toast.error("Error sending welcome email, contact support", {
            position: "bottom-center",
            theme: "colored",
          });
        }

        return toast.success(
          "Account created successfully! Log in to get started",
          {
            position: "bottom-center",
            theme: "colored",
          }
        );
      }
    } catch (error) {
      console.error("Error during registration:", error);
      const errorMessage = error.response.data.message
        ? error.response.data.message
        : "Registration failed! Please try again.";

      // Display the error message using toast or any other UI component
      toast.error(errorMessage, {
        position: "bottom-center",
        draggable: true,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }

    console.log("user data: ", userData);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <>
      <Container>
        <Form onSubmit={(e) => registerUser(e)}>
          {isLoading && <p>Loading...</p>}

          <TiUserAddOutline size={35} />
          <Heading>Register</Heading>
          <InputContainer>
            <Input
              type="text"
              placeholder="Full Name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />{" "}
            <Input
              type="email"
              placeholder="Email address or username"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <PasswordInputComponent
              password={password}
              setPassword={setPassword}
            />
            <PasswordInputComponent
              password={confirmPassword}
              setPassword={setConfirmPassword}
              placeholder="Confirm password"
              onPaste={(e) => {
                e.preventDefault();
                toast.error("Cannot paste into input field", {
                  position: "bottom-center",
                  draggable: true,
                  theme: "colored",
                });
                return false;
              }}
            />
            {password.length > 0 && <PasswordStrength password={password} />}
            <Button>Register</Button>
          </InputContainer>

          <TextContainer>
            <Text>Already have an account? </Text>{" "}
            <PlainButton>
              <Link to="/login">Login</Link>
            </PlainButton>
          </TextContainer>
        </Form>
      </Container>
    </>
  );
};
