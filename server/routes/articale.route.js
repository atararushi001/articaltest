const express = require('express');
const multer = require('multer');
const path = require('path');
const { Article } = require('../model/artical.model'); // Ensure the correct path to the Article model

const articlesRouter = express.Router();



// Route to create a new article
articlesRouter.post('/', async (req, res) => {
  const { title, content } = req.body;


  // Validate required fields
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    // Create a new article
    const article = await Article.create({
      title,
      content,
   
    });

    // Send a success response
    res.status(201).json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get all articles
articlesRouter.get('/', async (req, res) => {
  try {
    // Fetch all articles
    const articles = await Article.findAll();
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update an existing article
articlesRouter.put('/:id',async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  
  // Validate required fields
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    // Find the article by ID
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Update the article
    article.title = title;
    article.content = content;
   

    await article.save();

    // Send a success response
    res.status(201).json(article);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = articlesRouter;