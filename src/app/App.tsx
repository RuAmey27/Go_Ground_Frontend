import {Suspense, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import axios from 'axios';
import {I18nProvider} from '../_metronic/i18n/i18nProvider';
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core';
import {MasterInit} from '../_metronic/layout/MasterInit';
import {AuthInit} from './modules/auth';
import {ThemeModeProvider} from '../_metronic/partials';
const API_URL = import.meta.env.VITE_APP_API_URL
const App = () => {

  // Fetch and store CSRF token on app initialization
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(`${API_URL}/csrf`, { withCredentials: true });
        // Store CSRF token in localStorage
        console.log(response.data);
        localStorage.setItem('X-XSRF-TOKEN', response.data.token);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <ThemeModeProvider>
            <AuthInit>
              <Outlet />
              <MasterInit />
            </AuthInit>
          </ThemeModeProvider>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  );
};

export {App};
