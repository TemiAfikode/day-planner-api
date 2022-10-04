module.exports = function (err, _req, res, _next) {
  try {
    if (err.name === 'ValidationError') {
      return (err = handleValidationErr(err, res));
    }
    if (err.code && err.code === 11000) {
      return (err = handleDuplicateError(err, res));
    }
    if (err.name === 'CastError') {
      return (err = handleBadObjectId(err, res));
    }
  } catch (err) {
    res.status(500).json({
      isSuccessful: false,
      error: {message:'Server error', path: null},
    });
  }
}

const handleValidationErr = (err, res) => {
  res.status(400).json({
    isSuccessful: false,
    error: {
      message: Object.values(err.errors).map((err) => err.message)[0],
      path: [Object.values(err.errors).map((err) => err.path)[0]]
    }
  });
};
const handleBadObjectId = (err, res) => {
  res.status(400).json({
    isSuccessful: false,
    error: {message:'Invalid ID', path: null},
  });
};

const handleDuplicateError = (err, res) => {
  const path = Object.keys(err.keyValue);
  res.status(409).json({
    isSuccessful: false,
    error:{message: `${path} already exist`, path},
  });
};