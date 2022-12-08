import { Message } from "../models/message.js";

export const save_message = async (req, res) => {
  //res.status(200).send(req.body);
  let message = new Message({
    message: req.body.message,
  });
  message
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .send(err.errors[Object.keys(err.errors)[0]].properties.message);
    });
};

export const get_message = async (req, res) => {
  const message = await Message.find().limit(1);
  if (message) {
    //res.send(message);
    //the message is in message[0].message
    let toSplit = message[0].message;
    let splitted = toSplit.split(" ");
    let tranposed = splitted.reverse();
    res.send(tranposed);
  } else {
    res.status(400).send("not found");
  }
};
