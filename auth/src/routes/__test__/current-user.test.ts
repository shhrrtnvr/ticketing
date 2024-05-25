import request from 'supertest';
import {app} from '../../app';

it ('responds with details about the current user', async () => {
  const cookie = await signup();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.status).toBe(200);
  expect(response.body.currentUser.email).toBeDefined;
  expect(response.body.currentUser.id).toBeDefined();
});

it ('responds with an error if the user is not logged in', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(response.body.currentUser).toBeNull();
  }
);
