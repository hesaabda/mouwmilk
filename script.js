// Mengikat method secara eksplisit ke objek window agar tidak menghasilkan error referensi antar lingkungan sandboxing
window.showPage = function(pageId){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  const pageElement = document.getElementById('page-' + pageId);
  if (pageElement) {
    pageElement.classList.add('active');
  }
  
  // Perbarui status tautan navigasi desktop
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const activeLinks = document.querySelectorAll(`.nav-link[data-page="${pageId}"]`);
  activeLinks.forEach(link => link.classList.add('active'));

  // Perbarui status tautan navigasi mobile drawer
  document.querySelectorAll('.mobile-nav-link').forEach(l => {
    l.classList.remove('active', 'font-semibold');
    l.classList.add('font-medium');
  });
  const activeMobileLinks = document.querySelectorAll(`.mobile-nav-link[data-page="${pageId}"]`);
  activeMobileLinks.forEach(link => {
    link.classList.add('active', 'font-semibold');
  });
  
  window.scrollTo({top: 0, behavior: 'smooth'});
};

window.toggleMobile = function(open){
  const overlay = document.getElementById('mobile-overlay');
  const drawer = document.getElementById('mobile-drawer');
  
  if (open) {
    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden'; // Kunci layar agar tidak dapat digulir di luar drawer
  } else {
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = ''; // Aktifkan kembali fungsi scroll layar utama
  }
};

window.toggleFaq = function(el){
  if (el && el.parentElement) {
    el.parentElement.classList.toggle('open');
  }
};

window.showSuccessModal = function(message) {
  const modal = document.getElementById('success-modal');
  const modalContent = document.getElementById('success-modal-content');
  const modalText = document.getElementById('success-modal-text');
  
  if (modal && modalContent) {
    if (message) {
      modalText.textContent = message;
    }
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('scale-95');
    modalContent.classList.add('scale-100');
  }
};

window.closeSuccessModal = function() {
  const modal = document.getElementById('success-modal');
  const modalContent = document.getElementById('success-modal-content');
  
  if (modal && modalContent) {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalContent.classList.add('scale-95');
    modalContent.classList.remove('scale-100');
  }
};

window.submitForm = function(e){
  e.preventDefault();
  
  const name = document.getElementById('contact_name') ? document.getElementById('contact_name').value : '';
  const email = document.getElementById('contact_email') ? document.getElementById('contact_email').value : '';
  const phone = document.getElementById('contact_phone') ? document.getElementById('contact_phone').value : '';
  const subject = document.getElementById('contact_subject') ? document.getElementById('contact_subject').value : 'Pertanyaan Umum';
  const message = document.getElementById('contact_message') ? document.getElementById('contact_message').value : '';
  
  let successMsg = `Terima kasih, Kak ${name}! Pesan Anda mengenai "${subject}" telah berhasil terkirim. Tim kemitraan Mouwmilk Indonesia akan segera menghubungi Kakak di nomor ${phone} atau email ${email} dalam kurun waktu 1x24 jam kerja.`;
  
  window.showSuccessModal(successMsg);
  
  e.target.reset();
};

// Memastikan state aktif berjalan saat load pertama kali
window.addEventListener('DOMContentLoaded', () => {
  window.showPage('home');
});
