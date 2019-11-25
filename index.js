/**
 * 提供了百度坐标（BD09）、国测局坐标（火星坐标，GCJ02）、和WGS84坐标系之间的转换
 */
 class ellipsoid{
     constructor(){
         this.PI=3.1415926535897932384626;
         this.a=6378245.0;
         this.ee=0.00669342162296594323;
         this.x_pi=3.14159265358979324 * 3000.0 / 180.0;
     }
    
    /**
     *百度坐标系 (BD-09) 转 火星坐标系 (GCJ-02)
     *
     * @static
     * @param {*} lng 经度
     * @param {*} lat 纬度
     * @memberof project
     */
     bd09togcj02(lng, lat){
        let x= lng - 0.0065;
        let y = lat - 0.006;
        let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
        let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
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
    gcj02tobd09(lng, lat) {
        let z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * this.x_pi);
        let theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * this.x_pi);
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
     wgs84togcj02(lng, lat){
        if (this.out_of_china(lng, lat)) {
            return [lng, lat]
        }
        else {
            let dlat = this.transformlat(lng - 105.0, lat - 35.0);
            let dlng = this.transformlng(lng - 105.0, lat - 35.0);
            let radlat = lat / 180.0 * this.PI;
            let magic = Math.sin(radlat);
            magic = 1 - this.ee * magic * magic;
            let sqrtmagic = Math.sqrt(magic);
            dlat = (dlat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtmagic) * this.PI);
            dlng = (dlng * 180.0) / (this.a / sqrtmagic * Math.cos(radlat) * this.PI);
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
     gcj02towgs84(lng, lat){
        if (this.out_of_china(lng, lat)) {
            return [lng, lat]
        }
        else {
            let dlat = this.transformlat(lng - 105.0, lat - 35.0);
            let dlng = this.transformlng(lng - 105.0, lat - 35.0);
            let radlat = lat / 180.0 * this.PI;
            let magic = Math.sin(radlat);
            magic = 1 - this.ee * magic * magic;
            let sqrtmagic = Math.sqrt(magic);
            dlat = (dlat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtmagic) * this.PI);
            dlng = (dlng * 180.0) / (this.a / sqrtmagic * Math.cos(radlat) * this.PI);
            let  mglat = lat + dlat;
            let  mglng = lng + dlng;
            return [lng * 2 - mglng, lat * 2 - mglat]
        }
    }
     transformlat(lng, lat){
        var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * this.PI) + 20.0 * Math.sin(2.0 * lng * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lat * this.PI) + 40.0 * Math.sin(lat / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(lat / 12.0 * this.PI) + 320 * Math.sin(lat * this.PI / 30.0)) * 2.0 / 3.0;
        return ret
    }
     transformlng(lng, lat){
        var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * this.PI) + 20.0 * Math.sin(2.0 * lng * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lng * this.PI) + 40.0 * Math.sin(lng / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(lng / 12.0 * this.PI) + 300.0 * Math.sin(lng / 30.0 * this.PI)) * 2.0 / 3.0;
        return ret
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
     out_of_china(lng, lat){
        return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
    }
    

}
module.exports=ellipsoid;
