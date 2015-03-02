exports.index = function(req, res){
  res.render('partials/index');
};

exports.partials = function (req, res) {
  res.render('partials/' + req.params.name);
};