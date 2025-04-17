import React, { useState } from "react";
import Box from "@mui/material/Box";
import DictaphoneIcon from "./DictaphoneIcon";
import backgroundImage from "../assets/5570834.jpg";
import AppBarComponent from "./AppBarComponent";
import VoiceQueryPopup from "./VoiceQueryPopup";

function Home() {
    const [isDictaphoneOpen, setIsDictaphoneOpen] = useState(false);

    // User details
    const user = {
        firstName: "Admin",
        lastName: "Admin",
    };

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
        <Box
            sx={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Top AppBar */}
            <AppBarComponent user={user} />

            {/* Mic activation & voice popup */}
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
                {/* 🔥 Pass transcript handler */}
                <DictaphoneIcon onTranscriptComplete={handleTranscript} />
            </Box>

            {/* Chart/Table Popup */}
            <VoiceQueryPopup
                transcript={transcript}
                show={showPopup}
                onClose={() => setShowPopup(false)}
            />
        </Box>
    );
}

export default Home;
