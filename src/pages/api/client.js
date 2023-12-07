import clientPromise from '@/lib/mongodb';
import { ObjectID } from 'mongodb';

export default async function clientes(req, res) {
    const client = await clientPromise;
    const db = await client.db('salesData');
    const {name, phone, email, cpf} = req.body;
    const { id } = req.query;
    const { user } = req.headers;

    switch(req.method){
        case 'POST':
            console.log(user);
            if (id) {
                const client = await db.collection('clients').updateOne({_id: ObjectID(id)}, {$set: {name, phone, email, cpf, user: ObjectID(user)}});
                res.json({ status: 200, data: client });
                break;
            }
            const client = await db.collection('clients').insertOne({name, phone, email, cpf, user: ObjectID(user)})
            res.json({ status: 200, data: client });
            break;

        case 'GET':
            console.log(user);
            if (id) {
                const client = await db.collection('clients').findOne({ _id: ObjectID(id) });
                res.json({ status: 200, data: client });
                console.log(client);
                break;
            }
            const clients = await db.collection('clients').find({user: ObjectID(user)}).toArray();
            res.json({ status: 200, data: clients });
            break;
        case 'DELETE':
            console.log('id',id);
            const deleteClient = await db.collection('clients').deleteOne({_id: ObjectID(id)});
            res.json({ status: 200, data: deleteClient });
            break;
    }
}