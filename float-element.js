/*
    元素悬停插件
*/
/*************************************************************************************************/

(

    function( $ )
    {
        $.fn.floatElement = function(option)
        {
            /*
                在这个函数体内使用this关键字，直接就是指向$()选择器中选中的元素了（已经包装成jq对象）
            */

            /* 默认参数 */
            var defaults =
                {
                    respondTo:     "parent",
                    relativeTo:    "parent",     //第二种方式是self。相对于自己的正常位置运动，就是最常见简单的那种。
                    listenType:    "once",       //第二种方式是always。对于每次滚动重新获取一次当前相对容器数据。
                    top:           "initial",    //第二种方式是free。该运动方向上不作约束
                    bottom:        "initial",    //给定边距必须都是正值，
                    left:          "initial",
                    right:         "initial",
                    destroy:        false,        //为选中的元素解除已有的悬停性质绑定
                };

            /* 实际应用的参数 */
            var applys = $.extend( defaults, option );

            // 从applys整理数据 ////////////////////////////////////////////////////////////////////

            // 声明参数 ----------------------------------------------------------------------------
            var float_element;    //悬停元素
            var respond_to;    //响应容器
            var relative_to;    //相对容器
            var listen_type;    //监听类型
            var top, bottom, left, right;    //给定边距
            var top_away, bottom_away, left_away, right_away;    //当前边距
            var top_away_self, bottom_away_self, left_away_self, right_away_self;    //由自身偏移

            // 赋值参数 ----------------------------------------------------------------------------
            /* 悬停元素 */
            float_element = $(this);
            console.log(float_element);

            /* 响应容器 */
            if(applys.respondTo == "parent")
            {   respond_to = $(float_element).parent();
                console.log(respond_to);
            }
            else
            {   respond_to = $(applys.respondTo);
                console.log(respond_to);
            }

            /* 相对容器 */
            if(applys.relativeTo == "parent")
            {   relative_to = $(float_element).parent();
                console.log(relative_to);
            }
            else if(applys.relativeTo == "self")
            {   relative_to = "self";
                console.log(relative_to);
            }
            else
            {   relative_to = $(applys.relativeTo);
                console.log(relative_to);
            }

            /* 监听类型 */
            if(applys.listenType == "once" || applys.listenType == "always")
            {   listen_type = applys.listenType;
                console.log(listen_type);
            }
            else
            {   console.log('错误：监听类型必须是"once"或者"always"');
                return false;
            }

            /* 给定边距 */
            top = applys.top;
            console.log(top);
            bottom = applys.bottom;
            console.log(bottom);
            left = applys.left;
            console.log(left);
            right = applys.right;
            console.log(right);

            /* 初始化边距（放在这一层的就是once的，获取一次初始化的值就够了） */
            top_away =
                (   $(float_element).offset().top - $(relative_to).offset().top   );
            bottom_away =
                (   $(relative_to).offset().top + $(relative_to).css("height").slice(0,-2)*1 - 1   ) -
                (   $(float_element).offset().top + $(float_element).css("height").slice(0,-2)*1 - 1   );
            left_away =
                (   $(float_element).offset().left - $(relative_to).offset().left   );
            right_away =
                (   $(relative_to).offset().left + $(relative_to).css("width").slice(0,-2)*1 - 1   ) -
                (   $(float_element).offset().left + $(float_element).css("width").slice(0,-2)*1 - 1   );

            /* 计算自身偏移阈值（用于触发悬停） */
            top_away_self = top_away - top;
            console.log(top_away_self);
            bottom_away_self = Math.abs(bottom_away - bottom);    //取绝对值
            console.log(bottom_away_self);
            left_away_self = left_away - left;
            console.log(left_away_self);
            right_away_self = right_away - right;
            console.log(right_away_self);


            /* 信息显示 */
            InitialInfo.elementInfo(float_element);
            InitialInfo.relativeContainerInfo(relative_to);
            InitialInfo.respondContainerInfo(respond_to);

            // 工作逻辑 ----------------------------------------------------------------------------
            /* 设置悬停元素定位类型 */
            $(float_element).css("position", "relative");
            /* 在悬停元素身上添加通过指示物 */
            $(float_element)[0].scroll_passed = false;
            /*
                悬停元素够远指示器
                如果元素初始下边距就在给定边距内，i.e.根本不可能触及到约束位置），那么这是一个无效的给定下边距，就不会触发第二个else if
            */
            if( bottom<bottom_away )
            {
                console.log("错误：无效的下边距约束");
                return false;
            }







            /* 为容器的滚动添加监听 */
            $(respond_to).scroll
            (
                function()
                {
                    /* 信息显示 */
                    ScrollInfo.elementInfo(float_element);
                    ScrollInfo.relativeContainerInfo(relative_to);
                    ScrollInfo.respondContainerInfo(respond_to);
                    ScrollInfo.relativeAwayInfo(float_element, relative_to);

                    // 整理参数 --------------------------------------------------------------------



                    // 触发 ------------------------------------------------------------------------


                    //下面是个例子
                    //注： 30是top_away_self依自身偏移值
                    if(   $(respond_to).scrollTop() >= top_away_self   )
                    {
                        $(float_element).css("top", $(respond_to).scrollTop()-top_away_self+"px");
                        $(float_element)[0].scroll_passed = true;
                    }
                    else if(   $(respond_to).scrollTop() < bottom_away_self && $(float_element)[0].scroll_passed==true   )
                    {
                        $(float_element).css("top", $(respond_to).scrollTop()-bottom_away_self+"px");
                    }
                    else
                    {
                        $(float_element).css("top", 0+"px");
                    }










                    /* 试验 */

                    //$(float_element).css("top", $(respond_to).scrollTop()+"px");


                }
            );


        };
    }

)( jQuery, InitialInfo, ScrollInfo );







































/**/
