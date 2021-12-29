import { MinusIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import { Chart, ArcElement } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

Chart.register(ArcElement);
const graphHeight = 140;
const graphMarginTop = "0px";
const graphBoxHeight = "140px";

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
      NativeM: [144, 0, 255],
      NativeF: [202, 133, 255],
      WhiteM: [0, 255, 21],
      WhiteF: [135, 255, 21],
      OtherM: [255, 0, 208],
      OtherF: [255, 130, 232],
    },
    genderPlusEthnicity: {
      NonHispanicM: [20, 168, 146],
      NonHispanicF: [181, 33, 60],
      HispanicM: [156, 67, 40],
      HispanicF: [184, 170, 119],
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
              break;
            case "black":
              tmpData.race[1]++;
              tmpData.genderPlusRace[2]++;
              break;
            case "native":
              tmpData.race[2]++;
              tmpData.genderPlusRace[4]++;
              break;
            case "white":
              tmpData.race[3]++;
              tmpData.genderPlusRace[6]++;
              break;
            case "other":
              tmpData.race[4]++;
              tmpData.genderPlusRace[8]++;
              break;
          }
          switch (patient.ethnicity) {
            case "nonhispanic":
              tmpData.ethnicity[0]++;
              tmpData.genderPlusEthnicity[0]++;
              break;
            case "hispanic":
              tmpData.ethnicity[1]++;
              tmpData.genderPlusEthnicity[2]++;
              break;
          }
          break;
        case "F":
          tmpData.gender[1]++;
          switch (patient.race) {
            case "asian":
              tmpData.race[0]++;
              tmpData.genderPlusRace[1]++;
              break;
            case "black":
              tmpData.race[1]++;
              tmpData.genderPlusRace[3]++;
              break;
            case "native":
              tmpData.race[2]++;
              tmpData.genderPlusRace[5]++;
              break;
            case "white":
              tmpData.race[3]++;
              tmpData.genderPlusRace[7]++;
              break;
            case "other":
              tmpData.race[4]++;
              tmpData.genderPlusRace[9]++;
              break;
          }
          switch (patient.ethnicity) {
            case "nonhispanic":
              tmpData.ethnicity[0]++;
              tmpData.genderPlusEthnicity[1]++;
              break;
            case "hispanic":
              tmpData.ethnicity[1]++;
              tmpData.genderPlusEthnicity[3]++;
              break;
          }
          break;
      }
    });

    setChartData({ ...tmpData });
  }, [filteredPatients]);

  const getRGB = (target) => {
    return `rgb(${target[0]}, ${target[1]}, ${target[2]})`;
  };

  const getRGBA = (target) => {
    return `rgba(${target[0]}, ${target[1]}, ${target[2]}, 0.2)`;
  };

  return (
    <Flex flexDirection="column">
      <Flex w="100%">
        <Box
          border="1px solid crimson"
          borderRadius="5px"
          boxSizing="border-box"
          w="20%"
        >
          <Box
            fontSize="16px"
            textAlign="center"
            mb="10px"
            color="crimson"
            border="1px solid crimson"
            borderRadius="5px"
          >
            By Gender
          </Box>
          <Flex flexDir="column">
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.gender.M)}
                background={getRGB(colors.gender.M)}
              />{" "}
              Male
            </Flex>
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.gender.F)}
                background={getRGB(colors.gender.F)}
              />{" "}
              Female
            </Flex>
          </Flex>
        </Box>
        <Box
          border="1px solid crimson"
          borderRadius="5px"
          boxSizing="border-box"
          w="20%"
        >
          <Box
            fontSize="16px"
            textAlign="center"
            mb="10px"
            color="crimson"
            border="1px solid crimson"
            borderRadius="5px"
          >
            By Race
          </Box>
          <Flex flexDir="column">
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.race.Asian)}
                background={getRGB(colors.race.Asian)}
              />{" "}
              Asian
            </Flex>
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.race.Black)}
                background={getRGB(colors.race.Black)}
              />{" "}
              Black
            </Flex>
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.race.Native)}
                background={getRGB(colors.race.Native)}
              />{" "}
              Native
            </Flex>
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.race.White)}
                background={getRGB(colors.race.White)}
              />{" "}
              White
            </Flex>
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.race.Other)}
                background={getRGB(colors.race.Other)}
              />{" "}
              Other
            </Flex>
          </Flex>
        </Box>
        <Box
          border="1px solid crimson"
          borderRadius="5px"
          boxSizing="border-box"
          w="20%"
        >
          <Box
            fontSize="16px"
            textAlign="center"
            mb="10px"
            color="crimson"
            border="1px solid crimson"
            borderRadius="5px"
          >
            By Ethnicity
          </Box>
          <Flex flexDir="column">
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.ethnicity.Hispanic)}
                background={getRGB(colors.ethnicity.Hispanic)}
              />{" "}
              Hispanic
            </Flex>
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.ethnicity.NonHispanic)}
                background={getRGB(colors.ethnicity.NonHispanic)}
              />{" "}
              Non Hispanic
            </Flex>
          </Flex>
        </Box>
        <Box
          border="1px solid crimson"
          borderRadius="5px"
          boxSizing="border-box"
          w="20%"
        >
          <Box
            fontSize="16px"
            textAlign="center"
            mb="10px"
            color="crimson"
            border="1px solid crimson"
            borderRadius="5px"
          >
            By Gender And Race
          </Box>
          <Flex flexDir="column">
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.genderPlusRace.AsianM)}
                background={getRGB(colors.genderPlusRace.AsianM)}
              />{" "}
              Asian Male
            </Flex>
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.genderPlusRace.AsianF)}
                background={getRGB(colors.genderPlusRace.AsianF)}
              />{" "}
              Asian Female
            </Flex>
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.genderPlusRace.BlackM)}
                background={getRGB(colors.genderPlusRace.BlackM)}
              />{" "}
              Black Male
            </Flex>
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.genderPlusRace.BlackF)}
                background={getRGB(colors.genderPlusRace.BlackF)}
              />{" "}
              Black Female
            </Flex>
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.genderPlusRace.NativeM)}
                background={getRGB(colors.genderPlusRace.NativeM)}
              />{" "}
              Native Male
            </Flex>
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.genderPlusRace.NativeF)}
                background={getRGB(colors.genderPlusRace.NativeF)}
              />{" "}
              Native Female
            </Flex>
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.genderPlusRace.WhiteM)}
                background={getRGB(colors.genderPlusRace.WhiteM)}
              />{" "}
              White Male
            </Flex>
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.genderPlusRace.WhiteF)}
                background={getRGB(colors.genderPlusRace.WhiteF)}
              />{" "}
              White Female
            </Flex>
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.genderPlusRace.OtherM)}
                background={getRGB(colors.genderPlusRace.OtherM)}
              />{" "}
              Other Male
            </Flex>
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.genderPlusRace.OtherF)}
                background={getRGB(colors.genderPlusRace.OtherF)}
              />{" "}
              Other Female
            </Flex>
          </Flex>
        </Box>
        <Box
          border="1px solid crimson"
          borderRadius="5px"
          boxSizing="border-box"
          w="20%"
        >
          <Box
            fontSize="16px"
            textAlign="center"
            mb="10px"
            color="crimson"
            border="1px solid crimson"
            borderRadius="5px"
          >
            By Gender And Ethnicity
          </Box>
          <Flex flexDir="column">
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.genderPlusEthnicity.HispanicM)}
                background={getRGB(colors.genderPlusEthnicity.HispanicM)}
              />{" "}
              Hispanic Male
            </Flex>
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.genderPlusEthnicity.HispanicF)}
                background={getRGB(colors.genderPlusEthnicity.HispanicF)}
              />{" "}
              Hispanic Female
            </Flex>
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.genderPlusEthnicity.NonHispanicM)}
                background={getRGB(colors.genderPlusEthnicity.NonHispanicM)}
              />{" "}
              Non Hispanic Male
            </Flex>
            <Flex margin="auto">
              <MinusIcon
                color={getRGB(colors.genderPlusEthnicity.NonHispanicF)}
                background={getRGB(colors.genderPlusEthnicity.NonHispanicF)}
              />{" "}
              Non Hispanic Female
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <Flex
        border="1px solid crimson"
        boxSizing="border-box"
        borderRadius="5px"
      >
        {" "}
        <Box
          border="1px solid crimson"
          boxSizing="border-box"
          height={graphBoxHeight}
          borderRadius="5px"
        >
          <Pie
            className="genderPieChart"
            height={graphHeight}
            width={graphHeight}
            style={{ marginTop: graphMarginTop }}
            data={{
              datasets: [
                {
                  label: "# of Votes",
                  data: chartData.gender,
                  backgroundColor: Object.values(colors.gender).map((item) =>
                    getRGBA(item)
                  ),
                  borderColor: Object.values(colors.gender).map((item) =>
                    getRGB(item)
                  ),
                  borderWidth: 5,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </Box>
        <Box
          border="1px solid crimson"
          boxSizing="border-box"
          borderRadius="5px"
          height={graphBoxHeight}
        >
          <Pie
            className="racePieChart"
            height={graphHeight}
            width={graphHeight}
            style={{ marginTop: graphMarginTop }}
            data={{
              labels: ["A", "B", "C", "D", "E"],
              datasets: [
                {
                  label: "# of Votes",
                  data: chartData.race,
                  backgroundColor: Object.values(colors.race).map((item) =>
                    getRGBA(item)
                  ),
                  borderColor: Object.values(colors.race).map((item) =>
                    getRGB(item)
                  ),
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
        <Box
          border="1px solid crimson"
          boxSizing="border-box"
          borderRadius="5px"
          height={graphBoxHeight}
        >
          <Pie
            className="ethnicityPieChart"
            height={graphHeight}
            width={graphHeight}
            style={{ marginTop: graphMarginTop }}
            data={{
              datasets: [
                {
                  label: "# of Votes",
                  data: chartData.ethnicity,
                  backgroundColor: Object.values(colors.ethnicity).map((item) =>
                    getRGBA(item)
                  ),
                  borderColor: Object.values(colors.ethnicity).map((item) =>
                    getRGB(item)
                  ),
                  borderWidth: 5,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </Box>
        <Box
          border="1px solid crimson"
          boxSizing="border-box"
          borderRadius="5px"
          height={graphBoxHeight}
        >
          <Pie
            className="genderPlusRacePieChart"
            height={graphHeight}
            width={graphHeight}
            style={{ marginTop: graphMarginTop }}
            data={{
              datasets: [
                {
                  label: "# of Votes",
                  data: chartData.genderPlusRace,
                  backgroundColor: Object.values(colors.genderPlusRace).map(
                    (item) => getRGBA(item)
                  ),
                  borderColor: Object.values(colors.genderPlusRace).map(
                    (item) => getRGB(item)
                  ),
                  borderWidth: 5,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </Box>
        <Box
          border="1px solid crimson"
          boxSizing="border-box"
          borderRadius="5px"
          height={graphBoxHeight}
        >
          <Pie
            className="genderPlusEthnicityPieCharte"
            height={graphHeight}
            width={graphHeight}
            style={{ marginTop: graphMarginTop }}
            data={{
              datasets: [
                {
                  label: "# of Votes",
                  data: chartData.genderPlusEthnicity,
                  backgroundColor: Object.values(
                    colors.genderPlusEthnicity
                  ).map((item) => getRGBA(item)),
                  borderColor: Object.values(colors.genderPlusEthnicity).map(
                    (item) => getRGB(item)
                  ),
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
    </Flex>
  );
};
