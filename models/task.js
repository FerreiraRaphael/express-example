/**
 * @module models/task
 * @file Task Sequelize Model definition.
 */

module.exports = (sequelize, types) => {
  const Task = sequelize.define('Task', {
    title: types.STRING
  });

  Task.associate = ({ User }) => {
    Task.belongsTo(User, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Task;
};
