;var initCourse = (function(){
  var Course = function(node){
      this.node = node; 
      this.init();
  }

  Course.prototype = {
      init : function(){
        this.getConfig();
        this.setConfig();
        this.bindEvent();
        this.render(this.data);
      },

      bindEvent : function(){
        var _self = this,
            changeShow = this.toChangeShow.bind(this),
            search = this.toSearch.bind(this);
        addEvent(this.tab,'click',changeShow);
        addEvent(this.search,'keyup', search);
      },

      toSearch : function(){
         /*var initalVal = {
              'length' : '0',
              'slice' : Array.prototype.slice,
              'push' : Array.prototype.push
          },/** 不能用类数组，因为后面渲染需要数组*/
          var initalVal = [],
          index,
          value = this.search.value,
         // value = 'ad',
          data;
          console.log(value);
        data = this.returndata.reduce(function(prev,cur,index,array){
            /**从现在显示的数据的标题栏去查找 */
            /**用string.prototypeer.indexOf,而不是Array.prototype.indexOf(否则只能匹配一个字符)*/
                index = String.prototype.indexOf.call(cur.course,value);/**只能在标题那行查找相同的，如果想用其他的做，可以再加一个，然后或上即可 */
                
                console.log(cur.course);
                if(index > -1){
                    initalVal.push(cur);
                }
                console.log(initalVal);
                return initalVal;
            },initalVal)
        console.log(data);
        if(data.length > 0){
            this.pageList.innerHTML = '';
            this.render(data);
        }
        else{
            this.pageList.innerHTML = '未找到该课程';
        }
        console.log(this.returndata);
        if(this.search.value == ''){
            this.render(this.returndata);
        }
     
      },


      toChangeShow : function(e){
            var e = e || window.event,
                tar = e.target || e.srcElement,
                items = this.items,
                tarParent,
                dataField,
                indexOf = Array.prototype.indexOf,
                index,
                data;
                console.log(tar.tagName.toLowerCase());
                if('a' == tar.tagName.toLowerCase()){
                    tarParent = tar.parentNode;
                    console.log(tarParent);
                    dataField = tarParent.getAttribute('data-filed');
                    console.log(dataField);
                    
                    index = indexOf.call(items,tarParent);
                    this.clearClass(items);
                    items[index].className += ' active'; 
                    data = this.setDates(dataField);
                    this.returndata = data;
                    console.log(data);
                    this.render(data);
                }
               
      },

      clearClass : function(items){
          var itemsLen = items.length,
              item;

        for(var i = 0; i < itemsLen;i++){
            item = items[i];
            item.className = 'item';
        }

      },

      getConfig : function(){
        this.dataConfig = JSON.parse(this.node.getAttribute('data-config'));/*自己前端需要获取元素的类名*/
        this.data = JSON.parse(this.node.innerHTML);/** 后端的数据*/
        this.returndata = this.data ;
      },

      setConfig : function(){
        this.tab = document.getElementsByClassName(this.dataConfig.tab)[0];/**负责点击的类名 */
        this.items =  document.getElementsByClassName(this.dataConfig.item);
        this.pageList = document.getElementsByClassName(this.dataConfig.pagelist)[0];/** 负责显示数据出来的类名*/
        this.tpl = document.getElementById(this.dataConfig['j_tpl']).innerHTML;/** 负责显示数据的模板*/
        this.search = document.getElementsByClassName(this.dataConfig.search)[0];
        console.log(this.search);

      },

      render : function(datas){
          var list = '',
            _self = this;
              datas.forEach(function(value,index,array){
                list += setTplToHTML(_self.tpl,regTpl,{
                    title : value.course,
                    teacher: value.teacher,
                    time: value.classes,
                    kind: 1 == value.is_free ? 
                                  'free' :
                                  'VIP',
                    img : value.img
        
                })
                
              });
              this.pageList.innerHTML = list;
      },
      /* 
      *用forEach
      render : function(datas){
          var list = '', 
              datas = datas,
              datasLen = datas.length,
              data;
          console.log(this.data[0].datetime);
          for(var i = 0; i < datasLen; i++){
              data = datas[i];
            list += setTplToHTML(this.tpl,regTpl,{
                title : data.course,
                teacher: data.teacher,
                time: data.classes,
                kind: 1 == data.is_free ? 
                              'free' :
                              'VIP',
                img : data.img
    
            })

          }
      
        console.log(list);
        this.pageList.innerHTML = list;
      },
      */
     setDates : function(filed){
        return this.data.filter(function(val,index,array){
            console.log(val.is_free);
            switch(filed){
                case 'all':
                    return true;
                case 'free':
                    return val.is_free === '1';/** 数据是字符串*/
                    break;
                case 'VIP':
                    return val.is_free === '0';
                default :
                    return true;
            }
        })
     }


  }

  return Course;

})();

new initCourse(document.getElementsByClassName('J_Data')[0]);