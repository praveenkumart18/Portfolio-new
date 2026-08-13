import SpotlightCursor from "./SpotlightCursor";

function AmbientBackground() {
  return (
    <div className="ambient-layer" aria-hidden="true">
      <div className="particle-field" />
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <SpotlightCursor />
    </div>
  );
}

export default AmbientBackground;
