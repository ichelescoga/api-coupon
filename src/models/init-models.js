var DataTypes = require("sequelize").DataTypes;
var _cpn_categories = require("./cpn_categories");
var _cpn_cupon = require("./cpn_cupon");
var _cpn_exclude_categories = require("./cpn_exclude_categories");
var _cpn_exclude_products = require("./cpn_exclude_products");
var _cpn_productos = require("./cpn_productos");
var _cpn_segmento = require("./cpn_segmento");
var _cpn_tipo_descuento = require("./cpn_tipo_descuento");

function initModels(sequelize) {
  var cpn_categories = _cpn_categories(sequelize, DataTypes);
  var cpn_cupon = _cpn_cupon(sequelize, DataTypes);
  var cpn_exclude_categories = _cpn_exclude_categories(sequelize, DataTypes);
  var cpn_exclude_products = _cpn_exclude_products(sequelize, DataTypes);
  var cpn_productos = _cpn_productos(sequelize, DataTypes);
  var cpn_segmento = _cpn_segmento(sequelize, DataTypes);
  var cpn_tipo_descuento = _cpn_tipo_descuento(sequelize, DataTypes);

  cpn_cupon.belongsTo(cpn_segmento, { as: "cpn_idsegmento_cpn_segmento", foreignKey: "cpn_idsegmento"});
  cpn_segmento.hasMany(cpn_cupon, { as: "cpn_cupons", foreignKey: "cpn_idsegmento"});
  cpn_productos.belongsTo(cpn_segmento, { as: "id_products_cupon_cpn_segmento", foreignKey: "id_products_cupon"});
  cpn_segmento.hasMany(cpn_productos, { as: "cpn_productos", foreignKey: "id_products_cupon"});
  cpn_cupon.belongsTo(cpn_tipo_descuento, { as: "cpn_idtipodesc_cpn_tipo_descuento", foreignKey: "cpn_idtipodesc"});
  cpn_tipo_descuento.hasMany(cpn_cupon, { as: "cpn_cupons", foreignKey: "cpn_idtipodesc"});

  return {
    cpn_categories,
    cpn_cupon,
    cpn_exclude_categories,
    cpn_exclude_products,
    cpn_productos,
    cpn_segmento,
    cpn_tipo_descuento,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
