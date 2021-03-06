/**
 * Created by jojoldu@gmail.com on 2016-10-07.
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

//require->define으로 변경, View객체를 전달하기 위해
define(["add/AddModel"], //사용할 AddModel.js를 requirejs를 통해 load
function(AddModel) {
    return Backbone.View.extend({
        model : null,

        /*  el로 지정한 dom 하위 element중 inputs 클래스를 가진 element에
         keyup이벤트가 발생하면 set함수 호출되도록 지정  */
        events: {
            'keyup .inputs' : 'set'
        },

        underTemplate : $('#underTemplate').html(),
        overTemplate : $('#overTemplate').html(),

        // view 객체 생성시 진행할 코드들
        initialize: function () {
            //아래에서 사용하는 this는 현재 객체 즉, AddView객체를 얘기한다.
            this.model = new AddModel();

            //model의 값이 변경되는(change) 이벤트가 발생하면 view의 render 함수 호출되도록 지정
            this.listenTo(this.model, 'change', this.render);
        },

        set : function() {
            var input1 = $('#input1').val(),
                input2 = $('#input2').val();

            this.model.setInputs({'input1': input1, 'input2': input2});
        },

        render : function() {
            var result = this.model.get('result');
            var template = this.getTemplate(result);

            /*
             AddView를 생성할때 el 인자를 주입하였다.
             this.el : 순수한 dom element
             this.$el : jquery로 wrapping 된 dom element
             즉, $(this.el) == this.$el 이다.
             */
            this.$el.find('#addResult').html(template);
        },

        getTemplate : function (result) {
            var template;

            if(result > 100){
                template = _.template(this.overTemplate);
            }else{
                template = _.template(this.underTemplate);
            }

            return template(this.model.toJSON());
        }
    });
});