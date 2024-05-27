import { buildClient } from '../api/build-client';
import Router from 'next/router';

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <div>Hi {currentUser.email}</div>
  ) : (
    <div>Not signed in, Please sign in</div>
  );
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const path = '/api/users/currentuser';
  const { data } = await client.get(path);
  return data;
};

export default LandingPage;
