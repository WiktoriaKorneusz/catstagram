const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
let database;

let url = "mongodb://0.0.0.0:27017"

if (process.env.MONgodb_URL){
    url = process.env.MONgodb_URL;
}
const connect = async () => {
    const client = await MongoClient.connect(url);
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
