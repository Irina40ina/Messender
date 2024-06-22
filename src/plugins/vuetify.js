// Импорт и настройка vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi'; // Импорт иконок
import * as icons from '@mdi/js';
import { ru } from 'vuetify/locale'


export const vuetify = createVuetify({
    components,
    directives,
    locale: {
        locale: 'ru',
        messages: {
            ru
        }
    },
    icons: {
        defaultSet: 'mdi',
        aliases: {
            // Регистрация псевдонимов
            ...aliases,
            account: icons.mdiYoutube,
            medication: icons.mdiMedication,
        },
        sets: {
            mdi,
        },
    },
});
