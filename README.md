# ellipsoid
火星坐标、百度坐标、WGS84坐标相互转换

Hat tip to [ellipsoid](https://github.com/jvy/ellipsoid.git). I just needed something simpler.

```
npm install ellipsoid
```


```coffee
 const ellipsoid = require('ellipsoid');
 let lon=120,lat=37;
 //火星坐标系 (GCJ-02) 转 百度坐标系 (BD-09) 
 ellipsoid.bd09togcj02(lon, lat);
 //火星坐标系 (GCJ-02) 转 百度坐标系 (BD-09) 
 ellipsoid.gcj02tobd09(lng, lat);
 //WGS84 转 火星坐标系 (GCj02)
 ellipsoid.wgs84togcj02(lng, lat);
 //火星坐标系 (GCj02) 转 WGS84
 ellipsoid.gcj02towgs84(lng, lat);
 
```
