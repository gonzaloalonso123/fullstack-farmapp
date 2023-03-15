import { MongoClient, Collection } from "mongodb";
import { AnimalConfig, UserConfig } from "../types/types";

const authMechanism = "DEFAULT";
const uri = `mongodb://admin:password@localhost:27017/farm?authMechanism=${authMechanism}`;
const client = new MongoClient(uri);
async function run() {
  console.log("eee");
  try {
    await client.db("admin").command({ ping: 1 });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

const getAnimalCollection = async (): Promise<Collection> => {
  client.connect();
  const animals: Collection = await client.db("farm").collection("animals");
  return animals;
};

export const getAll = async () => {
  client.connect();
  const animals = await getAnimalCollection();
  const all = await animals.find({}).toArray();
  return all;
};

export const addOne = async (animal: AnimalConfig) => {
  client.connect();
  const animals = await getAnimalCollection();
  animals.insertOne(animal);
  return animal;
};

export const deleteOne = async (id: string) => {
  client.connect();
  const animals = await getAnimalCollection();
  animals.deleteOne({ id: id });
};

export const updateOne = async (animal: AnimalConfig) => {
  client.connect();
  const animals = await getAnimalCollection();
  console.log(animal);
  animals.updateOne(
    { id: animal.id },
    {
      $set: {
        element: animal.element,
        speed: animal.speed,
        direction: animal.direction,
      },
    }
  );
};
