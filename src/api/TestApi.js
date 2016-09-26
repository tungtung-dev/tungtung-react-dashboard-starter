import firebase from './Firebase';
import {convertToArray} from '../utils/firebaseUtils';

var database = firebase.database();

export function getPosts(limit = 2) {
    var posts = database.ref('posts').limitToLast(limit);
    return new Promise((resolve, reject) => {
        try {
            posts.on('value', (snapshot) => {
                resolve(convertToArray(snapshot.val()));
            });
        }
        catch (err) {
            reject(err);
        }

    })
}