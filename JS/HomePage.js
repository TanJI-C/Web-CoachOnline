$(function(){
    showMap(113.936696 ,22.532742);//定位到深圳大学(经纬度)
})

//传入坐标，然后跳转到该位置
function showMap(x, y) { 
    var map = new BMap.Map("mymap");
    map.centerAndZoom(new BMap.Point(x, y), 14); 
    //显示左上角的辅助栏
    map.addControl(new BMap.NavigationControl());
    //创建红色指针
    var marker = new BMap.Marker(new BMap.Point(x, y));
    map.addOverlay(marker);
    //创建提示框
    var infoWindow = new BMap.InfoWindow("<p>金轮健身房地点</p><p>深圳大学桂庙</p>");
    marker.addEventListener("click", function(){
        this.openInfoWindow(infoWindow);
    })
}
