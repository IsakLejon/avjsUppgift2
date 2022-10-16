const net = require('net');

const readLine = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const logIn = question => {
  return new Promise(resolve => {
    readLine.question(question, (answer) => {
      resolve(answer)
    });
  });
}

const chattApp = async () => {
  let run = true;
  const userName = await logIn('Välj ett användarnamn: ')
  while(run){
    const address = await logIn('Välj  chattrum: 1: server8000 eller [2] server8010 > ')

     if(address === '1'){
      const server = net.createConnection(8000);

      server.on('connect', () => {
        server.write(`${userName} gick med i chatten..`)
        console.log('Välkommen till server8000!')
        console.log('skriv "exit" för att avsluta sessionen');
      });
    
      readLine.on('line', data => {
        if(data === 'exit'){
          server.write(`${userName} lämnade chatten.`);
          server.end();
        } else {
          server.write(`${userName}: ${data}`)
        }
      });
      server.on('data', data => {
        console.log('\x1b[33m%s\x1b[0m', data);
      });
     
      server.on('end', () => {
        process.exit();
      });
    
      server.on('error', () => {
        console.log('Servern är offline.');
      });
      run = false;
    }if(address === '2'){
      const server = net.createConnection(8010);
      server.on('connect', () => {
        server.write(`${userName} gick med i chatten..`)
        console.log('Välkommen till server8010!')
        console.log('skriv "exit" för att avsluta sessionen')
      });
    
      readLine.on('line', data => {
        if(data === 'exit'){
          server.write(`${userName} har lämnat chatten.`);
          server.end();
        } else {
          server.write(`${userName}: ${data}`)
        }
      });
    
      server.on('data', data => {
        console.log('\x1b[33m%s\x1b[0m', data);
      });
    
      server.on('end', () => {
        process.exit();
      });
    
      server.on('error', () => {
        console.log('Servern är offline');
      });
      run = false;
    }
    if(address !== '1' && address !=='2'){
      console.log('Felaktigt input, välj mellan 1 eller 2');
    }
  }

}
chattApp();
  
