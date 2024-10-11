//service/CommentService.js sisältää axios-kutsut, jotka lähettävät pyyntöjä palvelimelle.
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tutorials/comments'; // base route endpoint

const CommentService = {
  // luo uuden kommentin tiettyyn tutoriaaliin
  create: (tutorialId, commentData) => {
    
    return axios.post(`${API_URL}/${tutorialId}`, commentData);
  },
  
  // hakee kaikki kommentit tietystä tutoriaalista
  getAll: (tutorialId) => {
    return axios.get(`${API_URL}/${tutorialId}`)
      .then(response => {
        console.log("Apista tulevat kommentit:", response.data); //debugausta: hieman hankaluuksia piti logata monia asioita.
        return response.data; // palauttaa response datan
      });
  },



};

export default CommentService;
