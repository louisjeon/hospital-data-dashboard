import {
  CheckCircleIcon,
  CheckIcon,
  CloseIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import { Badge, Box, Flex, ListItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config";

export const PatientItem = ({ patient }) => {
  const { age, birthDatetime, ethnicity, gender, isDeath, personID, race } =
    patient;
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [details, setDetails] = useState({ conditionList: [], visitCount: 0 });

  const handleItemClick = () => {
    if (personID !== "ID") {
      setDetailsOpen(!detailsOpen);
    }
  };

  useEffect(() => {
    const getDetails = async () => {
      const res = await axiosInstance.get(`/patient/brief/${personID}`);
      setDetails(res.data);
      console.log(res.data);
    };
    detailsOpen && getDetails();
  }, [detailsOpen]);

  return (
    <ListItem
      key={personID.toString()}
      border="1px solid black"
      borderRadius="5px"
      padding="3px 5px"
      onClick={handleItemClick}
    >
      <Flex display="flex" justifyContent="space-between">
        <Box
          w="10%"
          textAlign={typeof personID === "string" ? "center" : "inherit"}
        >
          {personID}
        </Box>
        <Badge
          borderRadius="full"
          px="2"
          colorScheme={
            gender === "M" ? "teal" : gender === "F" ? "pink" : "transparent"
          }
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          w="25px"
          alignItems="center"
        >
          {gender}
        </Badge>
        <Box
          w="15%"
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          textAlign="center"
        >
          {birthDatetime.split(" ")[0]}
        </Box>

        <Box
          w="5%"
          textAlign="center"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {age}
        </Box>

        <Box
          border={race !== "Race" && "1px solid gray"}
          padding="0 3px"
          borderRadius="3px"
          color={
            (race === "black" || race === "native" || race === "asian") &&
            "white"
          }
          background={
            race === "asian"
              ? "tan"
              : race === "black"
              ? "black"
              : race === "native"
              ? "crimson"
              : race === "other"
              ? "gray"
              : "white"
          }
        >
          {race}
        </Box>

        <Box
          w="12%"
          as="span"
          color="gray.600"
          fontSize="sm"
          textAlign="center"
        >
          {ethnicity}
        </Box>
        <Box>
          {typeof isDeath === "string" ? (
            <CheckCircleIcon color="crimson" />
          ) : isDeath ? (
            <CloseIcon color="red" />
          ) : (
            <CheckIcon color="yellowgreen" />
          )}
        </Box>
      </Flex>
      {detailsOpen && (
        <Box w="100%" borderTop="1px solid black" mt="5px">
          <Box borderRadius="5px" padding="5px" margin="4px 0 0" display="flex">
            <WarningIcon color="crimson" fontSize="30px" marginRight="5px" />
            <Box mt="3px" fontWeight="bold">
              Symptoms (Visit Count: {details.visitCount})
            </Box>
          </Box>
          {details.conditionList.map((condition) => {
            return (
              <Box
                border="1px solid black"
                borderRadius="5px"
                padding="5px"
                margin="10px 0"
              >
                {condition}
              </Box>
            );
          })}
        </Box>
      )}
    </ListItem>
  );
};
