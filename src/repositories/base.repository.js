const findById = (model, id) => {
  return model.findByPk(id);
};

const deleteById = (model, id) => {
  return model.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  findById,
  deleteById,
};
