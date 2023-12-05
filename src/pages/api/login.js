import clientPromise from '@/lib/mongodb';

export default async function clientes(req, res) {
    const client = await clientPromise;
    const db = await client.db('salesData');
    switch(req.method){
        case 'POST':
            const {user, password} = req.body
            const userData = await db.collection('users').find({user, password}).toArray();
            res.json({ status: 200, data: userData });
            break;
    }
}