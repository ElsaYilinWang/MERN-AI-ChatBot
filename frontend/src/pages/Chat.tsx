import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";

const chatMessages = [
  {
    role: "user",
    content: "Hello, can you help me with something?",
  },
  {
    role: "assistant",
    content: "Of course! What do you need assistance with?",
  },
  {
    role: "user",
    content: "I'm trying to understand how arrays work in JavaScript.",
  },
  {
    role: "assistant",
    content:
      "An array in JavaScript is a data structure that can hold multiple values, and you can access these values using their index. Would you like an example?",
  },
  {
    role: "user",
    content: "Yes, that would be great!",
  },
  {
    role: "assistant",
    content:
      "Sure! Here’s a simple example:\n```javascript\nlet fruits = ['apple', 'banana', 'cherry'];\nconsole.log(fruits[0]); // Outputs 'apple'\n```\nDoes this make sense?",
  },
  {
    role: "user",
    content: "Yes, thank you! That really helps.",
  },
];

const Chat = () => {
  const auth = useAuth();
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "felx", sm: "none", xs: "none" },
          felx: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17, 29, 39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1][0]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBOT...
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask questions but please avoid sharing personal information.
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "felx",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
