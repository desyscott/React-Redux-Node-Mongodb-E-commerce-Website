import nodemailer from "nodemailer";

const mailTransport = () => {
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false, //true for 465,false for other ports
    auth: {
      user: "c484d71199375a", //generate a ethereal user
      pass: "b0bfe1a9abb20d", //generate a ethereal password
    },
    tls: {
      rejectUnauthorize: false,
    },
  });
  transport.verify((err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      console.log("transport is ready to receive mail");
    }
  });
  return transport;
};

export { mailTransport };
