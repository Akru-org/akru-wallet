import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyATwfz3bCdnMQw4HG5XSxZQp3T6uoBt-2s",
  authDomain: "coin-control-dev-ded8c.firebaseapp.com",
  projectId: "coin-control-dev-ded8c",
  storageBucket: "coin-control-dev-ded8c.firebasestorage.app",
  messagingSenderId: "477342844675",
  appId: "1:477342844675:web:26337cc2461017a4024b36",
  measurementId: "G-91RRVFNSST"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
