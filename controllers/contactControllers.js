import Contact from "../models/contactModal.js";

export const createContact = async (req, res) => {
    try {
        const { names, email, subject, message, phone } = req.body;
        const newContact = new Contact({ names, email, subject, message, phone });

        await newContact.save();

        res.status(201).json({ success: true, message: "Contact created successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}



export const getAllcontact = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({ success: true, contacts })
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}



export const getContactById = async (req, res) => {
    try {
        const { Id } = req.params;
        const contacts = await Contact.findById(Id);
        if (!contacts) {
            return res.status(404).json({ success: false, message: "contact not found" });
        }
        res.status(200).json({ success: true, contacts });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "server error", error: error.message });
    }
}



export const deleteContactById = async (req, res) => {
    try {
        const { Id } = req.params;
        const contact = await Contact.findByIdAndDelete(Id);
        if (!contact) {
            return res.status(404).json({ success: false, message: "contact not found" });
        }
        res.status(200).json({ success: true, message: " contact deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, meassage: "server error", error: error.message });
    }

}


export const updateDataById = async (req, res) => {
    try {
        const { Id } = req.params;
        const updateData = await Contact.findByIdAndUpdate( Id, req.body );
        if (!updateData) {
            return res.status(404).json({ success: false, message: "contact not found" });
        }
        res.status(200).json({ success: true, message: " contact Updated successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, meassage: "server error", error: error.message });
    }
}