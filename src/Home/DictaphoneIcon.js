import { useState, useRef } from "react";
import { Mic } from "@mui/icons-material";
import { motion } from "framer-motion";
import { IconButton, Box } from "@mui/material";

export default function DictaphoneIcon() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const audioFile = new File([audioBlob], "audio.wav", { type: "audio/wav" });

        const formData = new FormData();
        formData.append("file", audioFile);
        formData.append("model", "whisper-1");

        try {
          const response = await fetch(process.env.REACT_APP_WHISPER_ENDPOINT, {
            method: "POST",
            headers: {
                "api-key": process.env.REACT_APP_WHISPER_API_KEY,
              },
            body: formData,
          });

          const result = await response.json();
          console.log("Transcribed Text (Azure AI Foundry):", result.text);
        } catch (error) {
          console.error("Error during transcription:", error);
        }
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsRecording((prev) => !prev);
  };

  return (
    <Box position="relative" width="100vw" height="100vh">
      <Box
        position="absolute"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="1rem"
        padding="4rem"
        borderRadius="1rem"
        border="1px solid gray"
        sx={{ backdropFilter: "blur(0.1rem)" }}
      >
        <motion.div
          animate={{ scale: isRecording ? 1.5 : 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "relative",
            background: "linear-gradient(to top, blue, white)",
            padding: "20px",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          {isRecording && (
            <motion.div
              initial={{ opacity: 0.5, scale: 1 }}
              animate={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 80,
                height: 80,
                backgroundColor: "red",
                borderRadius: "50%",
              }}
            />
          )}
          <IconButton onClick={toggleRecording} color={isRecording ? "error" : "primary"}>
            <Mic sx={{ fontSize: 80 }} />
          </IconButton>
        </motion.div>
      </Box>
    </Box>
  );
}
