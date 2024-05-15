import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storage } from "./useUser";

export const useUserStore = create(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        removeUser: () => set({ user: null }),
        getMe: async (callback) => {
          try {
            const response = await fetch("/api/v1/user/me", {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
  
            if (!response.ok) {
              if (callback) callback();
              throw new Error(data.message || "An error occurred");
            }
  
            set({ user: data });
          } catch (e) {
            // console.log(e);
            // toast.error(e.message);
            set({ user: null });
          }
        },
      }),
      {
        name: "play-ai-leaderboard",
        storage: createJSONStorage(() => storage)
      }
    )
  );