import { useEffect } from 'react';
import useRequest from '../../hooks/use-request';
import { Router } from 'next/router';

const Signout = () => {
  const { doRequest, errors } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>You are being signed out...</div>;
};

export default Signout;
