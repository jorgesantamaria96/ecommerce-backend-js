import mongoose from 'mongoose';

// Logs
import log4js from '../logs/loggers.js';
const loggerConsola = log4js.getLogger('console');
const loggerError = log4js.getLogger('error');

// MongoDB Connection
import { MONGO_URI, ADVANCED_OPTIONS } from '../configuration/mongodb.js';
const main = () => {
  mongoose.connect(MONGO_URI, ADVANCED_OPTIONS);

  mongoose.connection.on('open', () => {
    loggerConsola.info('MongoDB connected successfully');
  });
  mongoose.connection.on('error', (err) => {
    loggerError.error('MongoDB connection error: ' + err);
  });
};

main();

// Util Functions
import { asPOJO, renameField, removeField } from '../utils/index.js';

// Class Container
class ContainerMongoDB {
  constructor(name, schema) {
    this.collection = mongoose.model(name, schema);
  }

  async save(newElem) {
    try {
      let doc = await this.collection.create(newElem);
      doc = asPOJO(doc);
      renameField(doc, '_id', 'id');
      removeField(doc, '__v');
      return doc;
    } catch(err) {
      loggerError.error('Error saving element: ' + err);
      throw Error("Error saving element");
    }
  }

  async getById(id) {
    try{
      let doc = false;
      doc = await this.collection.findOne({_id: id}, {__v: 0});
      if (doc) {
        doc = asPOJO(doc);
        const result = renameField(doc, '_id', 'id');
        return result;
      } else {
        return false;
      }
    } catch(err) {
      loggerError.error('Error getting element: ' + err);
      throw Error("Error getting element by id: " + id);
    }
  }

  async getAll() {
    try{
      let docs = await this.collection.find({}, {__v: 0}).lean();
      docs = asPOJO(docs);
      docs = docs.map((doc) => renameField(doc, '_id', 'id'));
      return docs;
    } catch (err) {
      loggerError.error('Error getting elements: ' + err);
      throw Error("Error getting all elements");
    }
  }

  async deleteById(id) {
    try{
      let doc = await this.collection.findOneAndDelete({_id: id});
      if (doc) {
        doc = asPOJO(doc);
        const result = renameField(doc, '_id', 'id');
        return result;
      } else {
        return { err: "Error, item con id no encontrado" };;
      }
    } catch(err) {
      loggerError.error('Error deleting element: ' + err);
      throw Error("Error deleting element by id: " + id);
    }
  }

  async deleteAll() {
    try {
      await this.collection.deleteMany({});
      return { msg: "Todos los productos fueron eliminados"};
    } catch (err) {
      loggerError.error('Error deleting all elements: ' + err);
      throw Error("Error deleting all elements");
    }
  }

  async update(id, newElem) {
    try {
      renameField(newElem, 'id', '_id');
      const { n, nModified } = await this.collection.replaceOne({_id: newElem._id}, newElem);
      if (n == 0 || nModified == 0) {
        throw new Error("Error, no se pudo actualizar el elemento porque no se encuentra elemento con id: " + newElem._id);
      } else {
        renameField(newElem, '_id', 'id');
        removeField(newElem, '__v');
        return asPOJO(newElem);
      }
    } catch (err){
      loggerError.error('Error updating element: ' + err);
      throw Error("Error updating element");
    }
  }
}

export {
  ContainerMongoDB
};




