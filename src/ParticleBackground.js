import Particles from "react-tsparticles";
import particlesConfig from ".././src/config/particle-config";

export default function ParticleBackground() {
    return (
        <Particles
        id="tsparticles"
        options={particlesConfig}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none", // allow clicks to pass through
        }}
      />
    );
}