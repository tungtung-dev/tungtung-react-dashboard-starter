import firebase from '../../Firebase';

var auth = firebase.auth();

var cleanUser = (data) => {
    const {kd, email, uid, emailVerified, isAnonymous, displayName} = data;
    return {
        token: kd, email, uid, emailVerified, isAnonymous, displayName
    }
}

var getErrors = (err) => {
    let errors = {};
    switch (err.code) {
        case 'auth/email-already-in-use':
            errors.email = "Tài khoản email đã tồn tại";
            break;
        case 'auth/user-not-found':
            errors.email = "Tài khoản không tồn tại";
            break;
        case 'auth/wrong-password':
            errors.password = "Mật khẩu không đúng";
            break;
        case 'auth/expired-action-code':
            errors.code = "Code này đã hết hạn";
            break;
        case 'auth/invalid-action-code':
            errors.code = "Code không đúng";
            break;
        case 'auth/weak-password':
            errors.password = "Mật khẩu không đủ độ mạnh";
            break;
        default:

            break;
    }
    return errors;
}

export default class AuthApi {
    createUser(email, password, displayName) {
        return new Promise((resolve, reject) => {
            auth.createUserWithEmailAndPassword(email, password).then((user) => {
                resolve({
                    ...cleanUser(user),
                    displayName: displayName
                })
                this.updateProfile({displayName});
                resolve(cleanUser(user));
            }).catch(err => {
                reject(getErrors(err));
            })
        })
    }

    loginUser(email, password) {
        return new Promise((resolve, reject) => {
            auth.signInWithEmailAndPassword(email, password).then((user) => {
                console.log(user);
                console.log(auth.getToken());
                resolve(cleanUser(user));
            }).catch(err => {
                reject(getErrors(err));
            })
        })
    }

    updateProfile({displayName, photoURL}) {
        return new Promise((resolve, reject) => {
            var user = auth.currentUser;
            user.updateProfile({
                displayName, photoURL
            }).then(() => {
                resolve(cleanUser(user));
            }).catch(err => {
                reject(err);
            })
        })
    }

    getCurrenUser() {
        return new Promise((resolve, reject) => {
            auth.onAuthStateChanged(function (user) {
                if (user) {
                    resolve(cleanUser(user));
                } else {
                    reject({});
                }
            });
        })
    }

    logout() {
        return new Promise((resolve, reject) => {
            auth.signOut().then(function () {
                resolve(true);
            }, function (error) {
                reject(error);
            });
        })
    }

    checkPassword(email, password) {
        return new Promise((resolve, reject) => {
            auth.signInWithEmailAndPassword(email, password).then(() => {
                resolve();
            }).catch((err) => {
                reject({old_password: "Mật khẩu không đúng"})
            })
        })
    }

    updatePassword(password) {
        return new Promise((resolve, reject) => {
            var user = auth.currentUser;
            user.updatePassword(password).then(() => {
                resolve();
            }).catch((err) => {
                reject(getErrors(err));
            })
        })
    }

    sendPasswordResetEmail(email) {
        return new Promise((resolve, reject) => {
            auth.sendPasswordResetEmail(email).then(() => {
                resolve(true);
            }).catch((err)=> {
                reject(getErrors(err));
            })
        })
    }

    confirmPasswordReset(code, password) {
        return new Promise((resolve, reject) => {
            auth.confirmPasswordReset(code, password).then(() => {
                resolve(true);
            }).catch((err)=> {
                reject(getErrors(err));
            })
        })
    }

    verifyPasswordResetCode(code) {
        return new Promise((resolve, reject) => {
            auth.verifyPasswordResetCode(code).then(() => {
                resolve(true);
            }).catch((err) => {
                reject(getErrors(err));
            });
        });
    }
}