const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cpn_productos', {
    idcpn_productos: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_products_cupon: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cpn_segmento',
        key: 'idcpn_segmento'
      }
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
    tableName: 'cpn_productos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idcpn_productos" },
        ]
      },
      {
        name: "key_products_idx",
        using: "BTREE",
        fields: [
          { name: "idcpn_productos" },
        ]
      },
      {
        name: "key_products_cupon_idx",
        using: "BTREE",
        fields: [
          { name: "id_products_cupon" },
        ]
      },
    ]
  });
};
