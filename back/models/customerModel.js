const customerSchema = new mongoose.Schema({
  lastname: {
    type: String,
    lenght: 30,
    required: true,
  },
  firstname: {
    type: String,
    lenght: 30,
    required: true,
  },
  email: {
    type: String,
    lenght: 60,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    lenght: 70,
    required: true,
  },
  zipcode: {
    type: String,
    lenght: 10,
    required: true,
  },
  city: {
    type: String,
    lenght: 20,
    required: true,
  },
  phone: {
    type: String,
    lenght: 20,
    required: true,
  },
  date_birthday: {
    type: Date,
  },
  date_create: {
    type: Date,
    default: Date.now,
  },
  date_update: {
    type: Date,
    default: Date.now,
  },
});

const Customer = mongoose.model("Customer", customerSchema);
