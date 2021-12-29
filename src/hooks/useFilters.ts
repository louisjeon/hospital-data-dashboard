import { useEffect, useState } from "react";

const useFilters = (allPatients, setFilteredPatients) => {
  const [genderFilter, setGenderFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [raceFilter, setRaceFilter] = useState("");
  const [ethnicityFilter, setEthnicityFilter] = useState("");
  const [isDeathFilter, setIsDeathFilter] = useState("");

  useEffect(() => {
    let filteredData = allPatients;

    if (genderFilter !== "") {
      filteredData = filteredData.filter(
        (patient) => patient.gender === genderFilter
      );
    }

    if (ageFilter !== "") {
      filteredData = filteredData.filter((patient) => {
        switch (Number(ageFilter)) {
          case 0:
            return patient.age < 10;
          case 10:
            return patient.age >= 10 && patient.age < 20;
          case 20:
            return patient.age >= 20 && patient.age < 30;
          case 30:
            return patient.age >= 30 && patient.age < 40;
          case 40:
            return patient.age >= 40 && patient.age < 50;
          case 50:
            return patient.age >= 50 && patient.age < 60;
          case 60:
            return patient.age >= 60 && patient.age < 70;
          case 70:
            return patient.age >= 20;
        }
      });
    }

    if (raceFilter !== "") {
      filteredData = filteredData.filter(
        (patient) => patient.race === raceFilter
      );
    }

    if (ethnicityFilter !== "") {
      filteredData = filteredData.filter(
        (patient) => patient.ethnicity === ethnicityFilter
      );
    }

    if (isDeathFilter !== "") {
      filteredData = filteredData.filter(
        (patient) => patient.isDeath.toString() === isDeathFilter
      );
    }

    setFilteredPatients([...filteredData]);
  }, [genderFilter, ageFilter, raceFilter, ethnicityFilter, isDeathFilter]);

  return [
    setGenderFilter,
    setAgeFilter,
    setRaceFilter,
    setEthnicityFilter,
    setIsDeathFilter,
  ];
};

export default useFilters;
