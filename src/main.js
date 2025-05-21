import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import '@motherduck/wasm-client/with-arrow';
import { MDConnection } from '@motherduck/wasm-client';

async function motherDuckerTest(){
    
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlYW5hbi5yaWxleUBiZXJrZWxleS5lZHUiLCJzZXNzaW9uIjoic2VhbmFuLnJpbGV5LmJlcmtlbGV5LmVkdSIsInBhdCI6InhnSEtsZG05OFZ6TjQybzNJWlBSZmNJc21uVEhsMUw4V3h5Qy1OYjV3cFUiLCJ1c2VySWQiOiI0ZjZhMDY3OS0xNjI4LTRkZDktOWMxMy0wNDE3ZTZiNDMwZmYiLCJpc3MiOiJtZF9wYXQiLCJyZWFkT25seSI6dHJ1ZSwidG9rZW5UeXBlIjoicmVhZF9zY2FsaW5nIiwiaWF0IjoxNzQ3NjAzNDY2LCJleHAiOjE3NTE0OTE0NjZ9.j01WY9HxAPANeWvh4pPrBVOHtHuBm8k90XSF0f_dmeQ'
  const connection = MDConnection.create({
    mdToken: token
  });

  await connection.isInitialized();

  const sql = `
  SELECT created_date, agency, complaint_type, landmark, resolution_description
  FROM sample_data.nyc.service_requests 
  WHERE created_date >= '2021-01-01' AND created_date <= '2021-01-31'
  limit 3;
  `

  var resultString = ""

  try {
    const result = await connection.evaluateQuery(sql);
    console.log('query result', result);
    const cols = result.data.columnNames();
    console.log(cols);
    const rows = result.data.toRows();
    var rowID = 0;
    for (const row in rows){
      var colID = 0;
      resultString += " \n <p> \n "
      for (const col in cols){
        console.log(row);
        resultString += result.data.value(colID, rowID) + ",";
        colID += 1
      }
      resultString += " \n </p> \n "
      rowID += 1
    };
    document.querySelector('#data').innerHTML = resultString;
    
  } catch (err) {
    console.log('query failed', err);
  }
}

document.querySelector('#app').innerHTML = /*html*/`
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="runQuery" type="button">Run Query</button>
      <div id = "data"></div>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

document.querySelector('#runQuery').addEventListener('click', motherDuckerTest)