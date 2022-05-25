import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import { Button, Card, Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { checkUser, getUserName, registerUser } from '../store/userSlice';
import { useTranslation } from 'react-i18next';

const Home: NextPage = () => {
  const name = useAppSelector(getUserName);
  const [localName, setLocalName] = useState(name);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    if (uid) {
      dispatch(checkUser(uid));
    }
  }, []);
  const handleEnterName = () => {
    dispatch(registerUser(localName));
  };
  const content = name
    ?
    <div>
      <div>{ t('greeting') } { name }</div>
    </div>
    :
    <div className={styles['login-content']}>
      <Input
        className={styles['name-input']}
        placeholder={t('username')}
        value={localName}
        onChange={(e) => setLocalName(e.target.value)}
      />
      <Button disabled={!localName} type="primary" shape="circle" icon={<ArrowRightOutlined />} onClick={handleEnterName} />
    </div>;

  return (
    <div className={styles.root} >
      <Card className={styles['login-card']}>
        { content }
      </Card>
    </div>
  );
};

export default Home;
