const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
 
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    from: { type: String, required: true },
    to: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    price: { type: Number, required: true },
    transportMode: { type: String, enum: ["Bus", "Train", "Plane","Car"] , default:"Bus"},
    // hotels: [String],
    // images: [String],
    // description: String,
    // travelers:{ type: Number},
}, {
    timestamps: true   // ✅ automatically adds createdAt & updatedAt
})
 
 
module.exports = mongoose.model('Trip', TripSchema);   