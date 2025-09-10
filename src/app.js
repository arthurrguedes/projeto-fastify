import Fastify from 'fastify';
import { prisma } from './db.js';
import booksRoutes from './routes/books.js';

export function buildApp() {
    const app = Fastify({ logger: true});

    // Deixa o prisma disponivel no fastify
    app.decorate('prisma', prisma);

    //rotas
    app.register(booksRoutes);

    //fecha o prisma ao encerrar o app
    app.addHook('onClose', async (instance) => {
        await instance.prisma.$disconnect();
    });

    return app;
}