import create from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create(
  devtools((set) => ({
    debug: false,
    color: "#ffffff",
    runVelocity: 5,
    changeDebug: (isDebug, color, runVelocity) =>
      set((state) => ({ debug: isDebug, color, runVelocity })),
  }))
);
