import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

import { firebaseConfig } from '../constants/config';

firebase.initializeApp(firebaseConfig);

export default firebase;

