import { render, screen } from '@testing-library/react';
import Home, { getServerSideProps } from '../src/pages/index';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import api from '../src/services/api';
import { getUserPosts } from '../src/shared/helpers';
import { RequestStatus } from '../src/shared/enums';

describe('Home', () => {
  it('should call users and posts and parse the data', async () => {
    const mock = new MockAdapter(api);
    const userData = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496',
          },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets',
        },
      },
    ];
    const postsData = [
      {
        userId: 1,
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      },
    ];

    mock.onGet('/users').reply(200, userData);
    mock.onGet('/posts').reply(200, postsData);
    const data = {
      props: {
        status: 'ok',
        userPosts: getUserPosts({ users: userData, posts: postsData }),
      },
    };

    const response = await getServerSideProps();
    expect(response).toEqual(expect.objectContaining(data));
  });
  it('should fail when try to call the services', async () => {
    const mock = new MockAdapter(api);
    const userData = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496',
          },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets',
        },
      },
    ];
    const postsData = 'Invalid value';

    mock.onGet('/users').reply(200, userData);
    mock.onGet('/posts').reply(500, postsData);
    const data = {
      props: {
        status: RequestStatus.ERROR,
      },
    };

    const response = await getServerSideProps();
    expect(response).toEqual(expect.objectContaining(data));
  });

  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /Welcome to my Multivision\/Winprovit test!/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders a footer', () => {
    render(<Home />);

    const heading = screen.getByText(/Powered by Lucas Ferreira/i);

    expect(heading).toBeInTheDocument();
  });
});
