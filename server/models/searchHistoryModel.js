const mongoose = require('mongoose');

const searchHistorySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    query: {
      type: String,
      required: true,
    },
    filters: {
      category: { type: String },
      minPrice: { type: Number },
      maxPrice: { type: Number },
      rating: { type: Number },
      inStock: { type: Boolean },
    },
    results: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster lookups
searchHistorySchema.index({ user: 1, createdAt: -1 });

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

module.exports = SearchHistory;