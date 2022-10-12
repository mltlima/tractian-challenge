import axios from 'axios';

//const URL = 'http://localhost:5000';
const URL = 'https://tractian-miguel-lima.herokuapp.com';

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

async function getUnits() {
    return await axios.get(`${URL}/units`);
}

async function getAllUsers() {
    return await axios.get(`${URL}/users`);
}

async function signIn(email : string, password : string) {
    return await axios.post(`${URL}/login`, { email, password });
}

async function signUp(email : string, password : string, confirmPassword: string, username : string, company : string) {
    return await axios.post(`${URL}/register`, { email, password, confirmPassword, username, company });
}

const api = {
    getAllAssets,
    getAllCompanies,
    getUnitsByCompany,
    getUnits,
    getAllUsers,
    signIn,
    signUp,
}

export default api;
