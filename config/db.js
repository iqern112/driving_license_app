const { Sequelize } = require('sequelize');

// สร้าง instance ของ Sequelize เพื่อเชื่อมต่อกับฐานข้อมูล
const sequelize = new Sequelize('driving_license_app', 'postgres', 'admin1234', {
    host: 'localhost',
    dialect: 'postgres', // หรือ 'postgres', 'sqlite', ฯลฯ ขึ้นอยู่กับฐานข้อมูลที่ใช้
    logging: false,
});

module.exports = sequelize;
sequelize.authenticate()
    .then(() => {
        console.log('การเชื่อมต่อกับฐานข้อมูลสำเร็จ');
    })
    .catch(err => {
        console.error('ไม่สามารถเชื่อมต่อกับฐานข้อมูลได้:', err);
    });