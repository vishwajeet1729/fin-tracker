import express from "express";
import FinancialRecordModal from "../financial-record";

const router = express.Router();

router.get("/getAllByUserID/:userId", async (req, res) => {
  try {
    const records = await FinancialRecordModal.find({
      userId: req.params.userId,
    });
    if (records.length == 0)
      return res.status(404).send("no record found for the user.");
    res.status(200).send(records);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  console.log("made reques to add record post")
  try {
    const newRecordBody = req.body;
    const newRecord = new FinancialRecordModal(newRecordBody);
    const savedRecord = await newRecord.save();
    res.status(200).send(savedRecord);
  } catch (err) {
    res.status(500).send(err);
  }

}
);

router.put("/:id", async (req, res) => {
  try {
    const newRecordBody = req.body;
    const record = await FinancialRecordModal.findByIdAndUpdate(
      req.params.id,
      newRecordBody,
      { new: true }
    );

    if (!record) return res.status(404).send();
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
   console.log("made a put request")
});

router.delete("/:id", async (req, res) => {
  try {
    const record = await FinancialRecordModal.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).send();
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
  console.log("made delete request")
});

export default router;
