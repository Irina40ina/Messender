
export function replacePhoneNumber(phoneNumber) {
    const phoneNumberRegex = /(\d{3})(\d{3})(\d{2})(\d{2})/;
    return phoneNumber.replace(phoneNumberRegex, "+7 ($1) $2-$3-$4");
}
