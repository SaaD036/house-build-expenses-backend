const generateFixDigitInteger = (digit) => {
    if (isNaN(digit) || digit <= 0 || digit >= 18) {
        return 0;
    }

    let randomNumber = Math.random();

    while (randomNumber < 1) {
        randomNumber = randomNumber * 10;
    }

    return Math.floor(Math.pow(10, digit - 1) * randomNumber);
};

module.exports = {
    generateFixDigitInteger,
};
