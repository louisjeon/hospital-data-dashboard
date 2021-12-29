import { MinusIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import { Chart, ArcElement } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

Chart.register(ArcElement);
const graphHeight = 140;

export const PieCharts = ({ filteredPatients }) => {
  const [chartData, setChartData] = useState({
    gender: [],
    race: [],
    ethnicity: [],
    genderPlusRace: [],
    genderPlusEthnicity: [],
  });

  const colors = {
    gender: {
      M: [54, 162, 235],
      F: [255, 99, 132],
    },
    race: {
      Asian: [255, 216, 87],
      Black: [28, 22, 2],
      Native: [92, 8, 8],
      White: [255, 249, 219],
      Other: [120, 117, 102],
    },
    ethnicity: {
      NonHispanic: [91, 222, 84],
      Hispanic: [166, 33, 108],
    },
    genderPlusRace: {
      AsianM: [255, 0, 0],
      AsianF: [255, 128, 128],
      BlackM: [0, 255, 255],
      BlackF: [128, 255, 255],
      NativeM: "green",
      NativeF: "darkgreen",
      WhiteM: "violet",
      WhiteF: "purple",
      OtherM: "teal",
      OtherF: "black",
    },
    genderPlusEthnicity: {
      NonHispanicM: "teal",
      NonHispanicF: "crimson",
      HispanicM: "salmon",
      HispanicF: "tan",
    },
  };

  useEffect(() => {
    const tmpData = {
      gender: new Array(2).fill(0),
      race: new Array(5).fill(0),
      ethnicity: new Array(2).fill(0),
      genderPlusRace: new Array(10).fill(0),
      genderPlusEthnicity: new Array(4).fill(0),
    };

    filteredPatients.forEach((patient) => {
      switch (patient.gender) {
        case "M":
          tmpData.gender[0]++;
          switch (patient.race) {
            case "asian":
              tmpData.race[0]++;
              tmpData.genderPlusRace[0]++;
            case "black":
              tmpData.race[1]++;
              tmpData.genderPlusRace[1]++;
            case "native":
              tmpData.race[2]++;
              tmpData.genderPlusRace[2]++;
            case "white":
              tmpData.race[3]++;
              tmpData.genderPlusRace[3]++;
            case "other":
              tmpData.race[4]++;
              tmpData.genderPlusRace[4]++;
          }
          switch (patient.ethnicity) {
            case "nonhispanic":
              tmpData.ethnicity[0]++;
              tmpData.genderPlusEthnicity[0]++;
            case "hispanic":
              tmpData.ethnicity[1]++;
              tmpData.genderPlusEthnicity[1]++;
          }
          break;
        case "F":
          tmpData.gender[1]++;
          switch (patient.race) {
            case "asian":
              tmpData.race[0]++;
              tmpData.genderPlusRace[5]++;
            case "black":
              tmpData.race[1]++;
              tmpData.genderPlusRace[6]++;
            case "native":
              tmpData.race[2]++;
              tmpData.genderPlusRace[7]++;
            case "white":
              tmpData.race[3]++;
              tmpData.genderPlusRace[8]++;
            case "other":
              tmpData.race[4]++;
              tmpData.genderPlusRace[9]++;
          }
          switch (patient.ethnicity) {
            case "nonhispanic":
              tmpData.ethnicity[0]++;
              tmpData.genderPlusEthnicity[2]++;
            case "hispanic":
              tmpData.ethnicity[1]++;
              tmpData.genderPlusEthnicity[3]++;
          }
          break;
      }
    });

    setChartData({ ...tmpData });
  }, [filteredPatients]);

  return (
    <Flex>
      <Box>
        <Box fontSize="20px" textAlign="center">
          By Gender
        </Box>
        <Flex flexDir="column">
          <Flex margin="auto">
            <MinusIcon
              color={`rgb(${colors.gender.M[0]}, ${colors.gender.M[1]}, ${colors.gender.M[2]})`}
              background={`rgb(${colors.gender.M[0]}, ${colors.gender.M[1]}, ${colors.gender.M[2]})`}
            />{" "}
            Male
          </Flex>
          <Flex margin="auto">
            <MinusIcon
              color={`rgb(${colors.gender.F[0]}, ${colors.gender.F[1]}, ${colors.gender.F[2]})`}
              background={`rgb(${colors.gender.F[0]}, ${colors.gender.F[1]}, ${colors.gender.F[2]})`}
            />{" "}
            Female
          </Flex>
        </Flex>
        <Pie
          className="genderPieChart"
          height={graphHeight}
          width={graphHeight}
          data={{
            datasets: [
              {
                label: "# of Votes",
                data: chartData.gender,
                backgroundColor: [
                  `rgba(${colors.gender.M[0]}, ${colors.gender.M[1]}, ${colors.gender.M[2]}, 0.2)`,
                  `rgba(${colors.gender.F[0]}, ${colors.gender.F[1]}, ${colors.gender.F[2]}, 0.2)`,
                ],
                borderColor: [
                  `rgb(${colors.gender.M[0]}, ${colors.gender.M[1]}, ${colors.gender.M[2]})`,
                  `rgb(${colors.gender.F[0]}, ${colors.gender.F[1]}, ${colors.gender.F[2]})`,
                ],
                borderWidth: 5,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </Box>
      <Box>
        <Box fontSize="20px" textAlign="center">
          By Race
        </Box>
        <Flex flexDir="column">
          <Flex margin="auto">
            <MinusIcon
              color={colors.race.Asian}
              background={colors.race.Asian}
            />{" "}
            Asian
          </Flex>
          <Flex margin="auto">
            <MinusIcon
              color={colors.race.Black}
              background={colors.race.Black}
            />{" "}
            Black
          </Flex>
          <Flex margin="auto">
            <MinusIcon
              color={colors.race.Native}
              background={colors.race.Native}
            />{" "}
            Native
          </Flex>
          <Flex margin="auto">
            <MinusIcon
              color={colors.race.White}
              background={colors.race.White}
            />{" "}
            White
          </Flex>
          <Flex margin="auto">
            <MinusIcon
              color={colors.race.Other}
              background={colors.race.Other}
            />{" "}
            Other
          </Flex>
        </Flex>
        <Pie
          className="racePieChart"
          height={graphHeight}
          width={graphHeight}
          data={{
            labels: ["A", "B", "C", "D", "E"],
            datasets: [
              {
                label: "# of Votes",
                data: chartData.race,
                backgroundColor: [
                  colors.race.Asian,
                  colors.race.Black,
                  colors.race.Native,
                  colors.race.White,
                  colors.race.Other,
                ],
                borderColor: [
                  colors.race.Asian,
                  colors.race.Black,
                  colors.race.Native,
                  colors.race.White,
                  colors.race.Other,
                ],
                borderWidth: 5,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                enabled: true,
              },
              legend: {
                position: "top",
                display: true,
              },
            },
          }}
        />
      </Box>
      <Box>
        <Box fontSize="20px" textAlign="center">
          By Ethnicity
        </Box>
        <Flex flexDir="column">
          <Flex margin="auto">
            <MinusIcon color="yellow" background="yellow" /> Hispanic
          </Flex>
          <Flex margin="auto">
            <MinusIcon color="white" background="white" /> Non Hispanic
          </Flex>
        </Flex>
        <Pie
          className="ethnicityPieChart"
          height={graphHeight}
          width={graphHeight}
          data={{
            datasets: [
              {
                label: "# of Votes",
                data: chartData.ethnicity,
                backgroundColor: ["ivory", "gold"],
                borderColor: ["ivory", "gold"],
                borderWidth: 5,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </Box>
      <Box>
        <Box fontSize="20px" textAlign="center">
          By Gender
        </Box>
        <Pie
          className="genderPlusRacePieChart"
          height={graphHeight}
          width={graphHeight}
          data={{
            datasets: [
              {
                label: "# of Votes",
                data: chartData.genderPlusRace,
                backgroundColor: [
                  "red",
                  "orange",
                  "yellow",
                  "green",
                  "blue",
                  "pink",
                  "purple",
                  "yellowgreen",
                  "brown",
                  "black",
                ],
                borderColor: [
                  "red",
                  "orange",
                  "yellow",
                  "green",
                  "blue",
                  "pink",
                  "purple",
                  "yellowgreen",
                  "brown",
                  "black",
                ],
                borderWidth: 5,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </Box>
      <Box>
        <Box fontSize="20px" textAlign="center">
          By Gender
        </Box>
        <Pie
          className="genderPlusEthnicityPieCharte"
          height={graphHeight}
          width={graphHeight}
          data={{
            datasets: [
              {
                label: "# of Votes",
                data: chartData.genderPlusEthnicity,
                backgroundColor: ["teal", "coral", "tan", "violet"],
                borderColor: ["teal", "coral", "tan", "violet"],
                borderWidth: 5,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </Box>
    </Flex>
  );
};
