//=================
//  PUERTO
//=================
process.env.PORT = process.env.PORT || 3000;


//=================
//  Entorno
//=================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//=================
//  Vencimiento del token
//=================
// 60 segundo
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = '48h';


//=================
//  Vencimiento del token
//=================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


//=================
//  Base de Datos
//=================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    //MONGO_URI = cambian por la ruta de su BD en la nube
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;



//====================
//  Google Client ID
//====================

process.env.CLIENT_ID = process.env.CLIENT_ID || '603314220793-uj8cijto7sljanevnkpcpfqr42nd4go6.apps.googleusercontent.com';