import { defineStore } from "pinia";
import moment from "@/plugins/momentPlugin";

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
      user: null,

      chatData: {
        chatId: null,
        isShowNotice: true,
        isShowChat: false,
        toUserId: null,
      },
      messages: [],
      chats: [],
    };
  },
  getters: {},
  actions: {
    excludeNullableFields(obj) {
      try {
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
      } catch (err) {
        console.error(`/store/mainStore.js: excludeNullableFields => ${err}`)
      }
    },
    resetPhoneNumberMask(number) {
      try {
        let sourceNumber = number.split("");
        let readyValue = [];
        let excludedChars = "+()- ";
        sourceNumber.forEach((char) => {
          if (!excludedChars.includes(char)) {
            readyValue.push(char);
          }
        });
        return readyValue.join("").slice(1);
      } catch (err) {
        console.error(`/store/mainStore.js: resetPhoneNumberMask => ${err}`)
      }
    },
    replaceDateTimeSrting(dateTime, template, utcOffset) {
      try {
        if (utcOffset) {
          return moment(dateTime)
            .utcOffset(utcOffset)
            .format(template ?? "HH:mm:ss / ll");
        } else {
          return moment(dateTime)
            .utcOffset("+03:00")
            .format(template ?? "HH:mm:ss / ll");
        }
      } catch (err) {
        console.error(`/store/mainStore.js: replaceDateTimeSrting => ${err}`)
      }
    },
    messageTimeCreatedSrting(time, utcOffset) {
      try {
        if (utcOffset) {
          return moment(time).utcOffset(utcOffset).format("HH:mm");
        } else {
          return moment(time).utcOffset("+03:00").format("HH:mm");
        }
      } catch (err) {
        console.error(`/store/mainStore.js: messageTimeCreatedSrting => ${err}`)
      }
    },
    editName() {
      try {
        let fullname = "";
        let firstLetter = "";
        let secondLetter = "";
        let initials = "";
  
        const awaitData = (callback) => {
          fullname = `${this.profileData.name} ${this.profileData.lastname} ${this.profileData.surname}`;
          if (this.profileData.name !== null) {
            firstLetter = this.profileData.name.slice(0, 1).toUpperCase();
          }
          if (this.profileData.lastname !== null) {
            secondLetter = this.profileData.lastname.slice(0, 1).toUpperCase();
          }
          initials = firstLetter + secondLetter + "";
          return callback({ fullname, initials });
        };
        return awaitData;
      } catch (err) {
        console.error(`/store/mainStore.js: editName => ${err}`)
      }
    },
    extractUsernameByChatId(id) {
      try {
        const searchedChat = this.chats.find((element) => {
          if(element.id == id) {
            return element;
          }
        });
        const userName = searchedChat.users[0].name;
        const userLastname = searchedChat.users[0].lastname;
        return { userName, userLastname, chat: searchedChat };
      } catch (err) {
        console.error(`/store/mainStore.js: extractUsernameByChatId => ${err}`)
      }
    },
    // extractUsernameByChatId(id) {
    //   return new Promise((resolve, reject) => {
    //     while (Infinity) {
    //       if (this.chats.length > 0) break;
    //     }
    //     const searchedChat = this.chats.find((element) => {
    //       if (element.id == id) {
    //         return true;
    //       }
    //     });
    //     const userName = searchedChat.users[0].name;
    //     const userLastname = searchedChat.users[0].lastname;
    //     resolve({ userName, userLastname });
    //   });
    // },
    editSelectedMessageView(id, messageObj) {
      try {
        this.messages.forEach((message) => {
          if(message && message.id === id) {
            message.content = messageObj.content;
            message.updatedAt = messageObj.updatedAt;
            message.edited = messageObj.edited;
          }
        });
      } catch (err) {
        console.error(`/store/mainStore.js: editSelectedMessageView => ${err}`)
      }
    },

    // // Удаление сообщений из массива
    // deleteSelectedMessages(arrayMessagesId) {
    //   this.messages = this.messages.filter((el)=> {
    //     if(arrayMessagesId.includes(el.id)) {
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   })
    // },

    deleteSelectedMessages(arrayMessagesId) {
      try {
        let arrayIndex = [];
        this.messages.forEach((el, index)=> {
          if(arrayMessagesId.includes(el.id)) {
            arrayIndex.push(index);
          }
        })
        this.messages = this.removeElementsByIndices(this.messages, arrayIndex);
      } catch (err) {
        console.error(`/store/mainStore.js: deleteSelectedMessages => ${err}`)
      }
    },
    // Сортировка индексов удаляемых сообщений
    removeElementsByIndices(arr, indices) {
      // Сортируем индексы в порядке убывания
      try {
        indices.sort((a, b) => b - a);
      
        // Удаляем элементы по индексам
        for (const index of indices) {
          if (index >= 0 && index < arr.length) {
            arr.splice(index, 1);
          }
        }    
        return arr;
      } catch (err) {
        console.error(`/store/mainStore.js: removeElementsByIndices => ${err}`)
      }
    }
  },  

});