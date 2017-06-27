module.exports = function(sequelize, DataTypes) {
	return sequelize.define("snapshot", {
		number_of_visites:DataTypes.INTEGER,
		date:DataTypes.DATE
	},{
		timestamps:false,
		underscored: true
	})
}