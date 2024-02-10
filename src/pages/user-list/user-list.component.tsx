import {
  Heading,
  Container,
  StatsContainer,
  Input,
  TextAndSearchContainer,
} from "./user-list.styles";
import { Card } from "../../components/stats-card";
import { FaUsers } from "react-icons/fa6";
import { BiUserCheck, BiUserMinus, BiSolidUserX } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import { User, UserData } from "./user-list.types";
import { toast } from "react-toastify";
import { AdminAuthorLink } from "../../components/protected/protected";
import { format } from "date-fns";
import { UserGrid } from "../../components/user-grid/user-grid";
import { NoAccess } from "../../components/no-access/no-access";

interface UserListProps {
  isLoggedIn: boolean;
  role: string;
}

export const UserList = ({ isLoggedIn, role }: UserListProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [rowData, setRowData] = useState<UserData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const columnDefs = [
    { field: "id" },
    { field: "name" },
    { field: "email" },
    { field: "phone" },
    { field: "role" },
    { field: "verified" },
    { field: "date" },
  ];

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/register`
      );
      const result = response.data;
      setUsers(result);
      // Properties you want to exclude
      const excludedProperties = [
        "password",
        "photo",
        "__v",
        "updatedAt",
        "userAgent",
        "bio",
      ];

      // Mapping between old and new keys to display in ag grid
      const keyMappings: { [key: string]: string } = {
        _id: "id",
        isVerified: "verified",
        createdAt: "date",
      };

      const transformedResult = result.map((obj: any) => {
        const newObj: { [key: string]: any } = {};
        for (const key in obj) {
          if (!excludedProperties.includes(key)) {
            if (key === "createdAt" && obj[key]) {
              // Format date using date-fns
              newObj[keyMappings[key]] = format(
                new Date(obj[key]),
                "MMMM do yyyy, h:mm a"
              );
            } else {
              newObj[keyMappings[key] || key] = obj[key];
            }
          }
        }
        return newObj;
      });

      setRowData(transformedResult);
      setAllUsers(transformedResult);
    } catch (error) {
      console.error(error);
    }
  };

  const verifiedUsers = users.filter((user) => user.isVerified);
  const unverifiedUsers = users.filter((user) => !user.isVerified);
  const suspendedUsers = users.filter((user) => user.role === "suspended");

  const filterUsers = (query: string) => {
    if (query.trim() === "") {
      setRowData(allUsers); // Show the full list when search query is empty
      return;
    }

    const filteredRows = rowData.filter((user: UserData) => {
      const lowerCaseQuery = query.toLowerCase();
      return (
        user.name.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery)
      );
    });
    setRowData(filteredRows);
  };

  useEffect(() => {
    if (isLoggedIn && role) {
      getAllUsers();
    } else {
      toast.error("Permission denied", {
        position: "bottom-center",
        theme: "colored",
      });
    }
  }, [isLoggedIn, role]);

  useEffect(() => {
    filterUsers(searchQuery);
  }, [searchQuery]);

  const renderUserList = () => {
    return (
      <Container>
        <Heading>Overview</Heading>
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
            users={suspendedUsers.length}
            bgColor="hotpink"
          />
        </StatsContainer>
        <TextAndSearchContainer>
          <Heading>All Users</Heading>
          <div>
            <Input
              type="text"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchQuery(event.target.value);
              }}
            />
          </div>
        </TextAndSearchContainer>
        <UserGrid rowData={rowData} colDefs={columnDefs} />
      </Container>
    );
  };

  const hasAccess = role === JSON.stringify("admin") && isLoggedIn;

  return !hasAccess ? (
    <NoAccess />
  ) : (
    <AdminAuthorLink
      role={role}
      isLoggedIn={isLoggedIn}
      children={renderUserList()}
    />
  );
};
