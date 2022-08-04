const update = document.querySelector("#update-button");

update.addEventListener("click", (_) => {
  fetch("/quotes", {
    method: "put", // PUT request here
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Darth Vader",
      quote: "I find your lack of faith disturbing.",
    }),
  })
    .then((respond) => {
      if (respond.ok) return respond.json();
    })
    .then((response) => {
      window.location.reload(true);
    });
});
