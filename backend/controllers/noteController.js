
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Note = require('../models/noteModel')
const Ticket = require('../models/ticketModel')



// @desc    Get notes for a tickets
// @route   /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
    // Get user using the id in the jwt

    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.find(req.params.ticketId)

    // if (ticket.user.toString() !== req.user.id) {
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }

    const notes = await Note.find({ ticket: req.params.ticketId })



    res.status(200).json(notes)

})
// @desc    Create a tickets note
// @route   Post /api/tickets/:ticketId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
    // Get user using the id in the jwt

    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.find(req.params.ticketId)

    // if (ticket.user.toString() !== req.user.id) {
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }

    const note = await Note.create({
        text: req.body.text,
        isStaff: false,
        ticket: req.params.ticketId,
        user: req.user.id

    })



    res.status(200).json(note)

})


module.exports = {
    getNotes,
    addNote
}












