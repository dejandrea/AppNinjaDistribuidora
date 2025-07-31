// const axios = require('axios');
// const { MongoClient } = require('mongodb');

// const SPREADSHEET_ID = '14F7rK71cXe85U5AR4kcqqh0EGsKJoH6CVnCSVL3qBPg';
// const SHEET_NAME = 'Clientes'; // normalmente 'Página1'
// const uri = 'mongodb+srv://dejandrea:Dejandrea230890@ninja.qhhf4g7.mongodb.net/NinjaDistribuidora?retryWrites=true&w=majority';
// const client = new MongoClient(uri);

// async function importarPlanilha() {
//   try {
//     await client.connect();
//     const db = client.db('NinjaDistribuidora');
//     const collection = db.collection('clientes');


const axios = require('axios');
const { MongoClient } = require('mongodb');

// 🔧 Substitua pelo ID da sua planilha e nome da aba
const SPREADSHEET_ID = '14F7rK71cXe85U5AR4kcqqh0EGsKJoH6CVnCSVL3qBPg';
const SHEET_NAME = 'Clientes'; // ou o nome exato da aba
const MONGO_URI = 'mongodb+srv://dejandrea:Dejandrea230890@ninja.qhhf4g7.mongodb.net/NinjaDistribuidora?retryWrites=true&w=majority'; // ou a string de conexão MongoDB Atlas
const DATABASE = 'NinjaDistribuidora';
const COLECAO = 'clientes'; // ou o nome que quiser

const client = new MongoClient(MONGO_URI);

async function importarPlanilha() {
  try {
    await client.connect();
    const db = client.db(DATABASE);
    const collection = db.collection(COLECAO);

    // Baixa os dados como CSV
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;
    const response = await axios.get(url);

    const linhas = response.data.split('\n').filter(l => l.trim());

    // Ignora a primeira linha (cabeçalho)
    const dados = linhas.slice(1);

    const documentos = dados.map(linha => {
      const colunas = linha.split(',');
      return {
        codigoCliente: colunas[0]?.trim(),
        nome: colunas[1]?.trim()
      };
    }).filter(doc => doc.codigoCliente && doc.nome); // evita linhas vazias

    const resultado = await collection.insertMany(documentos);
    console.log(`${resultado.insertedCount} documentos inseridos com sucesso.`);
  } catch (erro) {
    console.error('Erro ao importar:', erro.message);
  } finally {
    await client.close();
  }
}

importarPlanilha();

