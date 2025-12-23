import { useTranslation } from 'react-i18next';
import styles from './index.module.less';
import { FrownOutlined } from '@ant-design/icons';

const Error = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.error}>
      <FrownOutlined />
      {t('error.notFound')}
    </div>
  );
};

export default Error;
