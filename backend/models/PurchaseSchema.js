const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserSchema',
    required: true
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'PackageSchema',
    required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PurchaseSchema', PurchaseSchema);
