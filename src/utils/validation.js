export const patternEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function isValidEmail(email) {
    try {
        let isValid = true;
        if(email && typeof email === 'string') {
           isValid = patternEmail.test(email);
        }
        return isValid;
    } catch (err) {
        console.error('/src/utils/validation.js: isValidEmail => ', err);
        throw err;
    }
}

export function isValidPassword(password) {
    try {
        let isValid = true;
        if(password) {
            password = password.trim(password);
            if(password.length < 6) {
                isValid = false;
            }
        } else {
            isValid = false;
        }
        return isValid;
    } catch (err) {
        console.error('/src/utils/validation.js: isValidPassword => ', err);
        throw err;
    }
}
