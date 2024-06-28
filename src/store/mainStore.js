import { defineStore } from "pinia";
import moment from '@/plugins/momentPlugin';

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
        let sourceNumber = number.split("");
        let readyValue = [];
        let excludedChars = "+()- ";
        sourceNumber.forEach((char) => {
            if (!excludedChars.includes(char)) {
            readyValue.push(char);
            }
        });
        return readyValue.join("").slice(1);
    },
    replaceDateTimeSrting(dateTime, template, utcOffset) {
      if(utcOffset) {
        return moment(dateTime).utcOffset(utcOffset).format(template ?? 'HH:mm:ss / ll');    
      } else {
        return moment(dateTime).utcOffset('+03:00').format(template ?? 'HH:mm:ss / ll');    
      }
    },
    // editName() {
    //   let fullname = `${this.profileData.name} ${this.profileData.lastname} ${this.profileData.surname}`;
    //   let firstLetter = '';
    //   let secondLetter = '';
    //   if(this.profileData.name !== null) {
    //     firstLetter = this.profileData.name.slice(0,1).toUpperCase();
    //   } 
    //   if(this.profileData.lastname !== null) {
    //     secondLetter = this.profileData.lastname.slice(0,1).toUpperCase();
    //   }
    //   let initials = firstLetter + secondLetter + '';
    //   return { fullname, initials }
    // }
  },
});
