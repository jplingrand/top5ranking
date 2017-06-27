var errors = require(global.paths.core_tools+'/errors');
var logger = require('winston');

module.exports.getTop5 = function(req,res,next){

	global.db.Snapshot.findAll({
		order: [ [ 'date', 'DESC' ]],
		attributes:['date']
	}).then(function(entries){

		if(!entries){
			next(new Error('No records found on db'))
			return;
		}

		if(entries.length < 1){
			next(new Error('No records found on db'))
			return;
		}

		var date = entries[0].date;

		if(req.query.date){
			date = req.query.date
		}

		var allowedDates = [];

		entries.forEach(entry => {
			if(allowedDates.indexOf(entry.date.toJSON()) < 0){
				allowedDates.push(entry.date.toJSON())
			}
		})


		global.db.Snapshot.findAll({
			where:{
				date:date
			},
			order: [ [ 'number_of_visites', 'DESC' ]],
			limit:5,
			include:[global.db.Website]
		}).then(result => {

			res.send({
				ranking:result,
				allowedDates:allowedDates
			});
		})

	}); 

}