const express = require('express');
const cors = require('cors');

const multer = require('multer');
const mime = require('mime-types');
const fs = require('fs');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();
const colors=require('colors');
const { Client , LocalAuth , MessageMedia } = require('whatsapp-web.js');
const qrCode = require('qrcode-terminal');
const { type } = require('os');
// const storageDirectory = path.join(__dirname, 'temp');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

const clients = {};
let clientArray=[];
let t;
// app.use(cors());
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://web.whatsapp.com');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });
app.use(cors());
app.options('*', cors());


app.use(express.json()); 

function generateRandomNumbersWithSum(n, m) {
    let numbers = [];
  
    if (n >= m) {
      m *= Math.ceil(n / m); 
    }
  
    // Generate n-1 positive random numbers
    for (let i = 0; i < n - 1; i++) {
      // Ensure that the random number is positive and does not exceed the remaining sum
      let randomNum = Math.floor(Math.random() * (m - 1)) + 1;
      numbers.push(randomNum);
      m -= randomNum;
    }
  
    // The last number is set to make the sum exactly m
    numbers.push(m);
  
    return numbers;
  }
  


// app.post('/sendMessage', async (req, res) => {
//     const { phoneNumbers, message } = req.body;

//     try {
        
//         for (const phoneNumber of phoneNumbers) {
//             const chatId = `91${phoneNumber}@c.us`;

//             try {
//                 const chat = await client.getChatById(chatId);

//                 await chat.sendMessage(message);

//                 console.log(`Message sent successfully to ${phoneNumber}`);
//             } catch (error) {
//                 console.error(`Error sending WhatsApp message to ${phoneNumber}:`, error);
                
//             }
//         }

//         res.json({ message: 'Messages sent successfully' });
//     } catch (error) {
//         console.error('Error sending WhatsApp messages:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


app.post('/sendFile', upload.single('file'), async (req, res) => {
    const { message, phoneNumbers ,groupNames , sliderValue , id} = req.body;
    const client = getClient(id);
    t=client;
    const delay = parseInt(sliderValue, 10);
    if(phoneNumbers.length===1){ 
        try { 
            
            const chats = await t.getChats();
            for (const groupName of groupNames) {
                await new Promise(resolve => setTimeout(resolve, delay*1000));
                let chatId;
                chats.forEach(async(chat) => {
                    if( (chat.isGroup) && chat.name===groupName  ){
                        chatId=  chat.id._serialized;
                    }
                });
                try {
                    const chat = await t.getChatById(chatId);
                    if (!chat) {
                        console.error('Chat not found for ID:', chatId);
                        res.status(404).json({ error: 'Chat not found' });
                        return;
                    }
     
                    if (req.file) {
                        const imageBuffer = req.file.buffer;
                        const caption = message || 'Sent from your app';

                // const fileType = req.file.originalname.split('.').pop().toLowerCase();
                // const mediaType = `application/${fileType === 'pdf' ? 'pdf' : 'octet-stream'}`;

                        
                        // Assuming you want to send the image as a media message
                        const media = new MessageMedia('image/png', imageBuffer.toString('base64'));
                        await chat.sendMessage(media, { caption });
                    }
    
                    if (message) {
                        await chat.sendMessage(message);
                    }
                } catch (error) {
                    console.error('Error sending WhatsApp message:', error);
                }
            }
    
            // Send the response after all iterations are complete
            res.json({ message: 'Image sent successfully' });
        } catch (error) {
            console.error('Error sending WhatsApp messages:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }else{
        try {
            
            let numbers=generateRandomNumbersWithSum( phoneNumbers.length , delay);
            let y=0;
            for (const phoneNumber of phoneNumbers) {
                await new Promise(resolve => setTimeout(resolve, numbers[y]*1000));
                console.log(y , numbers[y] , phoneNumber) ;
                y++;
                const chatId = `91${phoneNumber}@c.us`;
                try {
                    const chat = await t.getChatById(chatId);
                    if (!chat) {
                        console.error('Chat not found for ID:', chatId);
                        res.status(404).json({ error: 'Chat not found' });
                        return;
                    }
    
                    if (req.file) {
                        const imageBuffer = req.file.buffer;
                        const caption = message || 'Sent from your app';
                        
                        // Assuming you want to send the image as a media message
                        const media = new MessageMedia('image/png', imageBuffer.toString('base64'));
                        await chat.sendMessage(media, { caption });
                    }
    
                    if (message) {
                        await chat.sendMessage(message);
                    }
                } catch (error) {
                    console.error('Error sending WhatsApp message:', error);
                }
            }
            res.json({ message: 'Image sent successfully' });
        } catch (error) {
            console.error('Error sending WhatsApp messages:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});
const attachEventListeners = (client, userId) => {
    client.on('message', message => {
        if (message.body === '!ping') {
            client.sendMessage(message.from, 'Hello Thank you for connecting with me');
        } 
      });
};


const createClient = (clientId) => {
    const client = new Client({
            puppeteer: { headless: false }, // Make headless true or remove to run browser in background
            authStrategy: new LocalAuth({clientId})
            });
            clients[clientId] = client;
            attachEventListeners(clients[clientId], clientId);
    return client;
};

// Function to get or create a client for a user
const getClient = (clientId) => {
    console.log(clientId);
    return clients[clientId] || createClient(clientId);
};



app.post('/submit', async(req, res) => {
    const {message} = req.body;
    const client = getClient(message);
    t=client;
    await client.initialize();
    clientArray.push(message);
    // (async () => {
        // if (clientArray.length === 0) {
        //     console.log("No user is active");
        // } else {
        //     for (let i = 0; i < clientArray.length; i++) {
        //         const client = getClient(clientArray[i]);
        //         console.log(i, "--> " ,clientArray[i]);
        //         client.on('message', (message) => {
        //             if (message.body === '!ping') {
        //                 client.sendMessage(message.from, 'pong');
        //             }
        //         });
        //     }
        // }
    // })();

    res.send(`User ${message} session is active.`);
});


const port = 3080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 
 

// const client = new Client({
//     // puppeteer: { headless: false }, // Make headless true or remove to run browser in background
//     authStrategy: new LocalAuth({
//        clientId: 'client-id_2',
//     }),
// });  

// client.on('ready', async() => {
//     console.log('Client is ready!'); 

//     // Fetch details of all chats
//     // const chats = await client.getChats();
//     // console.log(chats); 
// });
// t.on('message', message => {
//     if (message.body === '!ping') {
      
//     t.sendMessage(message.from, 'pong');
//     } 
//   });
 
//    console.log("Length: ",clients.size) 
   
// client.initialize();
     