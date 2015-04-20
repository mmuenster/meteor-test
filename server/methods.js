Meteor.methods({
  evaluateCode: function(code) {
    console.log("Got here")
    console.log(process.cwd())
    var doc = new PDFDocument({size: 'A4', margin: 50});
    // var imageBase64 = Meteor.users.findOne(this.userId).profile.picture;
    // var imageBuffer2 = new Buffer(imageBase64.replace('data:image/png;base64,','') || '', 'base64');
    // doc.image(imageBuffer2, 10, 10, {height: 75});
    doc.fontSize(12);
    doc.text('PDFKit is simple', 10, 30, {align: 'center', width: 200});
    // Save it on myApp/public/pdf folder (or any place) with the Fibered sync methode:
    doc.writeSync('PDFKitExample.pdf');
  }
});