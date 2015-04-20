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

Router.route('/webhooks/stripe', { where: 'server' })
  .get(function () {
    // GET /webhooks/stripe
    console.log("Get function")
    this.response.end("Call served");
  })
  .post(function (req,res,abc,def) {
    // POST /webhooks/stripe
    console.log(req,res,abc,def)
  })
  .put(function () {
    // PUT /webhooks/stripe
  })

Router.route('/', function() {
  this.render('/caseList');
});

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





