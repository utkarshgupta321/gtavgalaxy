document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const forgotForm = document.getElementById('forgot-form');
    const resetForm = document.getElementById('reset-form');
  
    if (signupForm) {
      signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(signupForm);
        const data = Object.fromEntries(formData);
  
        const res = await fetch('/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        alert(await res.text());
      });
    }
  
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData);
  
        const res = await fetch('/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const text = await res.text();
        alert(text);
        if (res.redirected) window.location.href = res.url;
      });
    }
  
    if (forgotForm) {
      forgotForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(forgotForm);
        const data = Object.fromEntries(formData);
  
        const res = await fetch('/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        alert(await res.text());
      });
    }
  
    if (resetForm) {
      const urlParams = new URLSearchParams(window.location.search);
      document.getElementById('reset-token').value = urlParams.get('token');
  
      resetForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(resetForm);
        const data = Object.fromEntries(formData);
  
        const res = await fetch('/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        alert(await res.text());
      });
    }
  });
  