import { Flex, Heading } from "@chakra-ui/react";

export const Hero = ({ title }) => (
  <Flex justifyContent="center" alignItems="center" height="20vh">
    <Heading
      fontSize="8vh"
      bgColor="crimson"
      bgClip="text"
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      maxW="120vh"
    >
      {title}
    </Heading>
  </Flex>
);

Hero.defaultProps = {
  title: "Hospital's Dashboard",
};
