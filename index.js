const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//middelware
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:5173",
      "https://glittery-puppy-29e3bc.netlify.app",
      "http://bill-manage-system.surge.sh",
    ],
    credentials: true,
  })
);
app.use(express.json());

//MongoDB Connection
const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@cluster0.wwzrsnj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    //collection List
    const categoryCollection = client.db("shohan").collection("category");
    const itemCollection = client.db("shohan").collection("items");
    const supplierCollection = client.db("shohan").collection("supplier");
    const dueBillCollection = client.db("shohan").collection("due-bill");
    const userCollection = client.db("shohan").collection("user");
    //Category section

    app.post("/api/category", async (req, res) => {
      const category = req.body;
      const result = await categoryCollection.insertOne(category);
      res.send(result);
    });

    app.get("/api/category", async (req, res) => {
      const result = await categoryCollection.find().toArray();
      res.send(result);
    });

    // app.get("/api/category", async (req, res) => {
    //   const user = req.query.userEmail;
    //   const filter = { userEmail: user };
    //   const result = await categoryCollection.find(filter).toArray();
    //   res.send(result);
    // });

    app.get("/api/category/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await categoryCollection.findOne(filter);
      res.send(result);
    });

    app.delete("/api/category/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await categoryCollection.deleteOne(filter);
      res.send(result);
    });

    app.put("/api/category/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateCategory = req.body;
      console.log(updateCategory);
      const category = {
        $set: {
          categoryName: updateCategory.categoryName,
          categoryMode: updateCategory.categoryMode,
        },
      };
      const result = await categoryCollection.updateOne(filter, category);
      res.send(result);
    });
    //Item section

    app.post("/api/item", async (req, res) => {
      const item = req.body;
      const result = await itemCollection.insertOne(item);
      res.send(result);
    });

    app.get("/api/items", async (req, res) => {
      const result = await itemCollection.find().toArray();
      res.send(result);
    });

    app.get("/api/item", async (req, res) => {
      const user = req.query.userEmail;
      const filter = { userEmail: user };
      const result = await itemCollection.find(filter).toArray();
      res.send(result);
    });

    app.get("/api/item/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await itemCollection.findOne(filter);
      res.send(result);
    });

    app.delete("/api/item/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await itemCollection.deleteOne(filter);
      res.send(result);
    });

    app.put("/api/item/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateItem = req.body;
      console.log(updateItem);
      const item = {
        $set: {
          ...updateItem,
        },
      };
      const result = await itemCollection.updateOne(filter, item);
      res.send(result);
    });

    //Supplier Section
    app.post("/api/supplierInfo", async (req, res) => {
      const supplierInfo = req.body;
      const result = await supplierCollection.insertOne(supplierInfo);
      res.send(result);
    });

    app.get("/api/supplierInfo", async (req, res) => {
      const result = await supplierCollection.find().toArray();
      res.send(result);
    });

    app.get("/api/supplierInfo/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await supplierCollection.findOne(filter);
      res.send(result);
    });

    app.delete("/api/supplierInfo/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await supplierCollection.deleteOne(filter);
      res.send(result);
    });
    app.put("/api/supplierInfo/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateSupplier = req.body;
      console.log(updateSupplier);
      const supplierInfo = {
        $set: {
          ...updateSupplier,
        },
      };
      const result = await supplierCollection.updateOne(filter, supplierInfo);
      res.send(result);
    });

    //Due-Bill Section

    app.post("/api/due-bill", async (req, res) => {
      const bill = req.body;
      const result = await dueBillCollection.insertOne(bill);
      res.send(result);
    });

    app.get("/api/due-bill", async (req, res) => {
      const result = await dueBillCollection.find().toArray();
      res.send(result);
    });

    app.get("/api/due-bill/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await dueBillCollection.findOne(query);
      res.send(result);
    });

    app.patch("/api/due-bill/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { _id: new ObjectId(id) };
      const updatebill = req.body;
      console.log(updatebill);
      const dueBill = {
        $set: {
          ...updatebill,
        },
      };
      const result = await dueBillCollection.updateOne(filter, dueBill);
      res.send(result);
    });

    //For received bill search
    app.get("/api/filtered-due-bill", async (req, res) => {
      const fromDate = new Date(req.query.fromDate);
      const toDate = new Date(req.query.toDate);
      const supplier = req.query.supplier;

      console.log(fromDate, toDate, supplier);

      try {
        const result = await dueBillCollection
          .aggregate([
            {
              $match: {
                supplierName: supplier,
                billStatus: "Received",
                $expr: {
                  $and: [
                    {
                      $gte: [
                        { $dateFromString: { dateString: "$billReceiveDate" } },
                        fromDate,
                      ],
                    },
                    {
                      $lte: [
                        { $dateFromString: { dateString: "$billReceiveDate" } },
                        toDate,
                      ],
                    },
                  ],
                },
              },
            },
          ])
          .toArray();
        res.send(result);
      } catch (err) {
        res.status(500).send({ message: "Error fetching data", error: err });
      }
    });

    //Filter Monthly Report by purchase

    app.get("/api/monthly-report-billStatus", async (req, res) => {
      const fromDate = new Date(req.query.fromDate);
      const toDate = new Date(req.query.toDate);
      const report = req.query.report;
      const company = req.query.company;
      const email = req.query.email;
      console.log(fromDate, toDate, report, email);

      try {
        const result = await dueBillCollection
          .aggregate([
            {
              $match: {
                billStatus: report,
                userEmail: email,
                coampanyVoucher: company,
                $expr: {
                  $and: [
                    {
                      $gte: [
                        { $dateFromString: { dateString: "$billsubmiteDate" } },
                        fromDate,
                      ],
                    },
                    {
                      $lte: [
                        { $dateFromString: { dateString: "$billsubmiteDate" } },
                        toDate,
                      ],
                    },
                  ],
                },
              },
            },
          ])
          .toArray();
        res.send(result);
      } catch (err) {
        res.status(500).send({ message: "Error fetching data", error: err });
      }
    });
    //Filter Monthly Report by purchase

    app.get("/api/monthly-report-purchase", async (req, res) => {
      const fromDate = new Date(req.query.fromDate);
      const toDate = new Date(req.query.toDate);
      const report = req.query.report;
      const email = req.query.email;
      console.log(fromDate, toDate, report, email);
      try {
        const result = await dueBillCollection
          .aggregate([
            {
              $match: {
                userEmail: email,
                purchaseType: report,
                $expr: {
                  $and: [
                    {
                      $gte: [
                        { $dateFromString: { dateString: "$purchaseDate" } },
                        fromDate,
                      ],
                    },
                    {
                      $lte: [
                        { $dateFromString: { dateString: "$purchaseDate" } },
                        toDate,
                      ],
                    },
                  ],
                },
              },
            },
          ])
          .toArray();
        res.send(result);
      } catch (err) {
        res.status(500).send({ message: "Error fetching data", error: err });
      }
    });

    //user collection
    app.post("/api/user", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
    app.get("/api/user", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.get("/api/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    app.patch("/api/user/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateUser = req.body;
      const user = {
        $set: {
          ...updateUser,
        },
      };
      const result = await userCollection.updateOne(filter, user);
      res.send(result);
    });

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to Bill Management Server");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
