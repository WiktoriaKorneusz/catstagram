const inputFile = document.querySelector("#image");
const previewImage = document.querySelector("#preview");
inputFile.addEventListener("change", () => {
    const file = inputFile.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
        previewImage.setAttribute("src", reader.result);
    });
    reader.readAsDataURL(file);
});
