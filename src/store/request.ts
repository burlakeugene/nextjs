import Emitter, { EEvents } from '@/utils/Emitter';

export type TCatcher = (...args: unknown[]) => void;

type TOptions<T> = {
  data?: T;
  api?: {
    getState: TAnyFunction;
  };
  url?: string;
  authorized?: boolean;
  forbiddenLogout?: boolean;
  responseParse?: boolean;
  method?: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH' | 'UPDATE';
  additionalHeaders?: Record<string, string>;
  additionalOptions?: Record<string, string>;
  dataToQuery?: boolean;
  baseUrl?: string;
  catcher?: TCatcher;
  mock?: {
    data: unknown;
    delay?: number;
  };
};

const request = <T = unknown, K = TAnyObject>(
  options: TOptions<K>
): Promise<T> => {
  const {
    data,
    api,
    url = '',
    authorized = true,
    forbiddenLogout = true,
    method = 'GET',
    additionalHeaders = {},
    additionalOptions = {},
    responseParse = true,
    baseUrl = process.env.NEXT_PUBLIC_API_URL,
    catcher,
    mock,
  } = options;

  if (mock?.data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mock.data as T);
      }, mock?.delay || 1000);
    });
  }

  const dataToQuery = options.dataToQuery || method === 'GET';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...additionalHeaders,
  };

  const token = api?.getState()?.auth?.token;

  if (authorized && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const returnerData = (response, callback) => {
    if (response?.json && responseParse) {
      response
        .json()
        .then(callback)
        .catch(() => callback({}));

      return;
    }

    callback(response);
  };

  return new Promise((resolve, reject) => {
    const fetchUrl = new URL(`${baseUrl}${url}`);

    const fetchOptions: TAnyObject = {
      method,
      headers,
      ...additionalOptions,
    };

    if (data) {
      if (dataToQuery) {
        Object.keys(data).forEach((key) =>
          fetchUrl.searchParams.append(key, data[key])
        );
      } else {
        fetchOptions.body = JSON.stringify(data);
      }
    }

    fetch(fetchUrl.toString(), fetchOptions)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }

        const Authorization = response.headers.get('Authorization');

        if (Authorization) {
          Emitter.publish(EEvents.SET_TOKEN, Authorization);
        }

        returnerData(response, resolve);
      })
      .catch((response) => {
        if (forbiddenLogout && response.status === 401) {
          Emitter.publish(EEvents.LOGOUT);
        }

        returnerData(response, (responseData) => {
          if (catcher) {
            catcher(responseData);
          }

          reject(responseData);
        });
      });
  });
};

export default request;
