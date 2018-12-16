import firebase from 'firebase';
export function firebaseAuth(accessToken, callback) {
  // Build Firebase credential with the Facebook auth token.
  const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);
  // signInAndRetrieveDataWithCredential
  firebase.auth().signInAndRetrieveDataWithCredential(credential).then((currentUser) => {
    typeof callback === 'function' && callback(currentUser.user);
  }).catch((error) => {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // The email of the user's account used.
    let email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    let credential = error.credential;
    typeof callback === 'function' && callback(null)
    // ...
  });
}

export function anonymousLogin(callback) {
  firebase.auth().signInAnonymously().then((user) => {

    firebase.auth().currentUser.getIdToken().then(result => {
      console.log('user anonymousLogin', user);
      // console.log('user anonymousLogin result TOKEN', result);
    })

    if (typeof callback !== "undefined") {
      callback(user)
    }

  }).catch((error) => {
    // Handle Errors here.
    console.log("error anon", error);
  });
}


export const saveDataFirebase = (path, data) => {
  // console.log('saveDataFirebase', {data, path})
  try {
    const database = firebase.database();
    return database.ref(path).update(data);
  } catch (error) {
    console.log('error', error)
  }
}

export const removeDataFirebase = (path) => {
  // console.log('saveDataFirebase', {data, path})
  try {
    const database = firebase.database();
    return database.ref(path).remove();
  } catch (error) {
    console.log('error', error)
  }
}

export const getDataFirebase = (path) => {
  try {
    const database = firebase.database();
    return database.ref(path).once('value').then((snapshot) => {
      return snapshot.val() || null;
    }).catch(error => error);
  } catch (error) {
    console.log('error', error)
    return null;
  }
}