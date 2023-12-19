const ClassSchema = require("../model/ClassSchema");

exports.addClass = (req, res) => {
  const Class = new ClassSchema({
    name: req.body.name,
    student: req.body.student,
  });
  Class.save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.getClass = (req, res) => {
  ClassSchema.find().populate('student')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
exports.getclassbyid = async (req, res) => {
  try {
    let student = req.params.student;
    let data = await ClassSchema.find({ student: { $in: student } }).populate("student");
    if (!data) {
      return res.status(404).send("Data is not found");
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error, "error");
  }
};

  
exports.getclassmate = async (req, res) => {
    try {
      let studentId = req.params.student;
      let data = await ClassSchema.find({ student: { $in: studentId } }).populate("student");
      if (!data || data.length === 0) {
        return res.status(404).send("No classes found for the student");
      }
       let classes = data;
      let classmates = [];
      for (let cls of classes) {
        let classmatesInClass = cls.student.filter(student => String(student._id) !== studentId);
        classmates.push({ ...cls.toObject(), student: classmatesInClass });
      }
      res.status(200).json({ message: "Classmates are", classmates: classmates });
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  };
  