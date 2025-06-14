// -- v2
const express = require('express');
const Replicate = require('replicate');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Configurar Replicate
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Servir página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint de salud
app.get('/health', (req, res) => {
  res.json({ 
    success: true,
    status: 'OK', 
    timestamp: new Date().toISOString(),
    replicate_configured: !!process.env.REPLICATE_API_TOKEN
  });
});

// Endpoint para obtener modelos disponibles
app.get('/models', (req, res) => {
  try {
    const models = [
      {
        id: 'llama',
        name: 'Llama 2 70B Chat',
        description: 'Modelo de Meta, excelente para conversaciones generales'
      },
      {
        id: 'mistral',
        name: 'Mistral 7B Instruct',
        description: 'Modelo rápido y eficiente de Mistral AI'
      }
    ];

    res.json({ 
      success: true,
      models 
    });
  } catch (error) {
    console.error('Error obteniendo modelos:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error al obtener modelos' 
    });
  }
});

// Endpoint para chat con Llama
app.post('/chat/llama', async (req, res) => {
  try {
    const { message, temperature = 0.7, max_tokens = 512 } = req.body;

    if (!message) {
      return res.status(400).json({ 
        success: false,
        error: 'Mensaje requerido' 
      });
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return res.status(500).json({
        success: false,
        error: 'Token de Replicate no configurado'
      });
    }

    console.log('Enviando mensaje a Llama:', message);

    const output = await replicate.run(
      "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
      {
        input: {
          prompt: message,
          temperature: temperature,
          max_new_tokens: max_tokens,
          top_p: 0.9,
          repetition_penalty: 1.15
        }
      }
    );

    const response = Array.isArray(output) ? output.join('') : output;

    res.json({
      success: true,
      response: response,
      model: 'Llama 2 70B'
    });

  } catch (error) {
    console.error('Error con Llama:', error);
    res.status(500).json({
      success: false,
      error: 'Error al procesar la solicitud con Llama',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Endpoint para chat con Mistral
app.post('/chat/mistral', async (req, res) => {
  try {
    const { message, temperature = 0.7, max_tokens = 512 } = req.body;

    if (!message) {
      return res.status(400).json({ 
        success: false,
        error: 'Mensaje requerido' 
      });
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return res.status(500).json({
        success: false,
        error: 'Token de Replicate no configurado'
      });
    }

    console.log('Enviando mensaje a Mistral:', message);

    const output = await replicate.run(
      "mistralai/mistral-7b-v0.1:d938add77615da25dd74c9bcbc5b8ee11c9c3476eb721a6991d32fe5c2ec1968",
      {
        input: {
          prompt: message,
          temperature: temperature,
          max_new_tokens: max_tokens,
          top_p: 0.9,
          top_k: 50
        }
      }
    );

    const response = Array.isArray(output) ? output.join('') : output;

    res.json({
      success: true,
      response: response,
      model: 'Mistral 7B'
    });

  } catch (error) {
    console.error('Error con Mistral:', error);
    res.status(500).json({
      success: false,
      error: 'Error al procesar la solicitud con Mistral',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
  console.log(`🤖 Replicate API configurado: ${!!process.env.REPLICATE_API_TOKEN}`);
});

module.exports = app;


// -- v1

// const express = require('express');
// const Replicate = require('replicate');
// const path = require('path');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 3000;

// // Configurar Replicate
// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN,
// });

// // Middleware
// app.use(express.json());
// app.use(express.static('public'));

// // Servir página principal
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // ---------------------------------------------------- LLAMA ---------------------------------------------------- //
// // Endpoint para chat con Llama
// app.post('/chat/llama', async (req, res) => {
//   try {
//     const { message, temperature = 0.7, max_tokens = 512 } = req.body;

//     if (!message) {
//       return res.status(400).json({ error: 'Mensaje requerido' });
//     }

//     console.log('Enviando mensaje a Llama:', message);

//     const output = await replicate.run(
//       "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
//       {
//         input: {
//           prompt: message,
//           temperature: temperature,
//           max_new_tokens: max_tokens,
//           top_p: 0.9,
//           repetition_penalty: 1.15
//         }
//       }
//     );

//     // Replicate devuelve un array de strings, los unimos
//     const response = Array.isArray(output) ? output.join('') : output;

//     res.json({
//       success: true,
//       response: response,
//       model: 'Llama 2 70B'
//     });

//   } catch (error) {
//     console.error('Error con Llama:', error);
//     res.status(500).json({
//       error: 'Error al procesar la solicitud',
//       details: error.message
//     });
//   }
// });


// // ---------------------------------------------------- MISTRAL ---------------------------------------------------- //
// // Endpoint para chat con Mistral (este modelo anda medio pelo)
// app.post('/chat/mistral', async (req, res) => {
//   try {
//     const { message, temperature = 0.7, max_tokens = 512 } = req.body;

//     if (!message) {
//       return res.status(400).json({ error: 'Mensaje requerido' });
//     }

//     console.log('Enviando mensaje a Mistral:', message);

//     const output = await replicate.run(
//       "mistralai/mistral-7b-v0.1:d938add77615da25dd74c9bcbc5b8ee11c9c3476eb721a6991d32fe5c2ec1968",
//       {
//         input: {
//           prompt: message,
//           temperature: temperature,
//           max_new_tokens: max_tokens,
//           top_p: 0.9,
//           top_k: 50
//         }
//       }
//       // {
//       //   input: {
//       //     prompt: `<s>[INST] ${message} [/INST]`,
//       //     temperature: temperature,
//       //     max_new_tokens: max_tokens,
//       //     top_p: 0.9,
//       //     top_k: 50
//       //   }
//       // }
      
//     );

//     const response = Array.isArray(output) ? output.join('') : output;

//     res.json({
//       success: true,
//       response: response,
//       model: 'Mistral 7B'
//     });

//   } catch (error) {
//     console.error('Error con Mistral:', error);
//     res.status(500).json({
//       error: 'Error al procesar la solicitud',
//       details: error.message
//     });
//   }
// });

// // Endpoint para obtener modelos disponibles
// app.get('/models', async (req, res) => {
//   try {
//     const models = [
//       {
//         id: 'llama',
//         name: 'Llama 2 70B Chat',
//         description: 'Modelo de Meta, excelente para conversaciones generales'
//       },
//       {
//         id: 'mistral',
//         name: 'Mistral 7B Instruct',
//         description: 'Modelo rápido y eficiente de Mistral AI'
//       }
//     ];

//     res.json({ models });
//   } catch (error) {
//     console.error('Error obteniendo modelos:', error);
//     res.status(500).json({ error: 'Error al obtener modelos' });
//   }
// });

// // Endpoint de salud
// app.get('/health', (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     timestamp: new Date().toISOString(),
//     replicate_configured: !!process.env.REPLICATE_API_TOKEN
//   });
// });

// app.listen(port, () => {
//   console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
//   console.log(`📊 Health check: http://localhost:${port}/health`);
//   console.log(`🤖 Replicate API configurado: ${!!process.env.REPLICATE_API_TOKEN}`);
// });

// module.exports = app;