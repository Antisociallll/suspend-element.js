/*
    元素悬停插件

    目录
        销毁
        创建
            监听一次
                偏移模式（已完成）
                边距模式
            监听每次
                偏移模式
                边距模式

    备注：
        约束条件
            1.响应容器必须是悬停元素的父辈容器，这样滚动响应容器时悬停元素才会发生移动
            2.位移量约束必须是合理有效的值
*/
/*************************************************************************************************/

(
    function( $ )
    {
        /*
            在这个函数体内使用this关键字，直接就是指向$()选择器中选中的元素了（已经包装成jq对象）
        */
        $.fn.floatElement = function(option)
        {
            // 预设默认的选项参数 //
            var defaults =
                {
                    respondTo:     "parent",
                    relativeTo:    "parent",
                    listenType:    "once",
                    top:           "initial",
                    bottom:        "initial",
                    left:          "initial",
                    right:         "initial",
                    destroy:        false,
                };

            // 实际应用的选项参数 //
            var applys = $.extend( defaults, option );

            // 变量参数 //
            var float_element = this;

            var respond_to = null;
            var relative_to = null;

            var top = null;
            var bottom = null;
            var left = null;
            var right = null;

            var initial_info = null;

            // 1.创建or销毁监听 /////////////////////////////////////////////////////////////////////
            if(applys.destroy == true)                                                    //销毁监听
            {

            }
            else                                                                          //创建监听
            {
                // 设置悬停元素css定位为relative //
                $(this).css("position", "relative");

                // 1.5设置响应容器 //////////////////////////////////////////////////////////////////
                if(applys.respondTo == "parent")                                      //响应 = 父容器
                {   respond_to = this.parent();   }
                else                                                              //响应 = 指定的容器
                {   respond_to = $(applys.respondTo);   }

                // 2.选择监听类型 ///////////////////////////////////////////////////////////////////
                if(applys.listenType == "once")                                           //监听一次
                {
                    // 3.依据相对容器采用悬停模式 ////////////////////////////////////////////////////
                    if(applys.relativeTo == "self")                                       //偏移模式
                    {
                        relative_to = this;                                            //相对 = 自己

                        // 赋值偏移约束 //
                        assignTBLR();

                        // 获取初始化位置信息(偏移模式) //
                        assignOffInitial();

                        // 依据既有设置创建滚动监听 //
                        $(respond_to).scroll(   scrollEvent1Off   );

                    }
                    else                                                                  //边距模式
                    {
                        if(applys.relativeTo == "parent")                            //相对 = 父容器
                        {   relative_to = this.parent();   }
                        else                                                      //相对 = 指定的容器
                        {   relative_to = $(applys.relativeTo);   }

                        // 赋值边距约束 //
                        assignTBLR();

                        // 获取初始化位置信息(边距模式) //
                        assignAwayInitial();

                        // 依据既有设置创建滚动监听 //
                        $(respond_to).scroll(   scrollEvent1Away   );
                    }
                }
                else                                                                      //监听每次
                {
                    if(applys.relativeTo == "self")                                       //偏移模式
                    {

                    }
                    else                                                                  //边距模式
                    {

                    }
                }


            }

            /*
                定义在下面的函数在执行时会被提升上去
            */
            // 赋值边距和偏移模式的位移量约束，利用了闭包 /////////////////////////////////////////////
            function assignTBLR()                                                    //赋值位移量约束
            {
                if(applys.top == "initial")         {   top = 0;                  }
                else if(applys.top == "free")       {   top = "free";             }
                else                                {   top = applys.top;         }

                if(applys.bottom == "initial")      {   bottom = 0;               }
                else if(applys.bottom == "free")    {   bottom = "free";          }
                else                                {   bottom = applys.bottom;   }

                if(applys.left == "initial")        {   left = 0;                 }
                else if(applys.left == "free")      {   left = "free";            }
                else                                {   left = applys.left;       }

                if(applys.right == "initial")       {   right = 0;                }
                else if(applys.right == "free")     {   right = "free";           }
                else                                {   right = applys.right;     }

                console.log(respond_to);
                console.log(relative_to);
                console.log(top);
                console.log(bottom);
                console.log(left);
                console.log(right);
            }
            // 获取初始化位置数据，并赋值给initial_info //////////////////////////////////////////////
            function assignOffInitial()                                            //偏移模式位置信息
            {
                initial_info =
                    {
                        //nothing
                    };

                console.log(initial_info);
            }
            function assignAwayInitial()                                           //边距模式位置信息
            {
                var element_y = $(float_element).offset().top;
                var element_x = $(float_element).offset().left;
                var container_y = $(respond_to).offset().top;
                var container_x = $(respond_to).offset().left;

                var element_x_right = $(float_element).offset().left + $(float_element).width();
                var container_x_right = $(respond_to).offset().left + $(respond_to).width();

                initial_info =
                    {
                        top_away: null,
                        bottom_away: null,
                        left_away: element_x - container_x,
                        right_away: container_x_right - element_x_right,

                        element_y: element_y,
                        element_x: element_x,
                        container_y: container_y,
                        container_x: container_x,

                        element_x_right: element_x_right,
                        container_x_right: container_x_right,
                        // 下面的数据是用作选项有效性验证【修订：并不需要这个验证，因为如果不满足条件那就是什么也不发生不影响】
                        // left_away_closest: 0,
                    };

                console.log(initial_info);
            }
            /*
                利用了闭包获取初始化数据，相当于这个形式
                $(respond_to).scroll
                (
                    {
                        float_element:    this,
                        relative_to:      relative_to,
                        top:              top,
                        bottom:           bottom,
                        left:             left,
                        right:            right,
                    },
                    scrollEvent1Off
                );
                然后通过scrollEvent1Off(event){   event.data   }来访问
            */
            // 定义滚动条监听响应事件 ////////////////////////////////////////////////////////////////
            function scrollEvent1Off()                                           //监听一次，偏移模式
            {
                var top_scroll = $(respond_to).scrollTop();
                var left_scroll = $(respond_to).scrollLeft();

                console.log($(respond_to).scrollTop());
                console.log($(respond_to).scrollLeft());

                // 悬停元素向各方运动触发悬停 --------------------------------------------------------
                if(top_scroll >= top)
                {
                    $(float_element).css("top", $(respond_to).scrollTop() - top + "px");
                }
                if(left_scroll >= left)
                {
                    $(float_element).css("left", $(respond_to).scrollLeft() - left + "px");
                }

            }
            function scrollEvent1Away()                                          //监听一次，边距模式
            {
                /*
                    机制：
                        当悬停元素运动到与相对容器指定边距时，触发悬停

                    定律：
                        offset_left + left_scroll = element_x
                */

                //var top_off = $(respond_to).scrollTop();
                var left_scroll = $(respond_to).scrollLeft();
                var top_scroll = $(respond_to).scrollTop();
                console.log("left_scroll:"+left_scroll);
                console.log("offset left:"+$(float_element).offset().left);
                //console.log($(float_element));
                console.log(initial_info.element_x - left);

                if( left_scroll > initial_info.element_x - left)
                {
                    $(float_element).css("left", $(respond_to).scrollLeft() - (initial_info.element_x - left) + "px");
                }
                if( top_scroll > initial_info.element_y - top)
                {
                    $(float_element).css("top", $(respond_to).scrollTop() - (initial_info.element_y - top) + "px");
                }

                /*
                    到目前为止实现了边距模式的单方向（左，上）悬停，机理与偏移模式相同
                    接下来要写捕捉功能（在右，下运动方向触发悬停）
                */














                // 悬停元素向各方运动触发悬停 --------------------------------------------------------
                /*
                // 竖直方向 //
                if(top_off >= top)
                {
                    $(float_element).css("top", $(respond_to).scrollTop() - top + "px");
                    $(float_element)[0].passed_y = true;
                }
                else if(top_off < bottom && $(float_element)[0].passed_y==true)
                {
                    $(float_element).css("top", $(respond_to).scrollTop() - bottom + "px");
                }
                // 水平方向 //
                if(left_off > initial_info.left_away - left)
                {
                    $(float_element).css("left", $(respond_to).scrollLeft() - (initial_info.left_away - left) + "px");
                    $(float_element)[0].passed_x = true;
                }
                *./
                /*
                    当悬停元素右边 距离 相对容器
                */





            }
            function scrollEventNOff()                                           //监听每次，偏移模式
            {

            }
            function scrollEventNAway()                                          //监听每次，边距模式
            {

            }





        };
    }
)( jQuery );







































/**/
