import { message } from "antd";

export const clickToCopyClipBoard = (id) => {
    const textField = document.createElement('textarea');
    textField.innerText = id;
    document.body.appendChild(textField);
    textField.select();
    // document.execCommand('copy');
    document.body.removeChild(textField);
    message.success("Copied To Clipboard");
    function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log('Text copied to clipboard');
    })
    .catch((error) => {
      console.error('Error copying text to clipboard:', error);
    });
}
}