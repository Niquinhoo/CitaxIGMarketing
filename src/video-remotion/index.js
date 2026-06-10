import { registerRoot, Composition } from "remotion";
import { VideoComposition } from "./VideoComposition";

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="PromoVideo"
        component={VideoComposition}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          businessName: "Citax Peluquería",
          accentColor: "#1d4ed8"
        }}
      />
    </>
  );
}

registerRoot(RemotionRoot);
