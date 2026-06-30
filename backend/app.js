import Server from './src/server/express.server.js';

async function main() {
    try {
        const server = new Server();
        await server.start();
    } catch (error) {
        process.exit(1);
    }
}

// Manejo de errores e inicio del servidor
main().catch(
    (error) => {
        console.error('Error fatal:', error);
        process.exit(1);
    }
);

