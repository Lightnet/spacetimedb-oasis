import { defineConfig } from 'vite';

import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  plugins: [
    {
      name: 'api-routes',
      configureServer(server) {
        server.middlewares.use('/hello', (req, res) => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Hello from Vite server!' }));
          return;
        });

        server.middlewares.use('/write-hello', (req, res) => {
          const filePath = path.resolve(__dirname, 'hello.txt');
          const content = 'Hello World - written by Bun/Vite server';

          try {
            // Write the file to the project root
            fs.writeFileSync(filePath, content, 'utf8');
            
            res.statusCode = 200;
            res.end(`Success: File written to ${filePath}`);
          } catch (err:any) {
            res.statusCode = 500;
            res.end(`Error writing file: ${err.message}`);
          }
        });

      }
    }
  ],
  server: {
    port: 5173,
  },
});
