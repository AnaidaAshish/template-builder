import express from 'express';
import Template from '../models/templateModel.js';

const router = express.Router();

// Get all templates
router.get('/', async (req, res) => {
    try {
        const templates = await Template.find(); // Fetch all templates from MongoDB
        res.json(templates);
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

// Create a new template
router.post('/', async (req, res) => {
    const { name, content, type } = req.body;

    // Validate required fields
    if (!name || !content || !type) {
        return res.status(400).json({ error: 'All fields (name, content, type) are required' });
    }

    try {
        const template = new Template({
            name,
            content,
            type,
            createdDate: new Date(), // Optional, MongoDB will auto-create timestamps if configured
        });

        const savedTemplate = await template.save(); // Save to MongoDB
        res.status(201).json(savedTemplate);
    } catch (err) {
        res.status(400).json({ message: 'Error creating template: ' + err.message });
    }
});

// Update a template
router.put('/:id', async (req, res) => {
    const { name, content } = req.body;

    try {
        const updatedTemplate = await Template.findByIdAndUpdate(
            req.params.id,
            { name, content },
            { new: true } // Return the updated document
        );

        if (!updatedTemplate) {
            return res.status(404).json({ message: 'Template not found' });
        }

        res.json(updatedTemplate);
    } catch (err) {
        res.status(400).json({ message: 'Error updating template: ' + err.message });
    }
});

// Delete a template
router.delete('/:id', async (req, res) => {
    try {
        const deletedTemplate = await Template.findByIdAndDelete(req.params.id);

        if (!deletedTemplate) {
            return res.status(404).json({ message: 'Template not found' });
        }

        res.json({ message: 'Template deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting template: ' + err.message });
    }
});

export default router;
