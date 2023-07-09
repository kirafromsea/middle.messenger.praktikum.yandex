interface RequestOptionsType {
  headers?: Record<string, string>,
  data?: {
    [key: string]: string | number;
  }
}

interface OptionsDataType {
  [key: string]: string | number;
}
interface OptionsType extends RequestOptionsType {
  headers?: Record<string, string>,
  data?: OptionsDataType,
  timeout?: number;
}

interface QueryProps {
  url: string;
  options: OptionsType;
}

interface QueryRequestType {
  url: string;
  options: OptionsType & {
    method?: string;
  };
  timeout: number;
}

const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
};

function queryStringify(data: OptionsDataType) {
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

class HTTPTransport {
    get = ({ url, options = {} }: QueryProps) => this.request({ url, options: { ...options, method: METHODS.GET }, timeout: options.timeout });

    put = ({ url, options = {} }: QueryProps) => this.request({ url, options: { ...options, method: METHODS.PUT }, timeout: options.timeout });

    post = ({ url, options = {} }: QueryProps) => this.request({ url, options: { ...options, method: METHODS.POST }, timeout: options.timeout });

    delete = ({ url, options = {} }: QueryProps) => this.request({ url, options: { ...options, method: METHODS.DELETE }, timeout: options.timeout });

    request = ({ url, options = {}, timeout = 5000 }: QueryRequestType) => {
        const { headers = {}, method = METHODS.GET, data } = options;

        return new Promise((resolve, reject) => {
            let reqUrl = url;

            console.log(method === METHODS.GET);
            if (method === METHODS.GET) {
                reqUrl = `${url}${queryStringify(data)}`;
            }

            const xhr = new XMLHttpRequest();

            xhr.open(method, reqUrl);

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (method !== METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
