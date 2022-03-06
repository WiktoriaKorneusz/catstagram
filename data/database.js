const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
let database;

const connect = async () => {
    const client = await MongoClient.connect("mongodb://0.0.0.0:27017");
    database = client.db("catstagram");
};

const getDb = () => {
    if (!database) {
        throw { message: "Database connection not established" };
    }
    return database;
};

module.exports = {
    connectDb: connect,
    getDb: getDb,
};
