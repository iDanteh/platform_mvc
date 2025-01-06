export const generateEmailSuggestions = (data) => {
    const { nombre_user, apellido_pat, apellido_mat, phone_user } = data;
    const firstLetter = apellido_pat.charAt(0);
    const secondLetter = apellido_mat.charAt(0);
    const randomNumbers = phone_user.slice(0, 3);
    return `${nombre_user}.${firstLetter}${secondLetter}${randomNumbers}@gmail.com`;
};

export const generatePasswordSuggestions = (data) => {
    const specialCharacters = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const { apellido_pat, apellido_mat, phone_user } = data;
    const firstLetter = apellido_pat.charAt(0);
    const secondLetter = apellido_mat.charAt(0);
    const randomNumbers = phone_user.slice(3, 6) + phone_user.slice(-1);
    const randomSpecialCharacter = specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));
    return `${firstLetter}${secondLetter}${randomNumbers}${randomSpecialCharacter}`;
};
