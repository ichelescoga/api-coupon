const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cpn_exclude_products', {
    idcpn_exclude_products: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    id_excludeproducts: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sku: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(60),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'cpn_exclude_products',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idcpn_exclude_products" },
        ]
      },
    ]
  });
};
