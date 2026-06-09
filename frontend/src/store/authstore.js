import { use } from "react";
import {create} from "zustand";
import {persist} from "zustand/middleware";

const useAuthstore = create(persist((set) => ({
    user: null,
    role: null,

    setUser: (user) => set({ user }),
    setRole: (role) => set({ role }),

    logout: () => set({user:null,role:null}),
}),
{
    name:"auth-storage", //localstorage key
})
);

export default useAuthstore;