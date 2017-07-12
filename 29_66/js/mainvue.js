Vue.component("product-item", {
    props: ["product"],
    template: "<li>{{ product.name }}</li>"
});
Vue.component("support-item", {
    props: ["support"],
    template: "<li>{{ support.name }}</li>"
});
Vue.component("about-item", {
    props: ["about"],
    template: "<li>{{ about.name }}</li>"
});

var vmNav = new Vue({
    el: "#nav",
    data: {
        products: [
            {name: "PRODUCT1"},
            {name: "PRODUCT2"},
            {name: "PRODUCT3"}
        ],
        supports: [
            {name: "SUPPORT1"},
            {name: "SUPPORT2"},
            {name: "SUPPORT3"}
        ],
        abouts: [
            {name: "INFO"},
            {name: "CONTACT"}
        ]
    }
});
