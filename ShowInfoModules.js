/*
    （测试用）显示数据的两个模块
*/
/*************************************************************************************************/

// 显示初始数据模块 /////////////////////////////////////////////////////////////////////////////////
var InitialInfo = new Object
(
    {
        elementInfo: function(float_element)
        {
            /* 悬停元素offset定位 */
            $("#initial-info .element .offset").text
            (   "{ " + $(float_element).offset().left + ", " + $(float_element).offset().top + " }"   );

            /* 悬停元素offset上边 */
            $("#initial-info .element .top-edge").text
            (   $(float_element).offset().top   );

            /* 悬停元素offset下边 */
            $("#initial-info .element .bottom-edge").text
            (   $(float_element).offset().top + $(float_element).css("height").slice(0,-2)*1 - 1   );

            /* 悬停元素offset左边 */
            $("#initial-info .element .left-edge").text
            (   $(float_element).offset().left   );

            /* 悬停元素offset右边 */
            $("#initial-info .element .right-edge").text
            (   $(float_element).offset().left + $(float_element).css("width").slice(0,-2)*1 - 1   );
        },

        relativeContainerInfo: function(relative_container)
        {
            /* 相对容器offset定位 */
            $("#initial-info .relative-container .offset").text
            (   "{ " + $(relative_container).offset().left + ", " + $(relative_container).offset().top + " }"   );

            /* 相对容器offset上边 */
            $("#initial-info .relative-container .top-edge").text
            (   $(relative_container).offset().top   );

            /* 相对容器offset下边 */
            $("#initial-info .relative-container .bottom-edge").text
            (   $(relative_container).offset().top + $(relative_container).css("height").slice(0,-2)*1 - 1   );

            /* 相对容器offset左边 */
            $("#initial-info .relative-container .left-edge").text
            (   $(relative_container).offset().left   );

            /* 相对容器offset右边 */
            $("#initial-info .relative-container .right-edge").text
            (   $(relative_container).offset().left + $(relative_container).css("width").slice(0,-2)*1 - 1   );

            /* 相对容器client高度 */
            $("#initial-info .relative-container .client-height").text
            (   relative_container[0].clientHeight   );

            /* 相对容器client宽度 */
            $("#initial-info .relative-container .client-width").text
            (   relative_container[0].clientWidth   );
        },

        respondContainerInfo: function(respond_container)
        {
            /* 向下滚动 */
            $("#initial-info .respond-container .scroll-down").text
            (   $(respond_container).scrollTop()   );

            /* 向右滚动 */
            $("#initial-info .respond-container .scroll-forward").text
            (   $(respond_container).scrollLeft()   );
        },
    }
);

// 显示滚动数据模块 /////////////////////////////////////////////////////////////////////////////////
var ScrollInfo = new Object
(
    {
        elementInfo: function(float_element)
        {
            /* 悬停元素offset定位 */
            $("#scroll-info .element .offset").text
            (   "{ " + $(float_element).offset().left + ", " + $(float_element).offset().top + " }"   );

            /* 悬停元素offset上边 */
            $("#scroll-info .element .top-edge").text
            (   $(float_element).offset().top   );

            /* 悬停元素offset下边 */
            $("#scroll-info .element .bottom-edge").text
            (   $(float_element).offset().top + $(float_element).css("height").slice(0,-2)*1 - 1   );

            /* 悬停元素offset左边 */
            $("#scroll-info .element .left-edge").text
            (   $(float_element).offset().left   );

            /* 悬停元素offset右边 */
            $("#scroll-info .element .right-edge").text
            (   $(float_element).offset().left + $(float_element).css("width").slice(0,-2)*1 - 1   );
        },

        relativeContainerInfo: function(relative_container)
        {
            /* 相对容器offset定位 */
            $("#scroll-info .relative-container .offset").text
            (   "{ " + $(relative_container).offset().left + ", " + $(relative_container).offset().top + " }"   );

            /* 相对容器offset上边 */
            $("#scroll-info .relative-container .top-edge").text
            (   $(relative_container).offset().top   );

            /* 相对容器offset下边 */
            $("#scroll-info .relative-container .bottom-edge").text
            (   $(relative_container).offset().top + $(relative_container).css("height").slice(0,-2)*1 - 1   );

            /* 相对容器offset左边 */
            $("#scroll-info .relative-container .left-edge").text
            (   $(relative_container).offset().left   );

            /* 相对容器offset右边 */
            $("#scroll-info .relative-container .right-edge").text
            (   $(relative_container).offset().left + $(relative_container).css("width").slice(0,-2)*1 - 1   );
        },

        respondContainerInfo: function(respond_container)
        {
            /* 向下滚动 */
            $("#scroll-info .respond-container .scroll-down").text
            (   $(respond_container).scrollTop()   );

            /* 向右滚动 */
            $("#scroll-info .respond-container .scroll-forward").text
            (   $(respond_container).scrollLeft()   );
        },

        relativeAwayInfo: function(float_element, relative_container)
        {
            /* 上边距 */
            $("#scroll-info .relative-away .top-away").text
            (   $(float_element).offset().top - $(relative_container).offset().top   );

            /* 下边距 */
            $("#scroll-info .relative-away .bottom-away").text
            (
                (   $(relative_container).offset().top + $(relative_container).css("height").slice(0,-2)*1 - 1   ) -
                (   $(float_element).offset().top + $(float_element).css("height").slice(0,-2)*1 - 1   )
            );

            /* 左边距 */
            $("#scroll-info .relative-away .left-away").text
            (   $(float_element).offset().left - $(relative_container).offset().left   );

            /* 右边距 */
            $("#scroll-info .relative-away .right-away").text
            (
                (   $(relative_container).offset().left + $(relative_container).css("width").slice(0,-2)*1 - 1   ) -
                (   $(float_element).offset().left + $(float_element).css("width").slice(0,-2)*1 - 1   )
            );

        },
    }
);
