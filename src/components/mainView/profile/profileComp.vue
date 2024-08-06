<template>
    <div class="profile-container">
        <div class="profile">
            <header class="profile__header">
                <div class="profile__avatar">
                    <h1 class="avatar-stub">{{ initials }}</h1>
                </div>
                <h1 class="profile__username">{{ fullname }}</h1>
            </header>
            <main class="profile__info">

                <!-- Birth At picker -->
                <primaryDialogComp
                :is-show="isShowDateTimePicker"
                @close="isShowDateTimePicker = false"
                >
                    <dateTimePickerComp
                    @select-date-time="(data) => selectDateTime(data)"
                     />
                </primaryDialogComp>

                <!-- Delete Profile Dialog -->
                <primaryDialogComp
                :is-show="isShowDeleteDialogWindow"
                @close="isShowDeleteDialogWindow = false"
                >
                    <deleteDialogWindowComp
                    @close="isShowDeleteDialogWindow = false"
                />
                </primaryDialogComp>

                <!-- БЛОК Учетных данных пользователя -->
                <div class="profile__chunk"> 
                    <!-- E-MAIL -->
                    <itemChunkComp
                    :item="{ id: 'email', key: 'E-mail', value: store.profileData.email }"
                    @confirm-text-data="(value) => store.profileEditData.email = value"
                    />

                    <!-- LOGIN -->
                    <itemChunkComp
                    :item="{ id: 'login', key: 'Логин', value: store.profileData.login }"
                    @confirm-text-data="(value) => store.profileEditData.login = value"
                    />

                    <!-- PHONE NUMBER -->
                    <itemChunkComp
                    :item="{ id: 'phone-number', key: 'Номер телефона', value: null /* store.profileData.phoneNumber */ }"
                    @confirm-text-data="(value) => store.profileEditData.phoneNumber = value"
                    />
                </div>

                <!-- БЛОК С Инициалами пользователя -->
                <div class="profile__chunk">
                    <!-- NAME -->
                    <itemChunkComp 
                    :item="{ id: 'name', key: 'Имя', value: store.profileData.name }"
                    @confirm-text-data="(value) => store.profileEditData.name = value"
                    />

                    <!-- LASTNAME -->
                    <itemChunkComp 
                    :item="{ id: 'lastname', key: 'Фамилия', value: store.profileData.lastname }"
                    @confirm-text-data="(value) => store.profileEditData.lastname = value"
                    />

                    <!-- SURNAME -->
                    <itemChunkComp 
                    :item="{ id: 'surname', key: 'Отчество', value: store.profileData.surname }"
                    @confirm-text-data="(value) => store.profileEditData.surname = value"
                    />
                </div>

                <!-- БЛОК С доп. информацией  -->
                <div class="profile__chunk" style="grid-column: 1 / span 2;">
                    <!-- GENDER -->
                    <itemChunkComp 
                    :item="{ id: 'gender', key: 'Пол', value: store.profileData.gender }"
                    @confirm-text-data="(value) => store.profileEditData.gender = value"
                    />

                    <!-- BIRTH AT -->
                    <itemChunkComp
                    @open-date-time-picker="isShowDateTimePicker = true"
                    :item="{ id: 'birth-at', key: 'Дата рождения', value: store.replaceDateTimeSrting(store.profileData.birthAt) }"
                    />

                    <!-- CREATED AT -->
                    <itemChunkComp 
                    :item="{ id: 'created-at', key: 'Дата создания аккаунта', value: store.replaceDateTimeSrting(store.profileData.createdAt) }"
                    />
                </div>

                <div class="profile__actions">
                    <button class="profile__action-btn save-changed"
                    v-show="changeData.isChanged"
                    @click="confirmEditData"
                    >
                            <p>Сохранить изменения ({{changeData.countFields}})</p>
                            <font-awesome-icon
                            :icon="['fas', 'floppy-disk']"
                            />
                    </button>
                    <button
                    class="profile__action-btn delete-profile"
                    @click="isShowDeleteDialogWindow = true"
                    >
                        <p>Удалить аккаунт</p>
                        <font-awesome-icon :icon="['fas', 'trash']" />
                    </button>
                </div>

            </main>
        </div>
    </div>
</template>

