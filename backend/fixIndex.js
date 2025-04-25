const mongoose = require('mongoose');

async function fixIndex() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://127.0.0.1:27017/educational_gamification', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Get the users collection
        const usersCollection = mongoose.connection.collection('users');

        // Drop the problematic index
        await usersCollection.dropIndex('username_1');
        console.log('Successfully dropped the username index');

        // Close the connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

fixIndex(); 