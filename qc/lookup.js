let lookupVars = {
  baseUrl: "https://kns.deposco.com/deposco/resources",
  getTokenUrl: () => `${lookupVars.baseUrl}/nonsecure/authenticate`,
  getSessionUrl: () => `${lookupVars.baseUrl}/secure/security/temp_sessionkey`,
  getDeviceUrl: () => `${lookupVars.baseUrl}/secure/device`
}

let lookup = {
  username: null,
  password: null,
  token: null,
  processInstance: null,
  session: null,
  postBack: (url, obj) => {
    return new Promise((resolve, reject) => {
      let headers = {
        //"Content-Type": "application/json",
        //"Accept": "application/json, text/plain, */*",
        //"User-Agent": "axios/0.25.0",
        //"Host": "kns.deposco.com",
        //"Connection": "close",
        //"origin": "kns.deposco.com"
      };

      if (lookup.token) {
        //headers["Authorization"] = `Bearer ${token}`;
      }

      fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(obj),
        mode: "cors"
      }).then(obj => resolve(obj)).catch(reject);
    });
  },
  getToken: async () => {
    lookup.token = await lookup.postBack(lookupVars.getTokenUrl(), {
      company: "KNS",
      username: lookup.username,
      password: lookup.password,
      isMobile: false
    })["X-Auth-Token"];
  },
  post: (url, obj) => {
    if (!lookup.token) {
      lookup.getToken().then(t => console.log(lookup.token));//.then(() => lookup.post(url, obj));
      return;
    }

    console.log(token);
  },
};