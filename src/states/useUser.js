import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CloudStorage, postEvent } from "@tma.js/sdk-react";

const tgStorage = new CloudStorage("6.10", () => Math.random().toString(), postEvent)

export const storage = {
    getItem: async(key) =>{
        return await tgStorage.get(key)
    },
    setItem: async (key, value,) => {
        return await tgStorage.set(key, value)
    },
    deleteItem: async (key) =>{
        return await tgStorage.delete(key)
    },
    clear: async () =>{
        const keys = await tgStorage.getKeys();
        return tgStorage.delete(keys)
    }
}

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
        name: "play-ai-user",
        storage: createJSONStorage(() => storage)
      }
    )
  );
  