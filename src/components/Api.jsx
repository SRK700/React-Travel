import axios from 'axios';

export const fetchPlaces = () => {
    return axios.get('http://student.crru.ac.th/641463023/apiPlace/')
        .then(response => response.data)
        .catch(error => {
            console.log(error);
            return [];
        });
};
