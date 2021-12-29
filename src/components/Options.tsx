import { Flex, Select } from "@chakra-ui/react";

export const Options = ({
  setPerPage,
  setCurrentPage,
  setSortingCategory,
  setSortingDirection,
  setFilters,
}) => {
  const [
    setGenderFilter,
    setAgeFilter,
    setRaceFilter,
    setEthnicityFilter,
    setIsDeathFilter,
  ] = setFilters;

  const handlePerPageLimitChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSortingCategoryChange = (e) => {
    setSortingCategory(e.target.value);
  };

  const handleSortingDirectionChange = (e) => {
    setSortingDirection(Number(e.target.value));
  };

  const handleGenderFilterChange = (e) => {
    setGenderFilter(e.target.value);
  };
  const handleAgeFilterChange = (e) => {
    setAgeFilter(e.target.value);
  };
  const handleRaceFilterChange = (e) => {
    setRaceFilter(e.target.value);
  };
  const handleEthnicityFilterChange = (e) => {
    setEthnicityFilter(e.target.value);
  };
  const handleIsDeathFilterChange = (e) => {
    setIsDeathFilter(e.target.value);
  };

  return (
    <>
      <Flex>
        <Select size="md" onChange={handlePerPageLimitChange}>
          <option value={20} defaultChecked>
            20 items per page
          </option>
          <option value={40}>40 items per page</option>
          <option value={80}>80 items per page</option>
          <option value={160}>160 items per page</option>
        </Select>
        <Select size="md" onChange={handleSortingCategoryChange}>
          <option value="id" defaultChecked>
            Sort by ID
          </option>
          <option value="gender">Sort by Gender</option>
          <option value="birthDate">Sort by Birth Date</option>
          <option value="age">Sort by Age</option>
          <option value="race">Sort by Race</option>
          <option value="ethnicity">Sort by Ethnicity</option>
          <option value="isDeath">Sort by Aliveness</option>
        </Select>
        <Select size="md" onChange={handleSortingDirectionChange}>
          <option value={0} defaultChecked>
            Low to High
          </option>
          <option value={1}>High to Low</option>
        </Select>
      </Flex>
      <Flex>
        <Select
          size="md"
          onChange={handleGenderFilterChange}
          placeholder="Gender Filter"
        >
          <option value="M">Male</option>
          <option value="F">Female</option>
        </Select>
        <Select
          size="md"
          onChange={handleAgeFilterChange}
          placeholder="Age Filter"
        >
          <option value={0}>0~9</option>
          <option value={10}>10~19</option>
          <option value={20}>20~29</option>
          <option value={30}>30~39</option>
          <option value={40}>40~59</option>
          <option value={50}>50~59</option>
          <option value={60}>60~69</option>
          <option value={70}>70+</option>
        </Select>
        <Select
          size="md"
          onChange={handleRaceFilterChange}
          placeholder="Race Filter"
        >
          <option value="asian">Asian</option>
          <option value="black">Black</option>
          <option value="native">Native</option>
          <option value="white">White</option>
          <option value="other">Other</option>
        </Select>
        <Select
          size="md"
          onChange={handleEthnicityFilterChange}
          placeholder="Ethnicity Filter"
        >
          <option value="nonhispanic">Non hispanic</option>
          <option value="hispanic">Hispanic</option>
        </Select>
        <Select
          size="md"
          onChange={handleIsDeathFilterChange}
          placeholder="Death Filter"
        >
          <option value="true">Dead</option>
          <option value="false">Alive</option>
        </Select>
      </Flex>
    </>
  );
};
