/* eslint linebreak-style: ["error", "windows"] */
export default class HTML {
  static stripTags(html) {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}
