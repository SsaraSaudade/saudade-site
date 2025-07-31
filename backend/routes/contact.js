const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configurer ton transporteur SMTP (exemple Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'saudade.dacosta.sara@gmail.com', 
    pass: 'kgxfcobhpfsneram',    
  },
});

router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'saudade.dacosta.sara@gmail.com',  // email destinataire
    subject: `Nouveau message de contact de ${name}`,
    text: `Nom: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erreur lors de l’envoi du mail' });
    }
  });
});

module.exports = router;
