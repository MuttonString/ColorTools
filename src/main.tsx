import ReactDOM from 'react-dom/client';
import './index.css';
import i18n from './configs/i18n.ts';
import { I18nextProvider } from 'react-i18next';
import router from './configs/router.tsx';
import { RouterProvider } from 'react-router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <I18nextProvider i18n={i18n}>
    <RouterProvider router={router} />
  </I18nextProvider>
);
