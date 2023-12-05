import clientPromise from '@/lib/mongodb';

export default async function clientes(req, res) {
    const client = await clientPromise;
    const db = await client.db('pessoasData');
    switch(req.method){
        case 'GET':
            const allClientes = await db.collection('pessoas').find({}).toArray();
            res.json({ status: 200, data: allClientes });
            break;
    }
}