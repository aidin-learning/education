// Load configuration from environment or .env file
const CONFIG = {
    MAPBOX_ACCESS_TOKEN: getMapboxToken()
};

function getMapboxToken() {
    // ลองอ่าน environment variable ก่อน
    if (typeof process !== 'undefined' && process.env && process.env.MAPBOX_ACCESS_TOKEN) {
        return process.env.MAPBOX_ACCESS_TOKEN;
    }
    
    // ถ้าไม่มี ให้ใช้ค่าจากตัวแปร global (สำหรับ development)
    if (typeof window !== 'undefined' && window.MAPBOX_TOKEN) {
        return window.MAPBOX_TOKEN;
    }
    
    console.error('Mapbox token not found! Set MAPBOX_ACCESS_TOKEN in .env file');
    return null;
}

export default CONFIG;
