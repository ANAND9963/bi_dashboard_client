import React, { useState } from "react";
import Box from "@mui/material/Box";

// Assets
import backgroundImage from "../assets/5570834.jpg";
import DictaphoneIcon from "./DictaphoneIcon";
import VoiceQueryPopup from "./VoiceQueryPopup";
import  Dashboard  from "../pages/Dashboard";

function Home() {
  const [isDictaphoneOpen, setIsDictaphoneOpen] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [showPopup, setShowPopup] = useState(false);

 

  const handleTranscript = (text) => {
    setTranscript(text);
    setShowPopup(true);
  };

  const handleDictaphoneIconClick = () => {
    setIsDictaphoneOpen(!isDictaphoneOpen);
  };

    return (
        <Box sx={{ position: "relative" }}>
            {/* 🔷 This is your MAIN blurred content */}
            <Box
                sx={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    filter: showPopup ? "blur(5px)" : "none",
                    transition: "filter 0.3s ease",
                }}
            >
                <Dashboard />

                <Box
                    onClick={handleDictaphoneIconClick}
                    sx={{
                        position: "fixed",
                        bottom: isDictaphoneOpen ? "50%" : "8rem",
                        right: isDictaphoneOpen ? "50%" : "8rem",
                        transform: isDictaphoneOpen ? "translate(50%, 50%)" : "none",
                        transition: "all 0.3s ease",
                        zIndex: 10,
                    }}
                >
                    <DictaphoneIcon onTranscriptComplete={handleTranscript} />
                </Box>
            </Box>

            {/* 🟩 Place the popup OUTSIDE the blurred container */}
            {showPopup && (
                <VoiceQueryPopup
                    transcript={transcript}
                    show={showPopup}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </Box>
    );
}

export default Home;
