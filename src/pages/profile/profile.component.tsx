import { useEffect, useState } from "react";
import { ProfileProps } from "./profile.types";
import {  BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router";
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
import axios from "axios";
import { toast } from "react-toastify";
import { Logout, validateEmail } from "../../helpers";

const initialState = {
  name: "",
  email: "",
  phone: "",
  bio: "",
  photo: "",
  role: undefined,
};

export const Profile = () => {
  const [currentProfile, setCurrentProfile] =
    useState<ProfileProps>(initialState);
  const [profile, setProfile] = useState<ProfileProps>(initialState);
  const [username, setUsername] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [biography, setBiography] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userString = localStorage?.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const id = user?.id ;

  const navigate = useNavigate()

  // get current user details

  const getUser = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/register/${id}`
      );
      console.log("response: ", response);

      const { name, email, phone, bio, photo, role } = response.data;

      setCurrentProfile({
        name: name,
        email: email,
        phone: phone,
        bio: bio,
        photo: photo,
        role: role,
      });

      setUsername(name);
      setEmailAddress(email);
      setPhoneNumber(phone);
      setBiography(bio);
      setProfilePhoto(photo);
    } catch (error) {
      console.error("Error fetching user details: ", error);
      toast.error("Error fetching user details", {
        position: "bottom-center",
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const { name, email, phone, bio, photo, role } = currentProfile;

  // check if the user has updated their profile
  const hasMadeValidProfileChange = () => {
    return (
      name.trim() !== username.trim() ||
      email.trim() !== emailAddress.trim() ||
      phone.trim() !== phoneNumber.trim() ||
      bio.trim() !== biography.trim() ||
      photo.trim() !== profilePhoto.trim() || validateEmail(emailAddress.trim())
    );
  };

  const updateProfile = async (e: any) => {
    e.preventDefault();

    if (hasMadeValidProfileChange()) {
      try {
        const response = await axios.patch(
          `http://localhost:5000/api/register/${id}`,
          {
            ...profile,
          }
        );

        if (response.status === 200) {
          toast.success("Successfully updated profile", {
            position: "bottom-center",
            theme: "colored",
          });

          return
        }
      } catch (error: any) {
        console.error("Error updating profile: ", error);

        const errorMessage = "Error updating progile";

        toast.error(errorMessage, {
          position: "bottom-center",
          theme: "colored",
        });
      }
    }
    toast.error("Make a change to update profile", {
      position: "bottom-center",
      theme: "colored",
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileInput = e.target as HTMLInputElement;
    const file = fileInput.files && fileInput.files[0];

    if (file) {
      // Handle the selected file
      console.log("Selected file:", file);
      setProfilePhoto(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
      return
    }
    Logout()
    navigate('/login')
      toast.error("You were logged out. Please login to access your profile", {
        position: "bottom-center",
        theme: "colored",
      });
  }, [id]);

  useEffect(() => {
    setProfile({
      name: username,
      email: emailAddress,
      phone: phoneNumber,
      bio: biography,
      photo: profilePhoto,
    });
  }, [username, emailAddress, phoneNumber, biography, profilePhoto]);

  return isLoading ? (
    <div>Loading profile</div>
  ) : (
    <Container>
      <ProfileMenu />
      <Heading>Profile</Heading>
      <ImageContainer>
        {profilePhoto.length ? (
          <img src="" alt="" />
        ) : (
          <BsPersonCircle size={200} color="grey" />
        )}
        <Text>Role: {role}</Text>
      </ImageContainer>
      <Form onSubmit={(e: any) => updateProfile(e)}>
        <Label>Change photo:</Label>
        <Input
          type="file"
          onChange={(e: any) => handleImageChange(e)}
          value={profilePhoto}
        />
        <Label>Name:</Label>
        <Input
          type="text"
          name="name"
          onChange={(e: any) => setUsername(e.currentTarget.value)}
          value={username}
        />
        <Label>Email:</Label>
        <Input
          type="email"
          name="email"
          onChange={(e: any) => setEmailAddress(e.currentTarget.value)}
          value={emailAddress}
        />
        <Label>Phone:</Label>
        <Input
          type="text"
          name="phone"
          onChange={(e: any) => setPhoneNumber(e.currentTarget.value)}
          value={phoneNumber}
        />
        <Label>Bio:</Label>
        <TextArea
          name="name"
          onChange={(e: any) => setBiography(e.currentTarget.value)}
          value={biography}
        />
        <Button>Save changes</Button>
      </Form>
    </Container>
  );
};
