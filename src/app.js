import express from "express";
import nodemailer from "nodemailer";
const app = express();
const PUERTO = 8080; 

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));


//Creamos un objeto especial llamado "transport". Acá voy a configurar el servicio SMTP que vamos a utilizar. 

const transport = nodemailer.createTransport({
    service: "gmail", 
    port: 587,
    auth: {
        user: "co@gmail.com",
        pass: "s"
    }
})

//Rutas

app.get("/mail", async (req, res) => {
    try {
        await transport.sendMail({
            from: "Bom>",
            to: "stoa@hotmail.com",
            subject: "Correo de Prueba",
            html: `<h1>Te secuest!</h1>
                    <img src="cid:logo1"> `,
            //Para enviar como un archivo adjunto: 
            attachments: [{
                filename: "logo.jpg",
                path:"./src/public/img/logo.jpg",
                cid: "logo1"
            }]
        })

        res.send("Correo enviado correctamente!");
    } catch (error) {
        res.status(500).send("Error al enviar mail, vamos a morir.");
    }
})

//Usando el index.html:

app.post("/enviarmensaje", async (req, res) => {
    const {email, mensaje} = req.body; 

    try {
        await transport.sendMail({
            from: "Coder Test",
            to: email, 
            subject: "TEST",
            text: mensaje
        })

        res.send("Correo enviado exitosamenteee la vida nos sonrieeeee, este find e semana sera perfecto")
    } catch (error) {
        res.status(500).send("Todo nos sale mal, tantas carreras para decidir y elegi la que no tengo talento"); 
    }
})


app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})

/////////////////////////////////////////////////////////////

//TWILIO: servicio que nos permite enviar SMS, WhatsApp, Chatbots, mensajes de voz pregrabados. 


//Instalamos: npm install twilio
//Importamos: 
import twilio from "twilio";

const TWILIO_ACCOUNT_SID = ""; 
const TWILIO_AUTH_TOKEN = "";
const TWILIO_SMS_NUMBER = "";

//Configurar un cliente: 
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SMS_NUMBER);

//Creamos una ruta para enviar sms: 

app.get("/sms", async (req, res) => {
    await client.messages.create({
        body: "Esto es un sms de prueba, no te asustes",
        from: TWILIO_SMS_NUMBER,
        to: "+54"
    })
    res.send("Enviado al SMS!");
})