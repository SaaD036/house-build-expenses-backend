const cloudinary = require('cloudinary').v2;

const { CLOUDINARY_FOLDERS } = require('../constants');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const extractPublicIdFromUrl = (imageUrl) => {
    if (!imageUrl || typeof imageUrl !== 'string') return null;

    const uploadParts = imageUrl.split('/upload/');

    if (uploadParts.length < 2) {
        return null;
    }

    let pathAfterUpload = uploadParts[1];
    pathAfterUpload = pathAfterUpload.replace(/^v\d+\//, '');

    const publicId = pathAfterUpload.replace(/\.[^/.]+$/, '');

    return publicId;
};

/**
 * Upload image buffer to Cloudinary
 * @param {Buffer} buffer - File buffer
 * @param {string} folder - Subfolder name
 * @returns {Promise<object>} Cloudinary upload response
 */
const uploadImageToCloudinary = (buffer, folder = CLOUDINARY_FOLDERS.HOUSES) => {
    return new Promise((resolve, reject) => {
        const parentFolder = process.env.CLOUDINARY_PARENT_FOLDER_NAME;
        const uploadFolder = parentFolder ? `${parentFolder}/${folder}` : folder;

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: uploadFolder,
                resource_type: 'image',
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve(result);
            }
        );

        uploadStream.end(buffer);
    });
};

/**
 * Remove image from Cloudinary by public ID
 * @param {string} imageUrl - Cloudinary image url
 * @returns {Promise<object | undefined>} Cloudinary destroy response
 */
const removeImageFromCloudinary = async (imageUrl) => {
    const publicId = extractPublicIdFromUrl(imageUrl);

    if (publicId) {
        return cloudinary.uploader.destroy(publicId);
    }
};

/**
 * Replace image in Cloudinary
 * @param {Buffer} buffer - New image buffer
 * @param {string} imageUrl - Old image url to remove
 * @param {string} folder - Subfolder name
 * @returns {Promise<object>} Cloudinary upload response
 */
const replaceImageInCloudinary = async (buffer, imageUrl, folder = CLOUDINARY_FOLDERS.HOUSES) => {
    if (imageUrl) {
        await removeImageFromCloudinary(imageUrl);
    }

    return await uploadImageToCloudinary(buffer, folder);
};

module.exports = {
    cloudinary,
    uploadImageToCloudinary,
    removeImageFromCloudinary,
    replaceImageInCloudinary,
};
