import {create} from "zustand";
import {createJSONStorage, persist} from 'zustand/middleware'

const userStore =
    create(
        persist(
            (set) => ({
                user: {},
                changeUser: (user) => set({user})
            }),
            {
                name: 'userData', // name of the item in the storage (must be unique)
                storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
            },
        ))

export default userStore