import { useState, useRef } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { Mic, Stop, Delete } from "@mui/icons-material";
import { motion } from "framer-motion";
import { IconButton, Box, Typography, CircularProgress } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dictaphone() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const recognizerRef = useRef(null);

  const startRecording = () => {
    setLoading(true);
    setTranscript(""); // Clear previous transcription

    const speechConfig = sdk.SpeechConfig.fromSubscription(
      process.env.REACT_APP_AZURE_SPEECH_KEY,
      process.env.REACT_APP_AZURE_REGION
    );
    speechConfig.speechRecognitionLanguage = "en-US";

    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    recognizerRef.current = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizerRef.current.startContinuousRecognitionAsync();

    recognizerRef.current.recognizing = (_, event) => {
      setLoading(false);
      setTranscript((prev) => prev + " " + event.result.text);
    };

    recognizerRef.current.recognized = (_, event) => {
      if (event.result.reason === sdk.ResultReason.RecognizedSpeech) {
        setTranscript((prev) => prev + " " + event.result.text);
      }
    };
  };

  const stopRecording = () => {
    if (recognizerRef.current) {
      recognizerRef.current.stopContinuousRecognitionAsync();
      recognizerRef.current = null;
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
      position="relative"
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ background: "linear-gradient(to right, #1a2a6c, #b21f1f, #fdbb2d)" }}
    >
      <Box
        position="absolute"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="1rem"
        padding="3rem"
        borderRadius="1rem"
        border="1px solid gray"
        sx={{
          backdropFilter: "blur(0.3rem)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Microphone Animation */}
        <motion.div
          animate={{ scale: isRecording ? 1.2 : 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "relative",
            background: isRecording ? "linear-gradient(to top, red, white)" : "linear-gradient(to top, blue, white)",
            padding: "20px",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: isRecording ? "0px 0px 20px red" : "0px 0px 10px blue",
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
                backgroundColor: "red",
                borderRadius: "50%",
              }}
            />
          )}
          <IconButton onClick={toggleRecording} color={isRecording ? "error" : "primary"}>
            {isRecording ? <Stop sx={{ fontSize: 80 }} /> : <Mic sx={{ fontSize: 80 }} />}
          </IconButton>
        </motion.div>

        {/* Loading Indicator */}
        {loading && <CircularProgress color="secondary" />}

        {/* Display Transcription */}
        {transcript && (
          <Box
            mt={2}
            p={2}
            width="80%"
            bgcolor="rgba(255, 255, 255, 0.2)"
            borderRadius="8px"
            textAlign="center"
          >
            <Typography variant="h6" color="white">
              {transcript}
            </Typography>
          </Box>
        )}

        {/* Clear Transcript Button */}
        {transcript && (
          <IconButton onClick={() => setTranscript("")} color="warning">
            <Delete sx={{ fontSize: 40 }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

