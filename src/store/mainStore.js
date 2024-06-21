
import { defineStore } from 'pinia';


export const useMainStore = defineStore('useMainStore', {
    state: () => {
        return {
            isAuth: false,
            profileData: {
                id: null,
                avatar: null,
                birthAt: null,
                createdAt: null, 
                deletedAt: null, 
                email: null, 
                gender: null, 
                lastname: null,
                surname: null,
                login: null,
                name: null,
                phoneNumber: null,
                updatedAt: null,
                userId: null,
            },
            profileEditData: {
                avatar: null,
                birthAt: null,
                email: null, 
                gender: null, 
                lastname: null,
                surname: null,
                login: null,
                name: null,
                phoneNumber: null,
            }
        }
    },
    getters: {
 
    },
    actions: {
 
    }
});


