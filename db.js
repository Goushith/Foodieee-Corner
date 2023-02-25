const mongoose = require('mongoose')


const mongoDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/goFood',
        { useNewUrlParser: true },

        async (err, result) => {
            if (err) console.log('---', err);
            else {

                console.log('connected to MongoDB')
                const fetched_data = await mongoose.connection.db.collection("food_items");
                fetched_data.find({}).toArray(async function (err, data) {
                    const foodCategories = await mongoose.connection.db.collection("foodCategories");

                    foodCategories.find({}).toArray(function (err, catData) {
                        if (err)   console.log(err);
                        else {
                            global.food_items = data
                            global.foodCategories = catData
                        }
                    })

                })
            }

        })

}


module.exports = mongoDB