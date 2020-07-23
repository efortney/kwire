
/**
 * Questions api
 */
module.exports = (app, Questions) => {
  app.get('/api/questions/recent', async (req, res) => {
    const data = await Questions.find().limit(50).sort({ updatedAt: 'asc' }).populate('author');
    res.send(data);
  });

  app.get('/api/questions/tag/:tag', async (req, res) => {
    const data = await Questions.find({ tags: req.params.tag }).limit(50).populate('author');
    res.send(data);
  });

  app.get('/api/questions/:id', async (req, res) => {
    const data = await Questions.findOne({ _id: req.params.id }).populate('author');
    res.send(data);
  });

  app.get('/api/questions/author/:id', async (req, res) => {
    const data = await Questions.find({ author: req.params.id }).populate('author');
    res.send(data);
  });

  app.get('/api/questions/query/:query', async (req, res) => {
    const query = req.params.query;
    const data = await Questions.find({ body: { "$regex": `${query}`, "$options": "i" } }).populate('author');
    res.send(data);
  });

  app.post('/api/questions', (req, res) => {
    const question = new Questions({
      title: req.body.postContent.title,
      body: req.body.postContent.body,
      author: req.body.user
    });
    question.save((err) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(question);
    });
  });

  app.post('/api/questions/reply', async (req, res) => {
    // pull off some of the values we are going to use and make them vars
    const postId = req.body.postContent._id;
    const answerBody = req.body.replyContent.body;
    const answer = {
      body: answerBody,
      author: req.body.user
    };
    // perform the upsert 
    const filter = { _id: postId }
    const update = { $push: { answers: answer } }
    await Questions.findOneAndUpdate(
      filter, update, { upsert: true }, (err, reply) => {
        if (err) {
          res.send(err).status(500);
        } else {
          res.send(reply).status(200);
        }
      }
    );
  });
}