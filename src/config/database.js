const mongoose= require("mongoose")

const connectDB= async () => {
        await mongoose.connect("mongodb+srv://thiru9702856_db_user:8Vij5HGixwJgqQsz@thirunode.pxxd9sr.mongodb.net/devTinder");
}

module.exports=connectDB;

        