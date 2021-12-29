import { Box, Button, Flex, List } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config";
import { Options } from "./Options";
import { PatientItem } from "./PatientItem";
import { Main } from "../components/Main";
import useFilters from "../hooks/useFilters";
import { PieCharts } from "./PieCharts";

interface Patient {
  personID: Number;
  gender: "F" | "M";
  birthDatetime: String;
  age: Number;
  race: "other" | "native" | "black" | "white" | "asian";
  ethnicity: "hispanic" | "nonhispanic";
  isDeath: Boolean;
}

export const PatientsTable = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [allPatients, setAllPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [perPage, setPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortingCategory, setSortingCategory] = useState("id");
  const [sortingDirection, setSortingDirection] = useState(0);
  const setFilters = useFilters(allPatients, setFilteredPatients);

  useEffect(() => {
    const fetchPatients = async () => {
      const res = await axiosInstance.get("/patient/list");
      const patientsList = res.data.patient.list.sort(
        (prev, next) => prev.personID - next.personID
      );
      setAllPatients(patientsList);
      setFilteredPatients(patientsList);
      setPatients(
        patientsList.length > 20 ? patientsList.slice(0, 20) : patientsList
      );
      setTotalPages(Math.floor((patientsList.length + perPage - 1) / perPage));
    };
    fetchPatients();
  }, []);

  useEffect(() => {
    switch (sortingCategory) {
      default:
        let sortedPatients = null;
      case "id":
        sortedPatients = filteredPatients.sort((prev, next) => {
          const result = Number(next.personID) - Number(prev.personID);
          return sortingDirection ? result : -result;
        });
        setFilteredPatients([...sortedPatients]);
        break;
      case "gender":
        sortedPatients = filteredPatients.sort((prev, next) => {
          const result = prev.gender === "M" ? 1 : -1;
          return sortingDirection ? result : -result;
        });
        setFilteredPatients([...sortedPatients]);
        break;
      case "birthDate":
        sortedPatients = filteredPatients.sort((prev, next) => {
          const result =
            Number(next.birthDatetime.split(" ")[0].split("-").join("")) -
            Number(prev.birthDatetime.split(" ")[0].split("-").join(""));
          return sortingDirection ? result : -result;
        });
        setFilteredPatients([...sortedPatients]);
        break;
      case "age":
        sortedPatients = filteredPatients.sort((prev, next) => {
          const result = Number(next.age) - Number(prev.age);
          return sortingDirection ? result : -result;
        });
        setFilteredPatients([...sortedPatients]);
        break;
      case "race":
        sortedPatients = filteredPatients.sort((prev, next) => {
          const converter = {
            white: 0,
            black: 1,
            asian: 2,
            native: 3,
            other: 4,
          };
          const result = converter[next.race] - converter[prev.race];
          return sortingDirection ? result : -result;
        });
        setFilteredPatients([...sortedPatients]);
        break;
      case "ethnicity":
        sortedPatients = filteredPatients.sort((prev, next) => {
          const converter = {
            nonhispanic: 0,
            hispanic: 1,
          };
          const result = converter[next.ethnicity] - converter[prev.ethnicity];
          return sortingDirection ? result : -result;
        });
        setFilteredPatients([...sortedPatients]);
        break;
      case "isDeath":
        sortedPatients = filteredPatients.sort((prev, next) => {
          const result = Number(prev.isDeath) - Number(next.isDeath);
          return sortingDirection ? result : -result;
        });
        setFilteredPatients([...sortedPatients]);
        break;
    }
  }, [sortingCategory, sortingDirection]);

  useEffect(() => {
    setTotalPages(
      Math.floor((filteredPatients.length + perPage - 1) / perPage)
    );
  }, [perPage, filteredPatients.length]);

  useEffect(() => {
    setPatients(
      filteredPatients.slice((currentPage - 1) * perPage, currentPage * perPage)
    );
  }, [filteredPatients, perPage, currentPage]);

  const handlePageClick = (e) => {
    setCurrentPage(Number(e.target.value));
  };

  const handleFirstPagesClick = () => {
    setCurrentPage(1);
  };

  const handlePrevPagesClick = () => {
    setCurrentPage(Math.floor((currentPage - 11) / 10) * 10 + 10);
  };

  const handleLastPagesClick = () => {
    setCurrentPage(totalPages);
  };

  const handleNextPagesClick = () => {
    setCurrentPage(Math.floor((currentPage + 9) / 10) * 10 + 1);
  };

  const demo = {
    personID: "ID",
    gender: "Gender",
    birthDatetime: "Birth\tDate",
    age: "Age",
    race: "Race",
    ethnicity: "Ethnicity",
    isDeath: "Alive",
  };

  return (
    <Main>
      <Flex overflow="hidden" justifyContent="space-around">
        <PieCharts filteredPatients={filteredPatients} />
      </Flex>
      <Options
        setPerPage={setPerPage}
        setCurrentPage={setCurrentPage}
        setSortingCategory={setSortingCategory}
        setSortingDirection={setSortingDirection}
        setFilters={setFilters}
      />
      <List spacing={3} my={0}>
        <PatientItem patient={demo} />
        {filteredPatients.length === 0 && (
          <Box>No result for the search condition.</Box>
        )}
        {patients.map((patient) => {
          return (
            <PatientItem key={patient.personID.toString()} patient={patient} />
          );
        })}
      </List>
      <Box>
        <Box display="flex" margin="auto" width="fit-content">
          {currentPage > 20 && (
            <Button
              onClick={handleFirstPagesClick}
              background="transparent"
              _hover={{ bg: "lightgray", color: "white" }}
            >
              &lt;&lt;
            </Button>
          )}
          {currentPage > 10 && (
            <Button
              onClick={handlePrevPagesClick}
              background="transparent"
              _hover={{ bg: "lightgray", color: "white" }}
            >
              &lt;
            </Button>
          )}
          {new Array(10).fill(0).map((page, index) => {
            const pageToRender =
              Math.floor((currentPage - 1) / 10) * 10 + index + 1;
            return (
              pageToRender <= totalPages && (
                <Button
                  key={pageToRender}
                  value={pageToRender}
                  border="1px solid black"
                  onClick={handlePageClick}
                  background={pageToRender === currentPage && "crimson"}
                  color={pageToRender === currentPage && "white"}
                  _hover={{ bg: "crimson", color: "white" }}
                >
                  {pageToRender}
                </Button>
              )
            );
          })}
          {Math.floor((currentPage - 1) / 10) * 10 + 10 < totalPages && (
            <Button
              onClick={handleNextPagesClick}
              background="transparent"
              _hover={{ bg: "lightgray", color: "white" }}
            >
              &gt;
            </Button>
          )}
          {Math.floor((currentPage - 1) / 10) * 10 + 20 < totalPages && (
            <Button
              onClick={handleLastPagesClick}
              background="transparent"
              _hover={{ bg: "lightgray", color: "white" }}
            >
              &gt;&gt;
            </Button>
          )}
        </Box>
      </Box>
    </Main>
  );
};
