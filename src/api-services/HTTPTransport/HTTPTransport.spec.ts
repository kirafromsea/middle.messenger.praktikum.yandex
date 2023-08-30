import {expect} from 'chai';
import FakeXMLHTTPRequests from 'fake-xml-http-request';
import HTTPTransport from './HTTPTransport';
import {baseUrl} from '../../config';

const requests: any[] = [];

(global as any).XMLHttpRequest = function requestTest() {
  const r = new FakeXMLHTTPRequests();
  requests.push(r);
  return r;
};

const headers = {
  'Content-type': 'application/json; charset=UTF-8',
};

describe('HTTPTransport tests', () => {
  const http = new HTTPTransport(baseUrl);
  it('Get request', async () => {
    http.get({
      url: '/users/search',
      options: {
        data: {login: 'link'},
        headers,
      },
    });
    expect(requests[0].url).to.equal('https://ya-praktikum.tech/api/v2/users/search?login=link');
  });

  it('With a proper method', async () => {
    http.post({
      url: '/logout',
      options: {headers},
    });

    expect(requests[1].method).to.equal('POST');
  });
});
