const generateRandomPassword = (
    length = 12,
    includeUppercase = true,
    includeNumbers = true,
    includeSymbols = true
) => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';

    let availableChars = lowercaseChars;
    let password = '';

    if (includeUppercase) {
        availableChars += uppercaseChars;
    }
    if (includeNumbers) {
        availableChars += numberChars;
    }
    if (includeSymbols) {
        availableChars += symbolChars;
    }

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        password += availableChars[randomIndex];
    }

    return password;
};

const replaceVariablesByDynamicValue = (content, variables) => {
    let updatedContent = content;

    Object.keys(variables).forEach((key) => {
        updatedContent = updatedContent.replace(`{${key}}`, variables[key]);
    });

    return updatedContent;
};

module.exports = {
    generateRandomPassword,
    replaceVariablesByDynamicValue,
};
