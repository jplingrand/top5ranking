module.exports = function(sequelize, DataTypes) {
	return sequelize.define("website", {
		hostname:DataTypes.STRING
	},{
		timestamps:false,
		underscored: true
	})
}