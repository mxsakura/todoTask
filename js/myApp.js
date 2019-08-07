var storage = {
    save(key, value) {   //保存数据
        localStorage.setItem(key, JSON.stringify(value));
    },
    fetch(key) {     //返回数据
        return JSON.parse(localStorage.getItem(key)) || [];
    }
}
var myApp = new Vue({
    el: "#app",
    data: {
        list: storage.fetch("todokey"),
        todo: "",
        isClick: 1,
    },
    watch: {
        list: {
            handler() {
                storage.save("todokey", this.list)
            },
            deep: true,
        }
    },
    methods: {
        addTodo() {  //添加任务
            if (this.todo != "") {
                this.list.push({
                    key: this.list.length + 1,
                    title: this.todo,
                    checkedstatic: false,
                    dblstatic: false,
                });
            }
            this.todo = "";
        },
        deleteTodo(index) {  //删除
            this.list.splice(index, 1)
        },
        edtorTodo(item) {    //编辑
            item.dblstatic = true;
        },
        deleteTodoed(item) { // 完成编辑
            item.dblstatic = false;
        },
        allhandle() {    //全部任务
            this.isClick = 1;
        },
        nfhandle() {     //未完成的任务
            this.isClick = 2;
        },
        fhandle() {      //完成的任务
            this.isClick = 3;
        },

    },
    computed: {
        checkedLength() {    //计数
            return this.list.filter(function (item) {
                return !item.checkedstatic
            }).length;
        },
        taskLength() {  //监听list的数据
            if (this.list.length == 0) {
                return true;
            } else {
                return false;
            }

        }
    },
    directives: {
        "focus": {     //编辑后自动获取焦点
            update(el, binding) {
                if (binding.value) {
                    el.focus();
                }
            }
        }
    }
})