<script>
import itemChunkComp from './profileChunk/itemChunkComp.vue';
import { useMainStore } from '@/store/mainStore';
import { watch } from 'vue';
import primaryDialogComp from '@/components/UI/primaryDialogComp.vue';
import dateTimePickerComp from '@/components/UI/dateTimePickerComp.vue';
import deleteDialogWindowComp from '@/components/UI/deleteDialogWindowComp.vue';
import { getProfile, multipleProfileUpdate, singleProfileUpdate } from '@/api/profileApi';
export default {
    components: {
        itemChunkComp,
        primaryDialogComp,
        dateTimePickerComp,
        deleteDialogWindowComp,
    },
    data() {
        return {
            store: useMainStore(),
            isShowDateTimePicker: false,
            isShowDeleteDialogWindow: false,
            fullname: '',
            initials: '',
            changeData: {
                isChanged: false, // Было ли хотя-бы одно изменение
                multiple: false, // Было ли редактировано  более чем 1 поле
                countFields: null,  // Кол-во редактируемых полей
            },
        }
    },
    methods: {
        selectDateTime(currentDate) {
            try {
                this.isShowDateTimePicker = false;
                this.store.profileEditData.birthAt = currentDate;
            } catch (err) {
                console.error(`components/mainView/profile/profileComp: selectDateTime => ${err}`)
            }
        },
        async singleProfileUpdateVeiw() {
            try {
                const response = await singleProfileUpdate();
                this.store.profileData = response; 
            } catch (err) {
                console.error(`components/mainView/profile/profileComp: singleProfileUpdateVeiw => ${err}`)
            }
        },
        async multipleProfileUpdateVeiw() {
            try {
                const response = await multipleProfileUpdate();
                this.store.profileData = response; 
            } catch (err) {
                console.error(`components/mainView/profile/profileComp: multipleProfileUpdateVeiw => ${err}`)
            }
        },
        confirmEditData() {
            try {
                if(this.changeData.isChanged === true) {
                    // PATCH-запрос  (изменение одного поля)
                    if(this.changeData.multiple === false) {
                    singleProfileUpdate();
                    this.singleProfileUpdateVeiw();
                    } 
                    // PUT-запрос  (изменение нескольких полей)
                    else if(this.changeData.multiple === true) {
                        multipleProfileUpdate();
                        this.multipleProfileUpdateVeiw();
                    }
                }
            } catch (err) {
                console.error(`components/mainView/profile/profileComp: confirmEditData => ${err}`)
            }
        },
    },
    created() {
        watch(() => this.store.profileEditData, (newValue) => {
            try {
                const values = Object.values(newValue);
                let countFields = 0;
                values.forEach((el) => {
                    if(el !== null) {
                        countFields++;
                        this.changeData.isChanged = true;
                    }
                })
                if(countFields > 1) {
                    this.changeData.multiple = true;
                }
                this.changeData.countFields = countFields;
            } catch (err) {
                console.error(`components/mainView/profile/profileComp: created-> watch -> this.store.profileEditData => ${err}`)
            }
        }, { deep: true })
    },
    async mounted() {
        try {
            const awaitProfileData = this.store.editName();
            const response = await getProfile();
            this.store.profileData = response;
            awaitProfileData(({ fullname, initials }) => {
               this.fullname = fullname;
               this.initials = initials;
            });
        } catch (err) {
            console.error(`components/mainView/profile/profileComp: mounted => ${err}`)
        }
    }
}
</script>

<style scoped>
    .profile-container {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-family: var(--font);
    }
    .profile {
        width: 80%;
        height: max-content;
        margin: 2rem 0;
    }
    .profile__header {
        width: 100%;
        height: 200px;
        position: relative;
        display: flex;
        align-items: center;
        border-radius: var(--radius);
        background-color: var(--default-bg);
    }
    .profile__avatar {
        position: absolute;
        left: 5%;
        width: 180px;
        height: 180px;
        border-radius: 50%;
        background-color: rgb(161, 80, 161);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .avatar-stub {
        color: white;
    }
    .profile__username {
        position: absolute;
        right: 2rem;
        bottom: 1rem;
        color: var(--color-fg-header);
        margin: 0;
    }
    .profile__info{
        height: max-content;
        display: grid;
        grid-template-columns: repeat(2, minmax(100px, 1fr));
        grid-template-rows: repeat(4, minmax(100px, auto));
        gap: 1rem;
        padding: 1rem 3rem;
    }
    .profile__chunk {
        width: 100%;
        min-height: 150px;
        height: max-content;
        background-color: var(--default-bg);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius);
        align-self: start;
    }
    .profile__actions {
        width: 100%;
        height: 100%;
        grid-row: 4 / span 1;
        grid-column: 1 / span 2;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-end;
    }
    .profile__action-btn {
        height: 30px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: rgba(0,0,0,0);
        border-radius: 3px;
        cursor: pointer;
        transition: all .3s ease;
    }

    .profile__action-btn p {
        margin-right: .4rem;
        font-size: 17px;
        font-family: var(--font);
        font-weight: 300;
    }
    
    .profile__action-btn.save-changed {
        border: 1px solid rgb(109, 172, 84);
        color: rgb(119, 172, 84);
        margin-bottom: .5rem;
    }
    .profile__action-btn.delete-profile {
        border: 1px solid rgb(172, 84, 84);
        color: rgb(172, 84, 84);
    }
    .profile__action-btn.save-changed:hover {
        color: rgb(92, 209, 46);
        border-color: rgb(92, 209, 46);
        transition: all .3 ease;
    }
    .profile__action-btn.delete-profile:hover {
        border: 1px solid red;
        color: red;
        transition: all .3s ease;
    }
</style>