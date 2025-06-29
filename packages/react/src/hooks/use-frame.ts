import { useContext } from "react";
import { FrameContext } from "../contexts/frame-context";

export const useFrame = () => useContext(FrameContext);
