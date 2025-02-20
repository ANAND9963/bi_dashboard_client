import { useState, useRef } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { Mic } from "@mui/icons-material";
import { motion } from "framer-motion";
import { IconButton, Box } from "@mui/material";


export default function DictaphoneIcon() {
  const [isRecording, setIsRecording] = useState(false);
  const recognizerRef = useRef(null);


  const startRecording = () => {
    const speechConfig = sdk.SpeechConfig.fromSubscription(
        process.env.REACT_APP_AZURE_SPEECH_KEY,
        process.env.REACT_APP_AZURE_REGION
      );
    speechConfig.speechRecognitionLanguage = "en-US";
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    recognizerRef.current = new sdk.SpeechRecognizer(speechConfig, audioConfig);


    recognizerRef.current.startContinuousRecognitionAsync();
    recognizerRef.current.recognizing = (_, event) => {
      console.log("Recognizing:", event.result.text);
    };
    recognizerRef.current.recognized = (_, event) => {
      if (event.result.reason === sdk.ResultReason.RecognizedSpeech) {
        console.log("Transcribed Text:", event.result.text);
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
