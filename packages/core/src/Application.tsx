import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import axios from 'axios';
import {
  ConfigProvider,
  lightTheme,
  OutsideAlerterProvider,
  ThemeProvider,
  Theme,
  LoadingIndicator,
  HeaderIndicator,
} from '@aos-mobile/ui';
import {ErrorBoundary} from '@aos-mobile/error';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './RootNavigator';
import {Module} from './Module';
import Translator from './i18n/component/Translator';
import {configI18n} from './i18n/i18n';
import enTranslation from './i18n/translations/en.json';
import frTranslation from './i18n/translations/fr.json';
import {getActiveUserId} from './api/login-api';
import ErrorScreen from './screens/ErrorScreen';
import {Scanner} from './components';
import {configGlobalStore} from './store';

const ApplicationContext = createContext(null);

interface ApplicationProps {
  modules: [Module];
  mainMenu: string;
  additionalsReducers?: any;
  version: string;
  themes?: Theme[];
  defaultTheme?: Theme;
}

const Application = ({
  modules: modulesProvided,
  mainMenu,
  additionalsReducers,
  version,
  themes,
  defaultTheme,
}: ApplicationProps) => {
  const modules = useRef(modulesProvided).current;

  const toastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={[styles.success, styles.toast]}
        contentContainerStyle={styles.toastContent}
        text1Style={styles.title}
        text2Style={styles.detail}
        text2NumberOfLines={3}
      />
    ),
    error: props => (
      <ErrorToast
        {...props}
        style={[styles.error, styles.toast]}
        contentContainerStyle={styles.toastContent}
        text1Style={styles.title}
        text2Style={styles.detail}
        text2NumberOfLines={3}
      />
    ),
  };

  const [loading, setLoading] = useState(true);

  const appTranslations = useMemo(
    () =>
      modules.reduce(
        (translations, _module) => ({
          en: {...translations.en, ..._module.translations?.en},
          fr: {...translations.fr, ..._module.translations?.fr},
        }),
        {en: enTranslation, fr: frTranslation},
      ),
    [modules],
  );

  useEffect(() => {
    configI18n({
      resources: [
        {lng: 'en', translationsObject: appTranslations.en},
        {lng: 'fr', translationsObject: appTranslations.fr},
      ],
    });
    setLoading(false);
    // I18n should be initialize only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const externalsReducers = useMemo(
    () =>
      modules.reduce(
        (reducers, _module) => ({...reducers, ..._module.reducers}),
        {
          ...additionalsReducers,
        },
      ),
    [additionalsReducers, modules],
  );

  const store = useMemo(
    () => configGlobalStore(externalsReducers),
    [externalsReducers],
  );

  const traceBackPutMethod = useCallback(({additionalURL, data}) => {
    return axios.put(additionalURL, {data: data});
  }, []);

  if (loading) {
    return null;
  }

  return (
    <ApplicationContext.Provider value={{}}>
      <Provider store={store}>
        <OutsideAlerterProvider>
          <ThemeProvider themes={themes} defaultTheme={defaultTheme}>
            <ConfigProvider>
              <Scanner />
              <Translator />
              <ErrorBoundary
                errorScreen={ErrorScreen}
                userIdfetcher={getActiveUserId}
                putMethod={traceBackPutMethod}>
                <NavigationContainer>
                  <HeaderIndicator />
                  <LoadingIndicator />
                  <RootNavigator
                    modules={modules}
                    mainMenu={mainMenu}
                    version={version}
                  />
                </NavigationContainer>
              </ErrorBoundary>
              <Toast config={toastConfig} />
            </ConfigProvider>
          </ThemeProvider>
        </OutsideAlerterProvider>
      </Provider>
    </ApplicationContext.Provider>
  );
};

const styles = StyleSheet.create({
  error: {
    borderLeftColor: lightTheme.colors.errorColor.background,
  },
  success: {
    borderLeftColor: lightTheme.colors.primaryColor.background,
  },
  toast: {
    width: '90%',
    height: 90,
  },
  toastContent: {
    paddingVertical: 5,
  },
  title: {
    fontSize: 18,
    color: lightTheme.colors.text,
    flex: 1,
  },
  detail: {
    fontSize: 16,
    color: lightTheme.colors.text,
    flex: 3,
  },
});

export default Application;
