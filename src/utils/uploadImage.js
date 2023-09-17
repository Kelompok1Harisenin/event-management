const httpStatus = require('http-status');
const supabase = require('../config/supabase');
const config = require('../config/config');
const ApiError = require('./ApiError');

const bucketName = config.supabase.bucket;

const uploadImage = async (uploadedImage, title, tag) => {
  try {
    const { buffer } = uploadedImage;
    const uniqueId = new Date().getTime();

    const titleStr = title.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '');
    const filePath = `${tag}/${titleStr}-${uniqueId}`;
    const { error } = await supabase.storage.from(bucketName).upload(filePath, buffer);

    if (error) {
      throw new ApiError(httpStatus.CONFLICT, error);
    }

    const imageUrl = `${config.supabase.url}/storage/v1/object/public/${bucketName}/${filePath}`;
    return imageUrl;
  } catch (error) {
    throw new ApiError(httpStatus.CONFLICT, error.message);
  }
};

module.exports = uploadImage;
