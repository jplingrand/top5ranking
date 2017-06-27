if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null


  if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)

    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging:  false
    })

  } else {
    // the application is executed on the local machine ...
     sequelize = new Sequelize('top5ranking', 'postgres', null,{
      dialect:'postgres'
     })
  }

  global.db = {
    Sequelize:           Sequelize,
    sequelize:           sequelize,
    Snapshot:            sequelize.import(__dirname + '/snapshot/snapshot'),
    Website:            sequelize.import(__dirname + '/website/website')
  }

    /*
  *  1:n for Website:Ranking
  */
  global.db.Snapshot.belongsTo(global.db.Website);
  global.db.Website.hasMany(global.db.Snapshot);
  
}


module.exports = global.db