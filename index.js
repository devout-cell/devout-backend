// index.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { name, email, phone } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "devoutcomercial@gmail.com",
      pass: "plcl qkea ifmb oxce",
    },
  });

  const mailOptions = {
    from: "devoutcomercial@gmail.com",
    to: [email, "comercial@devout.com.br"],
    subject: "Obrigado por baixar o artigo!",
    text: `Olá ${name},\n\nObrigado pelo interesse! Segue em anexo o artigo completo.\nSe não conseguir baixar, favor entrar em contato com o suporte pelo nosso site ou pelo whatApp: +55 11 91122-7079`,
    attachments: [
      {
        filename: "artigo.pdf",
        path: path.join(__dirname, "artigo.pdf"),
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("E-mail enviado com sucesso");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao enviar e-mail");
  }
});

app.get("/artigo-lourivaldo.pdf", (req, res) => {
  res.sendFile(path.join(__dirname, "artigo.pdf"));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
