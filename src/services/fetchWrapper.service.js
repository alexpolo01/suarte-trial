import { auth } from '@/services/firebase.service';

async function _waitUntilUserIsLoaded() {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged(()=>{
      unsubscribe();
      resolve();
    });
  });
}

function _request(method) {
  return async (url, options={}) => {
    await _waitUntilUserIsLoaded();

    let fetchOptions = { method };

    if(options.injectToken && Boolean(auth.currentUser)) {
      const accessToken = await auth.currentUser.getIdToken();

      fetchOptions = {
        ...fetchOptions, 
        headers: {
          ...fetchOptions.headers, 
          'Authorization': `${accessToken}`
        }
      };
    }

    if(options.headers) {
      fetchOptions = {
        ...fetchOptions, 
        headers: {
          ...fetchOptions.headers, 
          ...options.headers
        }
      };
    }

    if(!options.contentType || options.contentType === "json") {
      fetchOptions = {
        ...fetchOptions, 
        headers: {
          ...fetchOptions.headers, 
          'Content-Type': 'application/json', 
          'Accept': '*/*'
        }, 
        body: JSON.stringify(options.body)
      };
    } 

    return new Promise((resolve, reject) => {
      fetch(url, fetchOptions)
        .then(response => {
          response.json()
            .then(data => {
              resolve({ response, data });
            });
        })
        .catch(error => reject(error));
    });
  };
}

const fetchWrapper = {
  get: _request('GET'),
  post: _request('POST'),
  put: _request('PUT'),
  delete: _request('DELETE')
};

export default fetchWrapper; 
