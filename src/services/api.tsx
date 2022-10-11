import axios from 'axios';

const URL = 'http://localhost:5000';

async function getConfig(token : string) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
}

async function getAllAssets() {
    return await axios.get(`${URL}/assets`);
}

const api = {
    getAllAssets,

}

export default api;
