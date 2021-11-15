function orderIdRecup() {
	let url = new URL(window.location.href);
	let searchParams = new URLSearchParams(url.search);
	if (searchParams.has("orderid")) {
		let id = searchParams.get("orderid");
		return id;
	} else {
		console.log("Error, no order Id found");
	}
}
window.addEventListener("load", () => {
	const orderId = document.getElementById("orderId");
	orderId.innerText = orderIdRecup();
});