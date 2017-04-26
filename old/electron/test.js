var node = (function () {
    function node(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
    return node;
}());
var mis = function (node) {
    if (node == null) {
        return [];
    }
    var rre = mis(node.left).concat(mis(node.right));
    var re = [node];
    if (node.left) {
        re.concat(mis(node.left.left));
        re.concat(mis(node.left.right));
    }
    if (node.right) {
        re.concat(mis(node.right.left));
        re.concat(mis(node.right.right));
    }
    if (rre.length > re.length) {
        return rre;
    }
    else {
        return re;
    }
};
var root = new node(20);
root.left = new node(8);
root.left.left = new node(4);
root.left.right = new node(12);
root.left.right.left = new node(10);
root.left.right.right = new node(14);
root.right = new node(22);
root.right.right = new node(25);
console.log(mis(root).length);
