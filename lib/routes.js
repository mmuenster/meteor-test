requireAdmin = function () {
  if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
    this.redirect('/');
  } else {
    this.next();
  }
}

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'chat',
  notFoundTemplate: 'login'
});

if(Meteor.isClient){
  Router.onBeforeAction(function() {
    if (! Meteor.userId()) {
      this.redirect('login');
      this.next();
    } else {
      this.next();
    }       
  });
}

Router.route('/getPDF/:caseNumber/:report', function() {
 var fs = Npm.require('fs');
 var averoLogoImg = "../../../../../public/images/AveroLogo.png"

 var caseData=Cases.findOne({caseNumber: this.params.caseNumber})
 var reportCode= Reports.findOne({_id: this.params.report}).code

 var doc = new PDFDocument({size: 'letter', margin: 0});
 eval(reportCode)

 this.response.writeHead(200, {
 'Content-type': 'application/pdf',
 //'Content-Disposition': "attachment; filename=test.pdf"
 });
 this.response.end( doc.outputSync() );
 }, {where: 'server'});

Router.route('/', function() {
  this.render('/caseList');
});
Router.route('newCase');
Router.route('caseList');
Router.route('login');
Router.route('chat');
Router.route('pdfBuilder')
Router.route('/caseEdit/:_caseNum', function () {
  var x = this.params._caseNum; 
  var y = x.substring(0,2)
  if(y=="SP") {
    console.log("sp case")
    this.render('template_SP', {
      data: function() {
        return Cases.findOne({caseNumber: x})
      }
    })
  } else if (y=="US") {
    this.redirect('chat')
  }
});

Router.route('admin', {
    path:'/admin',
    template: 'accountsAdmin',
    onBeforeAction: requireAdmin
});





