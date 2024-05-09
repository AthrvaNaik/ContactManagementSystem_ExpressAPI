const asyncHandler = require('express-async-handler')
const Contact=require("../Models/contactModel")


//get all contacts
//route GET /api/contacts
//private

const getContacts = asyncHandler(async(req, res) => {
  try {
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error in fetching contacts", error: error.message });
  }
});


//get single contact
//route GET /api/contacts/:id
//private
const getSingleContact = asyncHandler(async(req, res) => {
  const contact=await Contact.findById(req.params.id);
  if(!contact){
    res.status(404).json({ message: "Contact not found" });
  }
  res.status(200).json(contact);
});

//Create contact
//route POST /api/contacts/
//private
const createContact = asyncHandler(async(req, res) => {
  console.log(req.body);
  const {name,email,phone}=req.body;
  if(!name || !email || !phone){
    res.status(400);
    throw new Error("Please fill all details.");
  }
  const contact = await Contact.create({
    name, 
    email,
    phone,
    user_id:req.user.id,
  })
  // res.status(201).json({ message: "Create Contact" });
  res.status(201).json(contact);
});

//update single contact
//route PUT /api/contacts/:id
//private
const updateContact = asyncHandler(async(req, res) => {
  // res.status(200).json({ message: `Update Contact ${req.params.id}` });
  const contact=await Contact.findById(req.params.id);
  if(!contact){
    res.status(404).json({ message: "Contact not found" });
  }//line 52-54 fetch the contact
  if(contact.user_id.toString() != req.user.id){
    res.status(403)
    throw new Error("Cannot update contact of other users.")
  }

  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  );
  res.status(200).json(updateContact)

});

//Delete single contact
//route Delete /api/contacts/:id
//private
const deleteContact =asyncHandler(async (req, res) => {
  // res.status(200).json({ message: `Delete Contact Contact ${req.params.id}` });
  const contact=await Contact.findById(req.params.id);
  if(!contact){
    res.status(404).json({ message: "Contact not found" });
  }
  if(contact.user_id.toString() != req.user.id){
    res.status(403)
    throw new Error("Cannot delete contact of other users.")
  }

  await Contact.deleteOne({_id:req.params.id});
  res.status(200).json(contact)
});


module.exports = {
  getContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
}
