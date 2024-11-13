
/**
 * It's only static background,
 * in real world everything goes automatically
*
* @param app
* @param models
*/
exports.init = function(app, models)
{
    var index = require('./controller');
    var user = require('./controller/user');
    var addressofcoin = require('./controller/addressofcoin');
    const  dashboard  = require('./controller/dashboard');
    const  Presale  = require('./controller/Presale');


    var action = require('./controller/action');
    var visitor = require('./controller/visitor');
    const launchpad = require('./controller/launchpad');
    const token = require('./controller/token');

    const notification = require('./controller/notification');
    
    /* set models */
    user.model = models.User;
    action.model = models.Action;
    visitor.model = models.Visitor;
    launchpad.model = models.Launchpad;
    token.model = models.Token;


    /* user controllers */
    // admin login
    app.post('/admin/signin', user.signin); 
    // admin add
    app.post('/admin/signup', user.signup);
    app.get('/crypto-api/:address', addressofcoin.cryptoapi);


    /* action controllers */
    // user add action
    app.post('/action/add', action.add);
    // admin get actions
    app.get('/actions', action.read);
    // user update action
    app.get('/action/update', action.update);

    /* visitor controllers */
    // add visitor 
    app.post('/visitor', visitor.add);
    // get visitors
    app.get('/visitors', visitor.read);

    /* launchpad controllers */
    // add launchpad 
    app.post('/launchpad/add', launchpad.add);
    // update launchpad
    app.post('/launchpad/update', launchpad.update);
    // get launchpads
    app.post('/launchpads/:id/:chain/:tab', launchpad.read);
    app.get('/launchpads_singal/:id', launchpad.readOne);


    app.post('/presale/sale', Presale.add);


    //add token
    app.post('/token/add', token.add);

    /* notification controllers */
    // add notification
    app.post('/notification/add', notification.add);
    // read notifications
    app.get('/notifications', notification.read);
    // update notifications
    app.post('/notification/update', notification.update);
}