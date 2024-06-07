
export function animationFadeText(sourceText, callback) {
    let editedText = sourceText;
    let delay = 25;
    if(sourceText.length > 45) delay = 10;
    if(sourceText.length > 80) delay = 5;
    const intervalID = setInterval(() => {

        // Остановка setInterval
        if(!editedText.length) {
            return clearInterval(intervalID);
        }
        editedText = editedText.slice(0, -1);
        callback(editedText);
    }, delay);
}
