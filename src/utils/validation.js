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

export function isValidPassword(password, passwordCheck, mode) {
    try {
        let isValid = true;
        if(password) {
            let passwordArr = [...password].filter((l) => l !== ' ')
            let editedPassword = passwordArr.join('');
            if(mode === 'logIn') {
                isValid = true;
            } else if(mode === 'logUp') {
                if(editedPassword.length < 6 || editedPassword !== passwordCheck) {
                    isValid = false;
                }
            }
            }
        
        return {value: isValid, password: editedPassword};
    } catch (err) {
        console.error('/src/utils/validation.js: isValidPassword => ', err);
        throw err;
    }
}

export function checkText(text, excludeSymbols) {
    try {
        let isValid = true;
        let invalidSymbols = "!@#$%^&*()_-=+|{}[]/?.>,<'`\"~";
        if(excludeSymbols) {
            invalidSymbols = [...invalidSymbols].filter((el)=> ![...excludeSymbols].includes(el)).join('');
        }
        [...text].forEach((el) => {
            if(invalidSymbols.includes(el)) {
                isValid = false;
            }
        })
        return isValid;
    } catch (err) {
        console.error('/src/utils/validation.js: checkText => ', err);
    }
}
