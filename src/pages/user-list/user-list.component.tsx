import {
  Heading,
  Container,
  StatsContainer,
  Input,
  TextAndSearchContainer,
  TableContainer,
  TableBody,
  TableHeading,
  TableRow,
  TableData,
} from "./user-list.styles";
import { Card } from "../../components/stats-card";
import { FaUsers } from "react-icons/fa6";
import { BiUserCheck, BiUserMinus, BiSolidUserX } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "./user-list.types";
import { toast } from "react-toastify";

interface UserListProps {
  isLoggedIn: boolean;
  id: string;
  role: string;
}

export const UserList = ({ isLoggedIn, role, id }: UserListProps) => {
  const [users, setUsers] = useState<User[]>([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/register`
      );
      setUsers(response.data);
      console.log("response: ", response);
    } catch (error) {
      console.error(error);
    }
  };

  const verifiedUsers = users.filter((user) => user.isVerified);
  const unverifiedUsers = users.filter((user) => !user.isVerified);

useEffect(() => {
  if (isLoggedIn && (role === "admin" || role === "author")) {
    getAllUsers();
  } else {
    toast.error("Permission denied", {
      position: "bottom-center",
      theme: "colored",
    });
  }
}, [isLoggedIn, role]);


  return (
    <Container>
      <Heading>Stats</Heading>
      <StatsContainer>
        <Card
          icon={<FaUsers size={90} />}
          heading="Total Users"
          users={users.length}
          bgColor="purple"
        />
        <Card
          icon={<BiUserCheck size={100} />}
          heading="Verified Users"
          users={verifiedUsers.length}
          bgColor="green"
        />
        <Card
          icon={<BiUserMinus size={100} />}
          heading="Unverified Users"
          users={unverifiedUsers.length}
          bgColor="blue"
        />
        <Card
          icon={<BiSolidUserX size={100} />}
          heading="Suspended Users"
          users={4}
          bgColor="hotpink"
        />
      </StatsContainer>

      <TextAndSearchContainer>
        <Heading>All Users</Heading>
        <div>
          <Input type="text" placeholder="Search Users" />
        </div>
      </TextAndSearchContainer>
      <TableContainer>
        <TableHeading>
          <TableRow>
            <TableData>User ID</TableData>
            <TableData>Name</TableData>
            <TableData>Email</TableData>
            <TableData>Role</TableData>
            <TableData>Verified</TableData>
            <TableData>Date Joined</TableData>
          </TableRow>
        </TableHeading>
        <TableBody>
          {users?.map((user, idx) => {
            return (
              <TableRow>
                <TableData>{user._id}</TableData>
                <TableData>{user.name}</TableData>
                <TableData>{user.email}</TableData>
                <TableData>{user.role}</TableData>
                <TableData>{user.isVerified ? "Yes" : "No"}</TableData>
                <TableData>{user.createdAt}</TableData>
              </TableRow>
            );
          })}
        </TableBody>
      </TableContainer>
    </Container>
  );
};
