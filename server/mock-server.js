const http = require('http');

let comptes = [
  { id: '1', solde: 1200.5, dateCreation: new Date().toISOString(), type: 'COURANT' },
  { id: '2', solde: 5400, dateCreation: new Date().toISOString(), type: 'EPARGNE' },
];
let nextId = 3;

function sendJson(res, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  if (req.url === '/graphql' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const query = payload.query || '';
        const variables = payload.variables || {};

        // Simple string matching to determine operation
        if (query.includes('query GetAllComptes') || query.includes('allComptes')) {
          return sendJson(res, { data: { allComptes: comptes } });
        }

        if (query.includes('mutation SaveCompte') || query.includes('saveCompte')) {
          const compteReq = variables.compte || {};
          const newCompte = {
            id: String(nextId++),
            solde: compteReq.solde != null ? compteReq.solde : 0,
            type: compteReq.type || 'COURANT',
            dateCreation: new Date().toISOString(),
          };
          comptes.push(newCompte);
          return sendJson(res, { data: { saveCompte: newCompte } });
        }

        if (query.includes('GetCompteById') || query.includes('compteById')) {
          const id = variables.id;
          const c = comptes.find(x => x.id === id) || null;
          return sendJson(res, { data: { compteById: c } });
        }

        // Default response for unknown operations
        return sendJson(res, { data: null, errors: [{ message: 'Operation not implemented in mock server' }] });
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ errors: [{ message: 'Invalid JSON' }] }));
      }
    });
    return;
  }

  // root
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('Mock GraphQL server running');
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

const PORT = 8082;
server.listen(PORT, () => {
  console.log(`Mock GraphQL server listening on http://localhost:${PORT}/graphql`);
});
