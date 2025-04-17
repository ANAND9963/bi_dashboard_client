import { useState, useRef } from "react";
import { Mic, Stop, Delete } from "@mui/icons-material";
import { motion } from "framer-motion";
import { IconButton, Box, Typography, CircularProgress } from "@mui/material";

export default function DictaphoneIcon({ onTranscriptComplete }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      setLoading(true);
      setTranscript("");

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        setLoading(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const audioFile = new File([audioBlob], "audio.wav", { type: "audio/wav" });

        const formData = new FormData();
        formData.append("file", audioFile);
        formData.append("model", "whisper-1");

        try {
          const response = await fetch(process.env.REACT_APP_WHISPER_ENDPOINT, {
            method: "POST",
            headers: { "api-key": process.env.REACT_APP_WHISPER_API_KEY },
            body: formData,
          });

          const result = await response.json();
          const finalText = result.text || "No speech detected.";
          setTranscript(finalText);

          // 🔥 Notify parent with transcript
          if (onTranscriptComplete) {
            onTranscriptComplete(finalText);
          }
        } catch (error) {
          console.error("Error during transcription:", error);
          setTranscript("Transcription failed.");
        } finally {
          setLoading(false);
        }
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setTranscript("Microphone access denied.");
      setLoading(false);
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
      <Box
          position="absolute"
          top="50%"
          left="50%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          zIndex={1000}
          sx={{
            transform: "translate(-50%, -50%)",
          }}
      >
        {/* Microphone Button with Dynamic Effects */}
        <motion.div
            animate={{ scale: isRecording ? 1.5 : 1 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "relative",
              background: isRecording
                  ? "linear-gradient(to top, red, white)"
                  : "linear-gradient(to top, blue, skyblue)",
              padding: isRecording ? "30px" : "15px",
              borderRadius: "50%",
              boxShadow: isRecording
                  ? "0px 0px 30px rgba(255,0,0,0.8)"
                  : "0px 0px 10px rgba(0,0,255,0.6)",
              transition: "all 0.3s ease-in-out",
              backdropFilter: isRecording ? "blur(10px)" : "none",
            }}
        >
          {isRecording && (
              <motion.div
                  initial={{ opacity: 0.5, scale: 1 }}
                  animate={{ opacity: 0, scale: 2 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 100,
                    height: 100,
                    backgroundColor: "rgba(255,0,0,0.5)",
                    borderRadius: "50%",
                  }}
              />
          )}
          <IconButton onClick={toggleRecording} color="primary">
            {isRecording ? (
                <Stop sx={{ fontSize: 50, color: "white" }} />
            ) : (
                <Mic sx={{ fontSize: 50, color: "white" }} />
            )}
          </IconButton>
        </motion.div>

        {/* Loading Indicator */}
        {loading && <CircularProgress color="secondary" />}

        {/* Transcription Display */}
        {transcript && (
            <Box
                p={2}
                borderRadius="12px"
                textAlign="center"
                bgcolor="rgba(0, 0, 0, 0.7)"
                color="white"
                boxShadow="0px 4px 10px rgba(255, 255, 255, 0.2)"
            >
              <Typography variant="body1">{transcript}</Typography>
            </Box>
        )}

        {/* Clear Transcript Button */}
        {transcript && (
            <IconButton onClick={() => setTranscript("")} color="warning">
              <Delete sx={{ fontSize: 40, color: "white" }} />
            </IconButton>
        )}
      </Box>
  );
}
