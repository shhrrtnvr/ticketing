import 'bootstrap/dist/css/bootstrap.min.css';
import { buildClient } from '../api/build-client';
import { Header } from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => (
  <div>
    <Header currentUser={currentUser} />
    <div className="container">
    <Component currentUser={currentUser} {...pageProps} />
    </div>
  </div>
);

AppComponent.getInitialProps = async ({ Component, ctx }) => {
  const client = buildClient(ctx);
  const path = '/api/users/currentuser';
  const { data } = await client.get(path);
  let pageProps = {};
  if (Component.getInitialProps)
    pageProps = await Component.getInitialProps(ctx, client, data.currentUser);
  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
