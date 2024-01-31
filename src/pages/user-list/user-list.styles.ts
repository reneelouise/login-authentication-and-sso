import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h1``;

const Text = styled.p`
  font-weight: 600;
  font-size: 12px;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const TextAndSearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  font-size: 18px;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TableBody = styled.tbody``;
const TableHeading = styled.th``;
const TableRow = styled.tr`
  display: flex;
  justify-content: space-evenly;
`;
const TableData = styled.td``;

export {
  Container,
  Heading,
  Text,
  StatsContainer,
  Input,
  TextAndSearchContainer,
  TableContainer,
  TableBody,
  TableHeading,
  TableRow,
  TableData,
};
