import { extend, setInteractionMode } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import { messages } from 'vee-validate/dist/locale/en.json';
import {parsePhoneNumber} from "libphonenumber-js/mobile";

Object.keys(rules).forEach(rule => {
    extend(rule, {
        ...rules[rule],
        message: messages[rule]
    })
})

extend('mobile', {
    message (fieldName) {
        return `${fieldName} is not a valid mobile phone number`;
    },
    validate (value) {
        return new Promise(resolve => {
            let phone = parsePhoneNumber(value, 'AU'); // ToDo: make dynamic for other regions
            resolve({ valid: phone.isValid() })
        });
    }
});

setInteractionMode('lazy');
