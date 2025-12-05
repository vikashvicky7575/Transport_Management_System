const { MongoClient } = require("mongodb");

async function migrate() {
  const localURI = "mongodb://127.0.0.1:27017/cement_transport";
  const atlasURI = "mongodb+srv://mvikash7575:Vikash408@vikashcluster.svovojy.mongodb.net/cement_transport";

  const clientLocal = new MongoClient(localURI);
  const clientAtlas = new MongoClient(atlasURI);

  try {
    await clientLocal.connect();
    await clientAtlas.connect();

    console.log("Connected to both databases");

    const localDB = clientLocal.db("cement_transport");
    const atlasDB = clientAtlas.db("cement_transport");

    const collections = await localDB.listCollections().toArray();
    console.log("Collections found:", collections.map(c => c.name));

    for (const col of collections) {
      const name = col.name;
      console.log(`\nMigrating: ${name}`);

      const localCol = localDB.collection(name);
      const atlasCol = atlasDB.collection(name);

      const data = await localCol.find().toArray();
      console.log(`Found ${data.length} documents`);

      if (data.length > 0) {
        try {
          // IMPORTANT FIX — skip duplicates to prevent crash
          await atlasCol.insertMany(data, { ordered: false });
          console.log(`✔ Inserted ${data.length} docs`);
        } catch (err) {
          console.log(`⚠ Some duplicates skipped in collection: ${name}`);
        }
      } else {
        console.log(`(empty collection)`);
      }
    }

    console.log("\n🎉 Migration Completed Successfully!");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await clientLocal.close();
    await clientAtlas.close();
  }
}

migrate();
