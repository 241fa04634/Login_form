document.addEventListener('DOMContentLoaded', () => {
  const cardWrap = document.getElementById('cardWrap');
  const cardInner = document.getElementById('cardInner');
  
  const goToSignUp = document.getElementById('goToSignUp');
  const goToSignIn = document.getElementById('goToSignIn');

  const signInForm = document.getElementById('signInForm');
  const signUpForm = document.getElementById('signUpForm');

  // Password Toggles
  const loginPass = document.getElementById('loginPassword');
  const toggleLoginPass = document.getElementById('toggleLoginPassword');
  const regPass = document.getElementById('regPassword');
  const toggleRegPass = document.getElementById('toggleRegPassword');

  // 1. 3D Mouse Parallax Tilt
  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    const maxTilt = 10;

    cardWrap.style.transition = 'transform 0.08s linear';
    cardWrap.style.transform = `rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg)`;
  });

  document.addEventListener('mouseleave', () => {
    cardWrap.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    cardWrap.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });

  // 2. Flip Transitions (Sign In <-> Create Account)
  goToSignUp.addEventListener('click', () => {
    cardInner.classList.add('flipped');
  });

  goToSignIn.addEventListener('click', () => {
    cardInner.classList.remove('flipped');
  });

  // 3. Password Toggle Setup Helper
  function setupPasswordToggle(input, button) {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const open = button.querySelector('.eye-open');
      const closed = button.querySelector('.eye-closed');

      if (input.type === 'password') {
        input.type = 'text';
        open.classList.add('hidden');
        closed.classList.remove('hidden');
      } else {
        input.type = 'password';
        open.classList.remove('hidden');
        closed.classList.add('hidden');
      }
    });
  }

  setupPasswordToggle(loginPass, toggleLoginPass);
  setupPasswordToggle(regPass, toggleRegPass);

  // 4. Sign In Form: Submit Feedback + Redirect to another page
  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('loginBtn');
    btn.innerHTML = `<span class="btn-text">Authenticating...</span>`;
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
      btn.innerHTML = `<span class="btn-text">Authenticated</span>`;
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      btn.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.4)';

      // Redirects user to dashboard.html after 800ms
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 800);
    }, 1000);
  });

  // 5. Sign Up Form: Feedback + Flip Back to Login
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('registerBtn');
    btn.innerHTML = `<span class="btn-text">Creating Account...</span>`;
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
      btn.innerHTML = `<span class="btn-text">Account Ready!</span>`;
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      btn.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.4)';

      setTimeout(() => {
        cardInner.classList.remove('flipped');
        signUpForm.reset();
        btn.innerHTML = `<span class="btn-text">Get Started</span>`;
        btn.style.background = '';
        btn.style.boxShadow = '';
        btn.style.pointerEvents = 'auto';
      }, 1000);
    }, 1000);
  });
});