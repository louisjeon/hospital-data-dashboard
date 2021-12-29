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
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                ],
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
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
                  "yellow",
                  "black",
                  "darkred",
                  "white",
                  "green",
                ],
                borderColor: ["yellow", "black", "darkred", "white", "green"],
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
