const errNotFound = (req, res) => {
    res.status(404).send({
      message: 'Указаный URL не существует',
    });
  };

module.exports = errNotFound