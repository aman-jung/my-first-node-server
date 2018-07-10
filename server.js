var express = require('express');
var app = express();
var fs = require('fs');
const hbs = require('hbs');
const port = process.env.PORT || 3000;//to make port as dynamic,we make use of process.env.PORT to specify port from the pc. If not then 3000 will be used as default
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getcurrentYear',()=>{
	return new Date().getFullYear()
});
hbs.registerHelper('upper',(text)=>{
	return text.toUpperCase();
})
app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} :${req.path}`;
	console.log(log);
	fs.appendFile('req.log',log + '\n',(err) => {
		if (err) throw err;
		console.log('The "data to append" was appended to file!');
	});
	next();
});
app.use(express.static(__dirname + '/public'));
app.set('view engine','hbs');//which is same as app.use
app.get('/',(req,res)=>{
	//res.send('<h1>HEllo world</h1>');
	res.render('home',{
		Title:'home Page',
		//currentYear: new Date().getFullYear(), iT is been replaced by hbs.registerHelper as it is used in two pages
		welcome:'Welcome Message'
	});
});
app.get('/about',(req,res)=>{
	res.render('about',{
		Title:'About Page',
		//currentYear: new Date().getFullYear()
	});
});

app.get('/project',(req,res)=>{
	app.render('project',{
		title:"portfolio page",
	});
});
/*app.use((req,res,next)=>{
	res.render('maintenance.hbs');
});*/
app.listen(port,()=>{
	console.log(`Server is up and running at ${port}`);
});