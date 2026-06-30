import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const router = Router();
const currentDir = path.dirname(fileURLToPath(import.meta.url));

router.get('/', (_req, res) => {
    res.json({ message: 'API funcionando' });
});

const loadRouteFiles = async () => {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
        if (entry.isDirectory()) {
            const dirPath = path.join(currentDir, entry.name);
            const files = fs.readdirSync(dirPath)
                .filter((file) => file.endsWith('.js') && file !== 'index.js');

            for (const file of files) {
                const filePath = path.join(dirPath, file);
                const routeModule = await import(pathToFileURL(filePath).href);
                const route = routeModule.default ?? routeModule;
                router.use(`/${path.basename(file, '.js')}`, route);
            }
        }
    }
};

await loadRouteFiles();

export default router;