import { useState } from "react";
import { ProfileProps } from "./profile.types";
import { BsPersonCircle } from "react-icons/bs";
import {

  Container,
  Heading,
  Text,
  ImageContainer,
  Form,
  Label,
  Input,
  TextArea,
  Button,
} from "./profile.styles";
import { ProfileMenu } from "../../components/profile-menu";
const initialState = {
  name: "",
  email: "",
  phone: "",
  bio: "",
  photo: "",
  role: "",
  isVerified: false,
};

export const Profile = () => {
  const [profile, setProfile] = useState<ProfileProps>(initialState);

  const { name, email, phone, bio, photo, role, isVerified } = initialState;

  const handleImageChange = () => {
    console.log("change image placeholder");
  };

  return (
    <Container>
        <ProfileMenu/>
        <Heading>Profile</Heading>
      <ImageContainer>
        {photo.length ? (
          <img src="" alt="" />
        ) : (
          <BsPersonCircle size={200} color="grey" />
        )}
        <Text>Role: Admin</Text>
      </ImageContainer>
      <Form>
        <Label>Change photo:</Label>
        <Input type="file" onChange={() => handleImageChange()} />
        <Label>Name:</Label>
        <Input
          type="text"
          name="name"
          onChange={() => console.log("change event")}
        />
        <Label>Email:</Label>
        <Input
          type="email"
          name="email"
          onChange={() => console.log("change event")}
        />
        <Label>Phone:</Label>
        <Input
          type="text"
          name="phone"
          onChange={() => console.log("change event")}
        />
        <Label>Bio:</Label>
        <TextArea name="name" onChange={() => console.log("change event")} />
        <Button>Update Portfolio</Button>
      </Form>
    </Container>
  );
};
