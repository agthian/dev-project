// ฟังก์ชันเลือกคำตอบ (เปลี่ยนสีเมื่อถูกเลือก)
function selectOption(btn) {
    // ลบคลาส selected จากปุ่มอื่นๆ ทั้งหมดก่อน
    const buttons = document.querySelectorAll('.glass-btn');
    buttons.forEach(b => b.classList.remove('selected'));
    
    // เพิ่มคลาส selected ให้ปุ่มที่กด
    btn.classList.add('selected');
}

// ฟังก์ชันเมื่อกดปุ่มถัดไป
function goToNextPage() {
    // ตรวจสอบว่ามีการเลือกคำตอบหรือยัง
    const selected = document.querySelector('.glass-btn.selected');
    
    if (selected) {
        window.location.href = "qt7-1.html";
        
        // --- เปลี่ยนลิงก์ตรงนี้ ---
        // ใส่ชื่อไฟล์ html ของหน้าถัดไปที่คุณต้องการ เช่น 'result.html'
        // window.location.href = "qt7-1.html";; 
    }
    
}