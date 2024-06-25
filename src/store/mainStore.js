import { defineStore } from "pinia";

export const useMainStore = defineStore("useMainStore", {
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
      },
    };
  },
  getters: {},
  actions: {
    excludeNullableFields(obj) {
      const filteredObj = Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => {
          if (value !== null && value !== undefined) {
            return true;
          } else {
            return false;
          }
        })
      );
      return filteredObj;
    },
    resetPhoneNumberMask(number) {
        let sourceNumber = number.split('');
        let readyValue = [];
        let excludedChars = '+()- '
        sourceNumber.forEach((char) => {
            if (!excludedChars.includes(char)) {
                readyValue.push(char);
            }
        })
        return readyValue.join('').slice(1);
    }
  },
});
