module.exports = (sequelize, DataTypes) => {
    const SaleProduct = sequelize.define('SaleProduct', {
      saleId: {
        allowNull: false,
        // primaryKey: true,
        type: DataTypes.INTEGER,
        foreignKey: true,
        field: 'sale_id',
      },
      productId: {
        allowNull: false,
        // primaryKey: true,
        type: DataTypes.INTEGER,
        foreignKey: true,
        field: 'product_id',
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      }
    }, {
      underscored: true,
      timestamps: false,
      tableName: 'sales_products',
    })

    SaleProduct.associate = ({ Sale, Product }) => {
      Sale.belongsToMany(
        Product,
        { as: 'products', foreignKey: 'saleId', otherKey: 'productId', through: SaleProduct },
      );

      // Product.belongsToMany(
      //   Sale,
      //   { as: 'sale', foreignKey: 'productId', otherKey: 'saleId', through: SaleProduct },
      // );

      SaleProduct.belongsTo(
        Product,
        { as: 'product', foreignKey: 'productId', otherKey: 'saleId' },
      );
    }
  
    return SaleProduct;
  }