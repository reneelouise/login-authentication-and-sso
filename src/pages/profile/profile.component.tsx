import { ChangeEvent, useEffect, useState } from "react";
import { ProfileProps } from "./profile.types";
import { BsPersonCircle } from "react-icons/bs";
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
import axios from "axios";
import { toast } from "react-toastify";
import { validateEmail } from "../../helpers";

interface IProfile {
  name: string;
  email: string;
  phone: string;
  bio: string;
  photo: string;
  role: string;
}
const initialState: IProfile = {
  name: "",
  email: "",
  phone: "",
  bio: "",
  photo: "",
  role: "",
};

interface IProfileProps {
  isLoggedIn: boolean;
  id: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export const Profile = ({ isLoggedIn, id, setName }: IProfileProps) => {
  const [currentProfile, setCurrentProfile] =
    useState<ProfileProps>(initialState);
  const [profile, setProfile] = useState<ProfileProps>(initialState);
  const [username, setUsername] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [biography, setBiography] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // get current user details

  const getUser = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/register/${id}`
      );
      console.log("response bby: ", response);

      const { name, email, phone, bio, photo, role } = response.data;

      setCurrentProfile({
        name: name,
        email: email,
        phone: phone,
        bio: bio,
        photo: photo,
        role: role,
      });

      const roleInLocalStorage = localStorage.getItem("role");
      if (!roleInLocalStorage) {
        localStorage.setItem("role", role);
      }

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
      photo?.trim() !== profilePhoto?.trim() ||
      !validateEmail(emailAddress.trim())
    );
  };

  useEffect(() => {
    setProfile({
      name: username,
      email: emailAddress,
      phone: phoneNumber,
      bio: biography,
      photo: profilePhoto,
    });
  }, [username, emailAddress, phoneNumber, biography, profilePhoto]);

  const updateProfile = async (e: any) => {
    e.preventDefault();

    if (!hasMadeValidProfileChange()) {
      return toast.error("Make a change to update your profile", {
        position: "bottom-center",
        theme: "colored",
      });
    }

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/register/${id}`,
        {
          ...profile,
          photo: profilePhoto !== null ? profilePhoto : undefined,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Successfully updated profile", {
          position: "bottom-center",
          theme: "colored",
        });

        console.log("username is: ", username);
        localStorage.removeItem("user");
        localStorage.setItem(
          "user",
          JSON.stringify({ id: id, name: username })
        );
        setName(username);
        return;
      }
    } catch (error: any) {
      console.error("Error updating profile: ", error);

      const errorMessage = "Error updating progile";

      toast.error(errorMessage, {
        position: "bottom-center",
        theme: "colored",
      });
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    const file = fileInput.files && fileInput.files[0];

    if (file) {
      // Display a preview of the selected image (optional)
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePhoto(null);
    }
  };

  useEffect(() => {
    if (isLoggedIn && id) {
      getUser();
    }
  }, []);

  return isLoading ? (
    <div>Loading profile</div>
  ) : (
    <Container>
      <Heading>Profile</Heading>
      <ImageContainer>
        {profilePhoto?.length ? (
          profilePhoto && (
            <img
              src={profilePhoto}
              alt="Selected"
              style={{ maxWidth: "200px" }}
            />
          )
        ) : (
          <BsPersonCircle size={200} color="grey" />
        )}
        <Text>Role: {role}</Text>
      </ImageContainer>
      <Form onSubmit={(e: any) => updateProfile(e)}>
        <Label>Change photo:</Label>
        <Input type="file" onChange={handleImageChange} />
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
