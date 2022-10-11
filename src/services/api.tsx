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

async function getAllCompanies() {
    return await axios.get(`${URL}/companies`);
}

async function getUnitsByCompany(company : string) {
    return await axios.get(`${URL}/units/company/${company}`);
}

const api = {
    getAllAssets,
    getAllCompanies,
    getUnitsByCompany,

}

export default api;
