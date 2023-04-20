import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

class Request {
  /**
   * GET封装
   * @param {string} url 请求地址
   * @param {object} params 请求配置
   * @returns {Promise}
   */
  get(url: string, params: any, config?: AxiosRequestConfig | undefined): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params, ...config })
        .then((response: AxiosResponse<any>) => {
          resolve(response);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  /**
   * POST封装
   * @param {string} url 请求地址
   * @param {object} params 请求数据
   * @returns {Promise}
   */
  post(url: string, params: any, config?: AxiosRequestConfig | undefined): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params, config)
        .then((response: AxiosResponse<any>) => {
          resolve(response);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }
}
const request: Request = new Request();
export default request;
