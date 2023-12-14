const Contact = require("../models/contactModel");
const helper = require("../utils/helper");
const { ObjectId } = require("mongodb");

module.exports.contactUs = async (req, res) => {
    try {
        const name = await helper.capitalizeName(req.body.name);
        const { email, mobile, reason } = req.body;

        const saveContact = new Contact({
            name: name,
            email: email,
            mobile: mobile,
            reason: reason
        });
        const saveData = await saveContact.save();
        const sendMailResponse = helper.sendEmail(email, 'Contact regarding', 'Thank you for contact us',
            `<p>Thank You <b> ${name} </b> for contact with us.</p> <p>We will respond to you soon.</p>`)
        res.status(200).send({ success: true, message: "Thank you for contact us.", data: saveContact });

    } catch (error) {
        console.log("Error in contactUs function", error);
    };
};

