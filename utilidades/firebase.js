const dotenv = require('dotenv');

const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');

const firebaseConfig = {
  apiKey: 'AIzaSyDVQ-qDUgEO_e_nsMG07CgNiIku0lYmug0',
  authDomain: 'nuevo-backend-pelis.firebaseapp.com',
  projectId: 'nuevo-backend-pelis',
  storageBucket: 'nuevo-backend-pelis.appspot.com',
  messagingSenderId: '403746624428',
  appId: '1:403746624428:web:32ef029cb378da9e7c2009'
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

module.exports = { storage };
