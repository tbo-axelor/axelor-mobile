import {Module} from '@axelor/aos-mobile-core';

import ClientListScreen from './screens/client';
import * as clientTrainingReducers from './features';
import enTranslations from './i18n/en.json';
import {
  training_modelAPI,
  training_searchFields,
  training_sortFields,
} from './models';

export const TrainingModule: Module = {
  name: 'app-training',
  title: 'Training_Training',
  subtitle: 'Training_Training',
  icon: '123',
  menus: {
    training_menu_clients: {
      title: 'Training_Clients',
      icon: 'person-video2',
      screen: 'ClientListScreen',
    },
  },
  screens: {
    ...ClientListScreen,
  },
  reducers: {...clientTrainingReducers},
  models: {
    objectFields: {...training_modelAPI},
    sortFields: {...training_sortFields},
    searchFields: {...training_searchFields},
  },
  translations: {
    en: enTranslations,
  },
};
