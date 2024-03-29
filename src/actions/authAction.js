import api from '../services/Axios';
import Cookie from '../utils/Cookie';

export const loginApi = (payload) => {
  return api.post('admin/login', payload).then(response => response)
    .catch(err => err);
};

// -------------------------------------------------User Information------------------------------------------
export const ME = () => {
  const header = {
    headers: { 'Authorization': `Bearer ${Cookie.getCookie('_token_SuperAdmin')}` }
  }
  return api.get('admin/me', header).then(response => response)
    .catch(err => err);
};
