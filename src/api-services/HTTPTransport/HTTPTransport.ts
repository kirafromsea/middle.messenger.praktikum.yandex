export interface OptionsDataType {
  [key: string]: string | number | string[] | number[];
}

interface RequestOptionsType {
  headers?: Record<string, string>,
  data?: OptionsDataType | FormData
}

export interface OptionsType extends RequestOptionsType {
  timeout?: number;
  isFormData?: boolean;
}

interface QueryProps {
  url: string;
  options?: OptionsType;
}

interface QueryRequestType {
  url: string;
  options: OptionsType & {
    method?: string;
  };
  timeout?: number;
}

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

function queryStringify(data: any) {
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

class HTTPTransport {
  baseUrl: string = '';

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get = ({url, options = {}}: QueryProps) => {
    const {data = {}} = options;
    const reqUrl = `${this.baseUrl}${url}${queryStringify(data)}`;
    return this.request({url: reqUrl, options: {...options, method: METHODS.GET}, timeout: options?.timeout});
  };

  put = ({url, options = {}}: QueryProps) => this.request({url: `${this.baseUrl}${url}`, options: {...options, method: METHODS.PUT}, timeout: options?.timeout});

  post = ({url, options = {}}: QueryProps) => this.request({url: `${this.baseUrl}${url}`, options: {...options, method: METHODS.POST}, timeout: options?.timeout});

  delete = ({url, options = {}}: QueryProps) => this.request({url: `${this.baseUrl}${url}`, options: {...options, method: METHODS.DELETE}, timeout: options?.timeout});

  request = ({url, options = {}, timeout}: QueryRequestType) => {
    const {headers = {}, method = METHODS.GET, data} = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.withCredentials = true;

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout || 5000;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        const sendData = data instanceof FormData ? data : JSON.stringify(data);
        xhr.send(sendData);
      }
    });
  };
}

export default HTTPTransport;
