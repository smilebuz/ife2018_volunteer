import san from 'san'

// route
import App from './views/App'

import {router} from 'san-router'

import './action.js'

const myApp = new App();
myApp.attach(document.body);

router.add({rule: '/', handler(e) {
  myApp.data.set('path', 0);
  myApp.actions.setPath(0);
}})
router.add({rule: '/onething', handler(e) {
  myApp.data.set('path', 1);
  myApp.actions.setPath(1);
}});
router.add({rule: '/all', handler(e) {
  myApp.data.set('path', 2);
  myApp.actions.setPath(2);
}});
router.add({rule: '/edit/new', handler(e) {
  myApp.data.set('path', 3);
  myApp.actions.setPath(3);
}});
router.add({rule: '/edit/:id', handler(e) {
  myApp.data.set('path', 4);
  myApp.actions.setPath(4);
}});


//setMode
router.setMode('html5');

// start
router.start()
