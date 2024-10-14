import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";

const Home: React.FC = () => { 
  // React.FC (or React.FunctionComponent) is a type definition for functional components in TypeScript. 
  // It provides type-checking and better autocompletion for props within the component.
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
   // The Box component is a generic, theme-aware container with access to CSS utilities from MUI System.
    <Box width={isBelowMd ? "80%" : "60%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box>
          <TypingAnim />
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            felxDirection: { md: "row", xs: "column", sm: "column" },
            gap: 5,
            my: 10,
          }}
        >
          <img
            src="robot.png"
            alt="robot"
            style={{ width: "200px", margin: "auto" }}
          />
          <img
            className="image-inverted rotate"
            src="openai.png"
            alt="openai"
            style={{ width: "200px", margin: "auto" }}
          />
        </Box>
        <Box sx={{ display: "flex", width: "100%", mx: "auto" }}>
          <img
            src="chat.png"
            alt="chatbot"
            style={{
              display: "flex",
              margin: "auto",
              width: "60%",
              borderRadius: 20,
              boxShadow: "-5px -5x 105px #64f3d5",
              marginTop: 20,
              marginBottom: 20,
            }}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
