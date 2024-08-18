import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";


const defaultDataStore = create(
    persist(
        (set) => ({

            category: [],
            changeCategory: (category) => set({category}),
            // Add more data fields here
        }),
        {
            name: 'default-data-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    )
)
export default  defaultDataStore