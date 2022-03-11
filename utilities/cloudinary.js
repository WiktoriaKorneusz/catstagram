const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "wkorneusz",
    api_key: "453274885252495",
    api_secret: "qOiy56sL5Q7V-4C2UY416yaB4RU",
});

module.exports = cloudinary;
