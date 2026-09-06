export const getAvatarContentFromName = (userName: string) => {
    const userNameParts = userName.split(' ');
    let avatarContent = '';

    if (userNameParts.length === 0) {
        return avatarContent;
    }

    if (userNameParts.length === 1) {
        avatarContent = userNameParts[0].substring(0, 2);
    }

    if (userNameParts.length === 2) {
        avatarContent = `${userNameParts[0].substring(0, 1)}${userNameParts[1].substring(0, 1)}`;
    }

    if (userNameParts.length >= 3) {
        avatarContent = `${userNameParts[0].substring(0, 1)}${userNameParts[1].substring(
            0,
            1
        )}${userNameParts[userNameParts.length - 1].substring(0, 1)}
        `;
    }

    return avatarContent.toUpperCase() || 'NN';
};
