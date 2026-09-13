(function () {
  // TODO: In Make.com ein Szenario an diesen Webhook haengen (z.B. Pipedrive-Lead
  // anlegen oder Benachrichtigungs-Mail versenden) - der Webhook selbst nimmt
  // Einsendungen bereits entgegen, verarbeitet sie aber noch nicht weiter.
  var WEBHOOK_URL = "https://hook.eu1.make.com/85l611mowg5qakgs69pvl7rqng6imft8";

  var forms = document.querySelectorAll(".contact-form");

  forms.forEach(function (form) {
    var status = form.querySelector(".form-status");
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.reportValidity()) return;

      var formData = new FormData(form);

      submitBtn.disabled = true;
      setStatus(status, "sending", "Wird gesendet …");

      fetch(WEBHOOK_URL, {
        method: "POST",
        body: formData,
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Netzwerkantwort war nicht ok");
          setStatus(status, "success", "Danke! Ihre Nachricht wurde übermittelt. Wir melden uns zeitnah.");
          form.reset();
        })
        .catch(function () {
          setStatus(
            status,
            "error",
            "Da ist leider etwas schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an office@green-construction.de."
          );
        })
        .finally(function () {
          submitBtn.disabled = false;
        });
    });
  });

  function setStatus(el, state, message) {
    if (!el) return;
    el.setAttribute("data-state", state);
    el.textContent = message;
  }
})();
