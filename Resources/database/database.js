/*
 *  Installs the MUMAS database from a SQLite file. 
 * TODO This does not work well with Android as these devices typically 
 * have low storage -- need combination of Ti.FileSystem and open. 
 */
exports.install = function(database_name){
	//Ti.Database.install("MUMAS.sqlite", database_name);
	Titanium.Database.install('/database/MUMASDB.sqlite', 'metro');
	Titanium.Database.install('/database/Favorites.sqlite', 'favs');
};
