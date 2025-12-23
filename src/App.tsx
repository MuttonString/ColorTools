import {
  Button,
  ConfigProvider,
  Flex,
  Layout,
  Menu,
  Popover,
  Radio,
  Tooltip,
  theme as antdTheme,
} from 'antd';
import styles from './App.module.less';
import { useTranslation } from 'react-i18next';
import {
  BilibiliFilled,
  GithubFilled,
  GlobalOutlined,
  MoonOutlined,
  SunOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import { AUTO, LANG, THEME } from './constant';
import { Outlet } from 'react-router';

const { Header, Content, Footer } = Layout;
const html = document.querySelector('html')!;
const media = window.matchMedia('(prefers-color-scheme: dark)');

const App = () => {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<THEME | typeof AUTO>();
  const [lang, setLang] = useState<LANG | typeof AUTO>();
  const [isDark, setIsDark] = useState(false);

  const handleAutoTheme = () => {
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  };

  const handleThemeChange = useCallback((val: THEME | typeof AUTO) => {
    if (val === AUTO) {
      localStorage.removeItem('theme');
      media.addEventListener('change', handleAutoTheme);
      handleAutoTheme();
    } else {
      localStorage.setItem('theme', val);
      setIsDark(val === THEME.DARK);
      media.removeEventListener('change', handleAutoTheme);
    }
    setTheme(val);
  }, []);

  const handleAutoLang = useCallback(() => {
    const language = navigator.language || navigator.languages[0];
    if (language.startsWith('zh')) {
      if (['zh-TW', 'zh-HK', 'zh-MO', 'zh-Hant'].includes(language)) {
        i18n.changeLanguage(LANG.ZH_HANT);
        html.lang = LANG.ZH_HANT;
      } else {
        i18n.changeLanguage(LANG.ZH_HANS);
        html.lang = LANG.ZH_HANS;
      }
    } else if (language.startsWith('ja')) {
      i18n.changeLanguage(LANG.JA);
      html.lang = LANG.JA;
    } else {
      i18n.changeLanguage(LANG.EN);
      html.lang = LANG.EN;
    }
  }, [i18n]);

  const handleLangChange = useCallback(
    (val: LANG | typeof AUTO) => {
      if (val === AUTO) {
        localStorage.removeItem('lang');
        addEventListener('languagechange', handleAutoLang);
        handleAutoLang();
      } else {
        localStorage.setItem('lang', val);
        i18n.changeLanguage(val);
        html.lang = val;
        removeEventListener('languagechange', handleAutoLang);
      }
      setLang(val);
    },
    [handleAutoLang, i18n]
  );

  useEffect(() => {
    let themeCfg = localStorage.getItem('theme');
    if (!Object.values(THEME).includes(themeCfg as THEME)) {
      themeCfg = AUTO;
    }
    setTheme(themeCfg as THEME);
    handleThemeChange(themeCfg as THEME);

    return () => {
      media.removeEventListener('change', handleAutoTheme);
    };
  }, [handleThemeChange]);

  useEffect(() => {
    let langCfg = localStorage.getItem('lang');
    if (!Object.values(LANG).includes(langCfg as LANG)) {
      langCfg = AUTO;
    }
    setLang(langCfg as LANG);
    handleLangChange(langCfg as LANG);

    return () => {
      removeEventListener('languagechange', handleAutoLang);
    };
  }, [handleAutoLang, handleLangChange]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
        token: {
          borderRadius: 16,
          colorPrimary: isDark ? '#49aa19' : '#55992e',
        },
        components: {
          Tooltip: {
            borderRadius: 8,
            colorBgSpotlight: '#0000007f',
          },
        },
      }}
    >
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <Flex justify='space-between'>
            <Menu mode='horizontal' items={[]} />
            <Flex gap={16}>
              <Radio.Group
                value={theme}
                onChange={(e) => {
                  handleThemeChange(e.target.value);
                }}
                optionType='button'
                buttonStyle='solid'
              >
                <Tooltip title={t('layout.light')}>
                  <Radio.Button value={THEME.LIGHT}>
                    <SunOutlined />
                  </Radio.Button>
                </Tooltip>
                <Tooltip title={t('layout.auto')}>
                  <Radio.Button value={AUTO}>
                    <SyncOutlined />
                  </Radio.Button>
                </Tooltip>
                <Tooltip title={t('layout.dark')}>
                  <Radio.Button value={THEME.DARK}>
                    <MoonOutlined />
                  </Radio.Button>
                </Tooltip>
              </Radio.Group>

              <Tooltip title={t('layout.lang')}>
                <Popover
                  trigger='click'
                  title={t('layout.lang')}
                  content={
                    <Radio.Group
                      value={lang}
                      onChange={(e) => {
                        handleLangChange(e.target.value);
                      }}
                      vertical
                      options={[
                        { label: t('layout.auto'), value: AUTO },
                        {
                          label: <span lang='zh-Hans'>简体中文</span>,
                          value: LANG.ZH_HANS,
                        },
                        {
                          label: <span lang='zh-Hant'>繁體中文</span>,
                          value: LANG.ZH_HANT,
                        },
                        {
                          label: <span lang='en'>English</span>,
                          value: LANG.EN,
                        },
                        {
                          label: <span lang='ja'>日本語</span>,
                          value: LANG.JA,
                        },
                      ]}
                    />
                  }
                >
                  <Button>
                    <GlobalOutlined />
                  </Button>
                </Popover>
              </Tooltip>
            </Flex>
          </Flex>
        </Header>
        <Content className={styles.content}>
          <Outlet />
        </Content>
        <Footer className={styles.footer}>
          <Flex gap={16} justify='center'>
            <div>{t('layout.about')}</div>
            <a
              href='https://github.com/MuttonString'
              target='_blank'
              rel='noopener noreferrer'
            >
              <GithubFilled />
            </a>
            <a
              href='https://space.bilibili.com/443917667'
              target='_blank'
              rel='noopener noreferrer'
            >
              <BilibiliFilled />
            </a>
          </Flex>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
