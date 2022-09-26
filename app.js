const express = require("express");
const cors = require("cors");
const multer = require("multer");
const sharp = require("sharp");
const app = express();
app.use(cors());
const PORT = 3000;

const helperImg = (filePath, fileName, size = 300) => {
  return sharp(filePath).resize(size).toFile(`./optimize/${fileName}`);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); //envia la imagen cruda a la ruta indicada
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop(); //valida el tipo de imagen si es png= png
    cb(null, `${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  console.log("→", req.file);
  helperImg(req.file.path, `resize-micro${req.file.filename} `, 20);
  helperImg(req.file.path, `resize-media${req.file.filename} `, 100);
  helperImg(req.file.path, `resize-pequena${req.file.filename} `, 400);
  helperImg(req.file.path, `resize-grande${req.file.filename} `, 1000);

  res.send({ data: "imagen cargada correctamente" });
});

app.listen(PORT, () => {
  console.log("Listo por el pueto 300", PORT);
});
