import san from 'san'

// route
import AddHeader from './components/AddHeader'
import HomeHeader from './components/HomeHeader'

import {router} from 'san-router'

router.add({rule: '/', Component: AddHeader, target: '#app'});
router.add({rule: '/add', Component: AddHeader, target: '#app'});
router.add({rule: '/home', Component: HomeHeader, target: '#app'});
/*
router.add(
  {
    rule: '/',
    handler(e) {
      alert('root');
    }
  }
);
router.add(
  {
    rule: '/home',
    handler(e) {
      alert('home');
    }
  }
)
*/

// start
router.start()
