import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000/api/v1/template' });

export const fetchTemplates = () => API.get('/get-templates');
export const createTemplate = (template) => API.post('/create-temp', template);
export const updateTemplate = (id, template) => API.put(`/update-temp/${id}`, template);
export const deleteTemplate = (id) => API.delete(`/delete-temp/${id}`);
