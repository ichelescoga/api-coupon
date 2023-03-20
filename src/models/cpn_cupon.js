const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cpn_cupon', {
    idcpn_cupon: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    empresa: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    segmento: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    codigo: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    cupon: {
      type: DataTypes.STRING(14),
      allowNull: false
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    activo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    canjeado_tienda: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    monto_cupon: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    moneda: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    pais: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    usuario_crea: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    canjeado_wordpress: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fecha_canje: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tienda_canje: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    descripcion_cupon: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    numero_orden: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    segmento_aloha: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    cod_producto_canje: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    id_compra_loyalty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nombre_beneficiario: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    correo_beneficiario: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    telefono_beneficiario: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    cupon_editable: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cpn_idtipodesc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cpn_tipo_descuento',
        key: 'idcpn_tipo_descuento'
      }
    },
    allow_fre_shipping: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    minimun_spend: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    individual_use: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    exclude_sale_items: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cpn_idsegmento: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cpn_segmento',
        key: 'idcpn_segmento'
      }
    },
    cpn_idexclude_products: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cpn_idpoducts_categories: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cpn_idexclude_categories: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    allow_email: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    usage_limit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    limit_usage_to_x_items: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    usage_limit_per_user: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cpn_cupon',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idcpn_cupon" },
        ]
      },
      {
        name: "cupon",
        using: "BTREE",
        fields: [
          { name: "cupon" },
        ]
      },
      {
        name: "key_tipo_descuento_idx",
        using: "BTREE",
        fields: [
          { name: "cpn_idtipodesc" },
        ]
      },
      {
        name: "key_segment_coupon_idx",
        using: "BTREE",
        fields: [
          { name: "cpn_idsegmento" },
        ]
      },
      {
        name: "key_exclude_products_idx",
        using: "BTREE",
        fields: [
          { name: "cpn_idexclude_products" },
        ]
      },
      {
        name: "key_product_categories_idx",
        using: "BTREE",
        fields: [
          { name: "cpn_idpoducts_categories" },
        ]
      },
    ]
  });
};
