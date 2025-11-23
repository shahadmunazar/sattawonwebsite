// src/pages/Home.tsx
import React from "react";
import ResultOpen from "./homepages/ResultOpen";
import TodayYesterdayCharts from "./homepages/TodayYesterdayCharts";
import ChartsOfResults from "./homepages/ChartsOfresults";
import { Box } from "@mui/material";
// import PlayGame from "./PlayGame";

const Home: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "#F0F8FF", minHeight: "100vh", padding: "20px" }}>
      <ResultOpen />
      <div>
        {/* <PlayGame/> */}
        <TodayYesterdayCharts />
        <ChartsOfResults />
      </div>
    </Box>
  );
};

export default Home;
