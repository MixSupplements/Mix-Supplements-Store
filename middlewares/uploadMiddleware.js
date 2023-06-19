const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        folder: 'mix',
        public_id: (req, file) => file.originalname.split('.')[0],
        overwrite: true,
        invalidate: true
    },
});

const parser = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

function uploadImage(req, res, next) {
    parser.single('image')(req, res, function (err) {
        try
        {
            if (err)
            {
                throw Object.assign(new Error(err.message), { status: err.http_code || 422 });
            }
            if (!req.file)
            {
                throw Object.assign(new Error('Please upload an image'), { status: 422 });
            }
            cloudinary.uploader.upload(req.file.path, function (error, result) {
                if (error)
                {
                    throw error;
                }
                req.body.image = { imageUrl: result.secure_url, publicId: result.public_id };
                next();
            });
        } catch (err)
        {
            next(err);
        }
    });
}

module.exports = uploadImage;