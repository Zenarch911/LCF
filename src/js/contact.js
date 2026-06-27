/** Remplacer par votre endpoint Formspree : https://formspree.io/f/xxxxxx */
const FORMSPREE_ENDPOINT = "";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showFieldError(input, message) {
  const errorEl = document.getElementById(`${input.id}-error`);
  input.classList.add("input-invalid");
  input.setAttribute("aria-invalid", "true");
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.hidden = false;
  }
}

function clearFieldError(input) {
  const errorEl = document.getElementById(`${input.id}-error`);
  input.classList.remove("input-invalid");
  input.removeAttribute("aria-invalid");
  if (errorEl) {
    errorEl.textContent = "";
    errorEl.hidden = true;
  }
}

function validateField(input) {
  const value = input.value.trim();

  if (input.required && !value) {
    showFieldError(input, "Ce champ est obligatoire.");
    return false;
  }

  if (input.type === "email" && value && !EMAIL_REGEX.test(value)) {
    showFieldError(input, "Adresse e-mail invalide.");
    return false;
  }

  if (input.id === "contact-name" && value.length < 2) {
    showFieldError(input, "Minimum 2 caractères.");
    return false;
  }

  if (input.id === "contact-message" && value.length < 20) {
    showFieldError(input, "Minimum 20 caractères pour décrire votre besoin.");
    return false;
  }

  clearFieldError(input);
  return true;
}

function validateForm(form) {
  const fields = form.querySelectorAll("[data-validate]");
  return [...fields].every((field) => validateField(field));
}

function buildMailtoUrl(form) {
  const data = new FormData(form);
  const name = data.get("name");
  const email = data.get("email");
  const projectType = data.get("project_type");
  const message = data.get("message");

  const subject = encodeURIComponent(`[LCF] ${projectType} — ${name}`);
  const body = encodeURIComponent(
    `Nom : ${name}\nE-mail : ${email}\nType de projet : ${projectType}\n\n${message}`,
  );

  return `mailto:contact@lorem-consulting.fr?subject=${subject}&body=${body}`;
}

function setFormState(form, state) {
  const submitBtn = form.querySelector('[type="submit"]');
  const statusEl = document.getElementById("contact-status");
  const fields = form.querySelectorAll("input, select, textarea, button");

  if (state === "loading") {
    fields.forEach((el) => (el.disabled = true));
    submitBtn.dataset.originalText = submitBtn.textContent;
    submitBtn.innerHTML =
      '<span class="inline-flex items-center gap-2"><svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Envoi en cours…</span>';
    statusEl?.classList.add("hidden");
    return;
  }

  fields.forEach((el) => (el.disabled = false));
  if (submitBtn.dataset.originalText) {
    submitBtn.textContent = submitBtn.dataset.originalText;
  }

  if (state === "success" && statusEl) {
    form.classList.add("hidden");
    statusEl.classList.remove("hidden");
    statusEl.querySelector("[data-status=success]")?.classList.remove("hidden");
    statusEl.querySelector("[data-status=error]")?.classList.add("hidden");
    return;
  }
}

async function submitForm(form) {
  const data = new FormData(form);

  if (FORMSPREE_ENDPOINT) {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.error || "Erreur lors de l'envoi.");
    }

    return;
  }

  window.location.href = buildMailtoUrl(form);
}

export function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.querySelectorAll("[data-validate]").forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.classList.contains("input-invalid")) validateField(input);
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm(form)) {
      const firstInvalid = form.querySelector(".input-invalid");
      firstInvalid?.focus();
      return;
    }

    setFormState(form, "loading");

    try {
      await submitForm(form);

      if (FORMSPREE_ENDPOINT) {
        setFormState(form, "success");
        form.reset();
      }
    } catch {
      setFormState(form, "idle");
      const statusEl = document.getElementById("contact-status");
      if (statusEl) {
        statusEl.classList.remove("hidden");
        statusEl.querySelector("[data-status=success]")?.classList.add("hidden");
        statusEl.querySelector("[data-status=error]")?.classList.remove("hidden");
      }
    }
  });
}
