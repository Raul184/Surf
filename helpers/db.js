const db = async () => {
  try {
    await new MongoClient(uri, { useNewUrlParser: true });
    console.log('DB connected')  
  } 
  catch (err) {
    console.log('Error on DB Connection')
    console.log(err.message)
  }
}

module.exports = db;