import express from "express";
import axios from "axios";
const app = express();
const port = 3000;
import fs from "fs";
import bodyParser from "body-parser";
import { deleteAnimal, getAnimals, postAnimal } from "./dbaccess";
import { updateOne } from "./dbaccess/dbaccess";
const cors = require("cors");
const path = require("path");

const config = {
  accept: "application/json",
  headers: {
    // Authorization: "Bearer ",
    Authorization:
      "Bearer eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhSUxFWjdFVlNMWW5SUmRzM0sxbmkzakl5YUgyV2tRZUExakpwSUFvQ25vWmtweXgiLCJpc3MiOiJodHRwczpcL1wvYXBpLmZsYXRpY29uLmNvbVwvb2F1dGhcL3Rva2VuIiwiZXhwIjoxNjc4OTEwMzYxLCJpYXQiOjE2Nzg4MjM5NjEsImp0aSI6ImQ3MDc2MjRmLWFjYmUtNDg4MS1hYjIxLTYyY2YzMGQ3YWI5ZiIsImNsaWVudF9pZCI6ImFJTEVaN0VWU0xZblJSZHMzSzFuaTNqSXlhSDJXa1FlQTFqSnBJQW9Dbm9aa3B5eCJ9.fw2RdjkMKcq1tGrfutQxW1Z4rUaFJpOufdQJ8heBP1E",
  },
};

// const getFlaticonKey = (() => {
//   var headers = {
//     "Content-Type": "multipart/form-data",
//   };
//   axios({
//     method: "post",
//     url: "https://api.flaticon.com/v3/app/authentication",
//     headers: headers,
//     data: {
//       apikey: "aILEZ7EVSLYnRRds3K1ni3jIyaH2WkQeA1jJpIAoCnoZkpyx",
//     },
//   })
//     .then((r) => {
//       config.headers.Authorization += r.data.data.token;
//       console.log(config.headers.Authorization);
//     })
//     .catch((e) => console.log);
// })();

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/images/:tag", async (req, res) => {
  const tag = req.params.tag;
  const headers = {
    Accept: "application/json",
    Authorization: "string",
  };
  axios
    .get(
      `https://api.flaticon.com/v3/search/icons?q=${tag}&styleColor=color&limit=50`,
      config
    )
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/mockapi/images/:tag", async (req, res) => {
  const images = fs.readFileSync(path.resolve(__dirname, "mockimages.json"));
  res.status(200).send(images.toString());
});

app.post("/api/animals/", async (req, res) => {
  try {
    await postAnimal(req.body);
    res.status(200).send(req.body);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
  res.end();
});

app.get("/api/animals", async (req, res) => {
  try {
    const animals = await getAnimals();
    res.status(200).send(animals);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.delete("/api/animals/:id", async (req, res) => {
  try {
    await deleteAnimal(req.params.id);
    res.status(201).end();
  } catch (e) {
    res.status(500).send(e);
  }
});

app.patch("/api/animals/:id", async (req, res) => {
  try {
    const animal = req.body;
    await updateOne(animal);
    res.status(201).end();
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
