const createUsersModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      underscored: true,
      timestamps: false,
      // tableName: "users",
    }
  );

  User.associate = ({ Sale }) => {
    User.hasMany(Sale, { as: 'user', foreignKey: 'userId' });
  }
  
  return User;
};

module.exports = createUsersModel;
