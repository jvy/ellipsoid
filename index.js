/**
 * 提供了百度坐标（BD09）、国测局坐标（火星坐标，GCJ02）、和WGS84坐标系之间的转换
 */
 class ellipsoid{
    static PI=3.1415926535897932384626;
    static a = 6378245.0;
    static ee = 0.00669342162296594323;
    static x_PI = 3.14159265358979324 * 3000.0 / 180.0;
    
    /**
     *百度坐标系 (BD-09) 转 火星坐标系 (GCJ-02)
     *
     * @static
     * @param {*} lng 经度
     * @param {*} lat 纬度
     * @memberof project
     */
    static bd09togcj02(lng, lat){
        let x= lng - 0.0065;
        let y = lat - 0.006;
        let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
        let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
        let gg_lng = z * Math.cos(theta);
        let gg_lat = z * Math.sin(theta);
        return [gg_lng, gg_lat]
    }
    /**
     *火星坐标系 (GCJ-02) 转 百度坐标系 (BD-09) 
     *即谷歌、高德 转 百度
     * @static
     * @param {*} lng 经度
     * @param {*} lat 纬度
     * @memberof project
     */
    static gcj02tobd09(lng, lat) {
        let z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
        let theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
        let bd_lng = z * Math.cos(theta) + 0.0065;
        let bd_lat = z * Math.sin(theta) + 0.006;
        return [bd_lng, bd_lat]
    }
    /**
     *WGS84 转 火星坐标系 (GCj02)
     *
     * @static
     * @param {*} lng 经度
     * @param {*} lat 纬度
     * @memberof project
     */
    static wgs84togcj02(lng, lat){
        if (out_of_china(lng, lat)) {
            return [lng, lat]
        }
        else {
            let dlat = transformlat(lng - 105.0, lat - 35.0);
            let dlng = transformlng(lng - 105.0, lat - 35.0);
            let radlat = lat / 180.0 * PI;
            let magic = Math.sin(radlat);
            magic = 1 - ee * magic * magic;
            let sqrtmagic = Math.sqrt(magic);
            dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
            dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
            let mglat = lat + dlat;
            let mglng = lng + dlng;
            return [mglng, mglat]
        }

    }
    /**
     *火星坐标系 (GCj02) 转 WGS84
     *
     * @static
     * @param {*} lng 经度
     * @param {*} lat 纬度
     * @memberof project
     */
    static gcj02towgs84(lng, lat){
        if (out_of_china(lng, lat)) {
            return [lng, lat]
        }
        else {
            let dlat = transformlat(lng - 105.0, lat - 35.0);
            let dlng = transformlng(lng - 105.0, lat - 35.0);
            let radlat = lat / 180.0 * PI;
            let magic = Math.sin(radlat);
            magic = 1 - ee * magic * magic;
            let sqrtmagic = Math.sqrt(magic);
            dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
            dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
            mglat = lat + dlat;
            mglng = lng + dlng;
            return [lng * 2 - mglng, lat * 2 - mglat]
        }
    }
    static transformlat(lng, lat){

    }
    static transformlng(lng, lat){

    }
    /**
     *判断是否在国内，不在国内则不做偏移
     *
     * @static
     * @param {*} lng
     * @param {*} lat
     * @returns
     * @memberof project
     */
    static out_of_china(lng, lat){
        return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
    }
    

}
module.exports=project;