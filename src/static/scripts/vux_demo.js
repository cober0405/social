/**
 * Created by B-04 on 2016/12/20.
 */

// register components
Vue.component('group', vuxGroup);
Vue.component('cell', vuxCell);
Vue.component('calendar', vuxCalendar);
Vue.component('switch', vuxSwitch);
Vue.component('x-input', vuxXInput);
Vue.component('x-number', vuxXNumber);
Vue.component('x-textarea', vuxXTextarea);

new Vue({
    el: '#demo'
});