// const validateCreateUser = (req, res, next) => {
//   if (req.body.password.length < 8) {
//     return res.status(400).json({
//       message: 'password must be greater than 7 characters',
//     });
//   }
//   next();
// };

const adminCheck = (req, res, next) => {
  if (req.decoded.roleID !== 1) {
    return res.status(401).send({ message: 'UNAUTHORIZED ACCESS' });
  }
  next();
};

const ownerCheck = (req, res, next) => {
  if (req.decoded.id !== parseInt(req.params.id, 10)) {
    return res.status(401).send({ message: 'UNAUTHORIZED ACCESS' });
  }
  next();
};

const isOwnerOrAdmin = (req, res, next) => {
  if (req.decoded.roleID === 1) {
    next();
  } else if (req.decoded.id === parseInt(req.params.id, 10)) {
    next();
  } else {
    return res.status(401).send({ message: 'UNAUTHORIZED ACCESS' });
  }
};

export {
  adminCheck,
  ownerCheck,
  isOwnerOrAdmin,
};
