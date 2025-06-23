// this is uploding local disk storage 😀😀😀

// import express from "express";
// import multer from "multer";
// import path from "path";

// // Multer Storage Configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "upload/"); // destination folder
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix + ext);
//   },
// });

// // Upload Middleware
// const upload = multer({ storage: storage });

// const uploadRout = express.Router();

// // POST route for single file upload
// uploadRout.post("/upload", upload.single("image"), (req, res) => {
//   console.log("req",req.file)
//   try {
//     res.status(200).json({
//       success: true,
//       message: "File uploaded successfully",
//       file: req.file,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// export default uploadRout;
