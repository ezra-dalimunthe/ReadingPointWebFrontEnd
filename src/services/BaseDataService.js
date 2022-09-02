export class BaseDataService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  /*private function */
  _getHeader() {
    var header = new Headers();
    header.append("Content-type", "application/json");
    var token = localStorage.getItem("token");
    if (token) {
      header.append("Authorization", "Bearer " + token);
    }
    return header;
  }

  async _fetch(request) {
    return await fetch(request).then((response) => {
      var json = response.json();
      if (response.status === 200) {
        return json;
      } else {
        return json.then((data) => {
          return Promise.reject({
            payload: data,
            status: response.status,
          });
        });
      }
    });
  }

  _makeUrl(url, urlParams) {
    if (urlParams !== null && typeof urlParams === "object")
      Object.keys(urlParams).forEach(
        (k) =>
          !urlParams[k] && urlParams[k] !== undefined && delete urlParams[k]
      );
    if (urlParams) {
      urlParams = new URLSearchParams(urlParams).toString();
      url += "?" + urlParams;
    }
    var targetUrl = new URL(url, this.baseUrl);
    return targetUrl;
  }

  /*public functions */
  get(url, urlParams = null) {
    console.log(url)
    var targetUrl = this._makeUrl(url, urlParams);
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: this._getHeader(),
    };
    const req = new Request(targetUrl, requestOptions);
    return this._fetch(req);
  }

  post(url, form, urlParams) {
    if (form instanceof FormData == false) {
      form = JSON.stringify(form);
    }
    var targetUrl = this._makeUrl(url, urlParams);
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: this._getHeader(),
      body: form,
    };
    const req = new Request(targetUrl, requestOptions);
    return this._fetch(req);
  }
  put(url, form, urlParams = null) {
    if (form instanceof FormData == false) {
      form = JSON.stringify(form);
    }
    var targetUrl = this._makeUrl(url, urlParams);
    const requestOptions = {
      method: "PUT",
      headers: this._getHeader(),
      mode: "cors",
      body: form,
    };
    const req = new Request(targetUrl, requestOptions);
    return this._fetch(req);
  }
  delete(url, urlParams = null) {
    var targetUrl = this._makeUrl(url, urlParams);
    const requestOptions = {
      method: "DELETE",
      mode: "cors",
      headers: this._getHeader(),
    };
    const req = new Request(targetUrl, requestOptions);
    return this._fetch(req);
  }

  async downloadFile(url, urlParams = null) {
    var targetUrl = this._makeUrl(url, urlParams);
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: this._getHeader(),
    };
    const req = new Request(targetUrl, requestOptions);
    return await fetch(req).then((response) => {
      if (response.status === 200) {
        var blob = response.blob();
        return blob;
      } else {
        return response.text((text) => {
          return Promise.reject({
            payload: text,
            status: response.status,
          });
        });
      }
    });
  }
}
