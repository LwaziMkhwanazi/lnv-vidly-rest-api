import mongoose from "mongoose"

const reportSchema = new mongoose.Schema({
  year:{
      type: Array,
      default:[1,2]
  }
})

const Report = mongoose.model('Report',reportSchema)

export default Report